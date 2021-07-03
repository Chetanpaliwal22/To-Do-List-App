import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "zzz.firebaseapp.com",
  databaseURL: "https://zzz.firebaseio.com",
  projectId: "to-do-list-app-9zzz",
  storageBucket: "zzz.appspot.com",
  messagingSenderId: "zzzz",
  appId: "1:zzzzz:web:89bc34e406ddca03a4ee14"
});

const db = firebaseApp.firestore();

export  { db };
