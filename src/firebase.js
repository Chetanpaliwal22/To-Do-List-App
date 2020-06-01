import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: "AIzaSyAQKCYjy59CpKaLlqjuSxNRywzHq0Zh7C0",
  authDomain: "to-do-list-app-98ae2.firebaseapp.com",
  databaseURL: "https://to-do-list-app-98ae2.firebaseio.com",
  projectId: "to-do-list-app-98ae2",
  storageBucket: "to-do-list-app-98ae2.appspot.com",
  messagingSenderId: "6718932861",
  appId: "1:6718932861:web:89bc34e406ddca03a4ee14"
});

const db = firebaseApp.firestore();

export  { db };