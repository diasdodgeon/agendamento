import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const btnEntrar = document.getElementById("btnEntrar");
const btnCadastrar = document.getElementById("btnCadastrar");

const cadastroForm = document.getElementById("cadastroForm");
const loginForm = document.getElementById("loginForm");

const mensagem = document.getElementById("mensagem");


// Mostrar formulários
btnCadastrar.addEventListener("click", () => {
  cadastroForm.style.display = "block";
  loginForm.style.display = "none";
});

btnEntrar.addEventListener("click", () => {
  loginForm.style.display = "block";
  cadastroForm.style.display = "none";
});


// CADASTRO
cadastroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const endereco = document.getElementById("endereco").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    await setDoc(doc(db, "empresarios", user.uid), {
      nomeCompleto: nome,
      email: email,
      whatsapp: whatsapp,
      endereco: endereco,
      dataCriacao: serverTimestamp(),
      status: "ativo"
    });

    mensagem.innerText = "Conta criada com sucesso!";
    cadastroForm.reset();

  } catch (error) {
    mensagem.innerText = "Erro: " + error.message;
  }
});


// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    mensagem.innerText = "Login realizado com sucesso!";

    // Futuramente redirecionaremos para dashboard
    // window.location.href = "dashboard.html";

  } catch (error) {
    mensagem.innerText = "Erro: " + error.message;
  }
});


// Manter sessão ativa
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário logado:", user.uid);
  }
});