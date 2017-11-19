import firebase from './index';

const db = firebase.database();

/**
 * Listens for changes on db and fires callback
 * @param {function} callback (error?, value) => 
 */
export function getList(callback) {
  const { uid } = firebase.auth().currentUser;
  db.ref(uid).on(
    'value',
    dataSnapshot => {
      if (dataSnapshot.exists()) {
        const dataObjects = dataSnapshot.val();
        const todos = [];
        Object.keys(dataObjects).forEach(key => {
          todos.push({
            id: key,
            todoDetails: dataObjects[key],
          });
        });
        callback(null, todos);
      }
    },
    error => {
      callback(error);
    }
  );
}

/**
 * Removes listener for db changes
 */
export async function removeListener() {
  const { uid } = firebase.auth().currentUser;
  await db.ref(uid).off();
}

/**
 * Adds item to user's list
 * @param {Object} item 
 */
export async function addItemToList(item) {
  const { uid } = firebase.auth().currentUser;
  const data = {
    todo: item,
    finished: false,
  };
  try {
    await db.ref(uid).push(data);
  } catch (e) {
    throw new Error(e.message);
  }

  return 'success';
}

/**
 * Removes todo from db
 * @param {string} id 
 */
export async function removeTodo(id) {
  const { uid } = firebase.auth().currentUser;
  try {
    await db
      .ref(uid)
      .child(id)
      .remove();
  } catch (e) {
    throw new Error(e);
  }
  return 'Success';
}
