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

export const authCheck = async () => {
  return new Promise(resolve => {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log("We are authenticated now!");
        resolve(true);
      } else {
        console.log("We did not authenticate.");
        resolve(false);
      }
    });
  });
};

export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
