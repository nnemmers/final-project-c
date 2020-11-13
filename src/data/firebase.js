import firebase from "firebase/app";
import "firebase/firestore";

// REACT_APP_API_KEY = "AIzaSyB_I8HuRoGYhytk6I_dy881vYiKCuvW9jg"
// REACT_APP_AUTH_DOMAIN = "code-sprint-b-final.firebaseapp.com"
// REACT_APP_DATABASE_URL = "https://code-sprint-b-final.firebaseio.com"
// REACT_APP_PROJECT_ID = "code-sprint-b-final"
// REACT_APP_STORAGE_BUCKET = "code-sprint-b-final.appspot.com"
// REACT_APP_MESSAGING_SENDER_ID = "293117399339"
// REACT_APP_API_ID = "1:293117399339:web:a84a16854433b57c11b56e"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_AUTH_DOMAIN,
  authDomain: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const peopleCollection = db.collection("people");

export default db;
export { peopleCollection };
