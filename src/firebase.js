import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0SROk4amzArI8RzE-omf2dNsMyvFQ6YY",
  authDomain: "to-do-list-app-25482.firebaseapp.com",
  projectId: "to-do-list-app-25482",
  storageBucket: "to-do-list-app-25482.appspot.com",
  messagingSenderId: "580095436319",
  appId: "1:580095436319:web:79a40bdf16348bba38d72a"
});

const db = firebaseApp.firestore();
export { db };
