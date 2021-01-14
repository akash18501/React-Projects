import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg56Gvb0EM_fTIWQLPyNgavcLNb31n88I",
  authDomain: "mywhatsapp-e900c.firebaseapp.com",
  projectId: "mywhatsapp-e900c",
  storageBucket: "mywhatsapp-e900c.appspot.com",
  messagingSenderId: "587295344134",
  appId: "1:587295344134:web:59b164a468d5a54dcb2587",
  measurementId: "G-WYCKR774RL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
