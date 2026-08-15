/* =====================================================================
   ESSÊNCIA HORIZONTE — script.js
   -----------------------------------------------------------------
   O QUE ESTE FICHEIRO FAZ (lê isto primeiro):
   1. Abre/fecha o menu no celular
   2. Coloca o ano atual no rodapé automaticamente
   3. Monta o link do WhatsApp com a mensagem de boas-vindas
      e aplica-o a todos os botões "Falar no WhatsApp" do site
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Menu responsivo ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    const aberto = mainNav.classList.toggle("aberto");
    menuToggle.classList.toggle("aberto");
    menuToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  // Fecha o menu automaticamente ao clicar num link (importante no celular)
  mainNav.querySelectorAll("a:not(.whatsapp-link)").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("aberto");
      menuToggle.classList.remove("aberto");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 2. Ano automático no rodapé ---------- */
  const anoAtual = document.getElementById("anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  /* ---------- 3. Link direto para o WhatsApp ---------- */
  // Número da Essência Horizonte, no formato internacional (sem + nem espaços)
  const numeroWhatsApp = "258868421741";

  // Mensagem que a pessoa já vai levar pronta para enviar
  const mensagemBoasVindas =
    "Olá, Essência Horizonte! 👋 Vim através do vosso site e gostaria de saber mais sobre os vossos serviços.";

  // Monta o link oficial do WhatsApp (wa.me) com a mensagem já preenchida
  const linkWhatsApp =
    "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagemBoasVindas);

  // Aplica este link a TODOS os botões com a classe "whatsapp-link"
  // (existe um no menu, um no hero e um na secção de contacto)
  document.querySelectorAll(".whatsapp-link").forEach(function (botao) {
    botao.setAttribute("href", linkWhatsApp);
  });

});
