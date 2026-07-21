// ===== firebase.js =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUl6jBSPeMNHPcwIms7hQAM8PPFKEDWRE",
  authDomain: "mail-sender-daafd.firebaseapp.com",
  projectId: "mail-sender-daafd",
  storageBucket: "mail-sender-daafd.firebasestorage.app",
  messagingSenderId: "135272167424",
  appId: "1:135272167424:web:afc1240fc5203c165b00e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };