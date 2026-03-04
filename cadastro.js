import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
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
    form.reset();

  } catch (error) {
    mensagem.innerText = "Erro: " + error.message;
  }
});