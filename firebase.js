import * as firebase from "firebase"; // 4.3.0

var firebaseConfig = {
  apiKey: "AIzaSyBjtl81OTTPAZWp92KFB01qsou39vEC2VA",
  authDomain: "nsfbapp.firebaseapp.com",
  databaseURL: "https://nsfbapp.firebaseio.com",
  projectId: "nsfbapp",
  storageBucket: "nsfbapp.appspot.com",
  messagingSenderId: "810901469042"
};

// Ensure that you do not login twice.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**
 *
 */
export const authCheck = async () => {
  return new Promise(resolve => {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log("We are authenticated now!");
        return resolve(user);
      } else {
        console.log("We did not authenticate.");
        return resolve(null);
      }
    });
  });
};

/**
 *
 * @param {*} email
 * @param {*} password
 */
export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

/**
 *
 */
export const logOut = () => {
  return firebase.auth().signOut();
};

/**
 *
 * @param {*} userInfo.lastName
 * @param {*} userInfo.firstName
 * @param {*} userInfo.email
 * @param {*} userInfo.password
 */
export const registerUser = userInfo => {
  console.log("in registerUser");
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
    .then(newUser => {
      let { email, firstName, lastName } = userInfo;

      return firebase
        .database()
        .ref("/users")
        .child(newUser.uid)
        .set({ email, firstName, lastName });
    });
};

/**
 *
 */
export const getUserProfile = () => {
  let user = firebase.auth().currentUser;
  console.log(user);
  return firebase
    .database()
    .ref("/users")
    .child(user.uid)
    .once("value")
    .then(function(snapshot) {
      return {
        uid: user.uid,
        ...snapshot.val()
      };
    });
};
