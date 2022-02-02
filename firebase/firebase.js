import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNpFFb8aI5wEzwSh5qxSByl3y17v5w8aA",
  authDomain: "chat-app-2e26f.firebaseapp.com",
  databaseURL: "https://chat-app-2e26f-default-rtdb.firebaseio.com",
  projectId: "chat-app-2e26f",
  storageBucket: "chat-app-2e26f.appspot.com",
  messagingSenderId: "1068130228450",
  appId: "1:1068130228450:web:70ffac600166aa9df4a6bb",
  measurementId: "G-5MR23MVVBT",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, set, ref, onValue, push };
