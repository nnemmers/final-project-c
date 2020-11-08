import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_I8HuRoGYhytk6I_dy881vYiKCuvW9jg",
  authDomain: "code-sprint-b-final.firebaseapp.com",
  databaseURL: "https://code-sprint-b-final.firebaseio.com",
  projectId: "code-sprint-b-final",
  storageBucket: "code-sprint-b-final.appspot.com",
  messagingSenderId: "293117399339",
  appId: "1:293117399339:web:a84a16854433b57c11b56e",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const peopleCollection = db.collection("people");

export default db;
export { peopleCollection };
