import firebase from './';

export const auth = firebase.auth();

/**
 * Creates user with given email and password
 * @param {string} email 
 * @param {string} password 
 */
export async function createUser(email, password) {
  if (!email || !password) {
    throw new Error('No email or password provided!');
  }

  try {
    await auth.createUserWithEmailAndPassword(email, password);

    // Normally, when you create a user, this user will be signed in
    // For this demo, I'll logout him
    await logoutUser();
  } catch (e) {
    throw new Error(e.message);
  }

  return 'success!';
}

/**
 * Signs user in the app
 * @param {string} email 
 * @param {string} password 
 */
export async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error('No email or password provided!');
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    throw new Error(e.message);
  }
  return 'Success!';
}

/**
 * Logs user out
 */
export async function logoutUser() {
  try {
    await auth.signOut();
  } catch (e) {
    throw new Error(e.message);
  }
  return 'Success';
}
