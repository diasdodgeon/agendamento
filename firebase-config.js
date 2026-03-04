import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgmLRS5nXpB7ND4QewD-5xUrLcIg8DXi8",
  authDomain: "agendamentoqrcode.firebaseapp.com",
  projectId: "agendamentoqrcode",
  storageBucket: "agendamentoqrcode.firebasestorage.app",
  messagingSenderId: "42158492343",
  appId: "1:42158492343:web:4381f3ed0a8f8494205b32",
  measurementId: "G-G8Y78T6Q55"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);