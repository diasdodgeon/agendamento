import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const nomeEmpresario = document.getElementById("nomeEmpresario");
const logoutBtn = document.getElementById("logout");
const salvarBtn = document.getElementById("salvarConfig");
const mensagem = document.getElementById("mensagem");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const docRef = doc(db, "empresarios", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const dados = docSnap.data();
    nomeEmpresario.innerText = "Bem-vindo, " + dados.nomeCompleto;
  }
});

salvarBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  const nomeFantasia = document.getElementById("nomeFantasia").value;
  const corTema = document.getElementById("corTema").value;

  await updateDoc(doc(db, "empresarios", user.uid), {
    nomeFantasia: nomeFantasia,
    corTema: corTema
  });

  mensagem.innerText = "Configurações salvas com sucesso!";
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});