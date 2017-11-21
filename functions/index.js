// listen for

const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
const sharp = require('sharp');
const mkdirp = require('mkdirp-promise');
const fs = require('fs');

const serviceAccount = require('./react-up-admin-config.json');
const config = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.dbUrl,
});

const BUCKET_NAME = config.bucketName;
const IMAGE_EXTENSION = '.jpg';
const BYTES_IN_MB = 1048576;
const SIZE_ALLOWANCE_IN_MB = 0.4; // in MB
const NOT_EXISTING = 'not_exists';

function isSizeOverAllowance(size) {
  return size / BYTES_IN_MB > SIZE_ALLOWANCE_IN_MB;
}

function handleImageResizing(file) {
  if (!isSizeOverAllowance(file.size)) {
    return Promise.resolve(file);
  }
  return resizeImage(file, file.bucket);
}

function resizeImage(file, bucket = BUCKET_NAME) {
  const filePath = file.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);
  const newFilePath = path.normalize(
    path.format({
      dir: dirName,
      name: baseFileName,
      ext: IMAGE_EXTENSION,
    })
  );

  const tempLocalFile = path.join(
    os.tmpdir(),
    path.dirname(filePath),
    `temp__${path.basename(filePath)}`
  );
  const tempNewFile = path.join(os.tmpdir(), newFilePath);
  const tempLocalDir = path.dirname(tempLocalFile);

  return mkdirp(tempLocalDir).then(() =>
    gcs
      .bucket(bucket)
      .file(filePath)
      .download({
        destination: tempLocalFile,
      })
      .then(() =>
        sharp(tempLocalFile)
          .resize(500, 500)
          .min()
          .jpeg({
            quality: 90,
          })
          .toFile(tempNewFile)
          .then(() =>
            gcs
              .bucket(bucket)
              .upload(tempNewFile, {
                destination: newFilePath,
              })
              .then(() => {
                fs.unlinkSync(tempLocalFile);
                fs.unlinkSync(tempNewFile);
                return gcs
                  .bucket(bucket)
                  .file(filePath)
                  .getMetadata()
                  .then(meta => ({
                    name: meta.name,
                    size: meta.size,
                    selfLink: meta.selfLink,
                  }));
              })
          )
      )
  );
}

exports.ImageResize = functions.storage.object().onChange(event => {
  const object = event.data;
  const fileBucket = object.bucket;
  const filePath = object.name;
  const resourceState = object.resourceState;

  if (resourceState === NOT_EXISTING) {
    return Promise.resolve(false);
  }

  const bucket = gcs.bucket(fileBucket);

  return bucket
    .file(filePath)
    .getMetadata()
    .then(([meta]) => {
      const fileMeta = {
        name: meta.name,
        size: meta.size,
        bucket: meta.bucket,
      };
      return handleImageResizing(fileMeta);
    });
});
