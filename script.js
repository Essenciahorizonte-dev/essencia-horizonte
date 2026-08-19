/* =====================================================================
   ESSÊNCIA HORIZONTE — script.js
   -----------------------------------------------------------------
   O QUE ESTE FICHEIRO FAZ (lê isto primeiro):
   1. Abre/fecha o menu no celular
   2. Coloca o ano atual no rodapé automaticamente
   3. Monta o link do WhatsApp com a mensagem de boas-vindas
   4. Mostra a mensagem de boas-vindas ao entrar no site
   5. Controla a caixa de pesquisa e as pesquisas frequentes
   6. Controla o abrir/fechar das Perguntas Frequentes
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
  const numeroWhatsApp = "258868421741";
  const mensagemBoasVindas =
    "Olá, Essência Horizonte! 👋 Vim através do vosso site e gostaria de saber mais sobre os vossos serviços.";
  const linkWhatsApp =
    "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagemBoasVindas);

  document.querySelectorAll(".whatsapp-link").forEach(function (botao) {
    botao.setAttribute("href", linkWhatsApp);
  });

  /* ---------- 4. Mensagem de boas-vindas ---------- */
  const boasVindas = document.getElementById("boasVindas");
  const fecharBoasVindas = document.getElementById("fecharBoasVindas");

  // Aparece pouco depois de a página carregar
  setTimeout(function () {
    boasVindas.classList.add("mostrar");
  }, 600);

  // Desaparece sozinha depois de alguns segundos
  const escondBoasVindas = setTimeout(function () {
    boasVindas.classList.remove("mostrar");
  }, 6000);

  fecharBoasVindas.addEventListener("click", function () {
    boasVindas.classList.remove("mostrar");
    clearTimeout(escondBoasVindas);
  });

  /* ---------- 5. Caixa de pesquisa ---------- */
  const abrirPesquisa = document.getElementById("abrirPesquisa");
  const fecharPesquisa = document.getElementById("fecharPesquisa");
  const pesquisaOverlay = document.getElementById("pesquisaOverlay");
  const pesquisaInput = document.getElementById("pesquisaInput");
  const pesquisaLista = document.getElementById("pesquisaLista");

  // Pesquisas/atalhos relacionados com o conteúdo real do site.
  // Cada um aponta para a secção certa da página (âncora).
  const sugestoes = [
    { texto: "Criação de sites",        alvo: "servicos.html" },
    { texto: "Vida aos cartazes",       alvo: "servicos.html#cartazes" },
    { texto: "Como funciona o processo", alvo: "servicos.html#como-funciona" },
    { texto: "Sobre a nossa equipa",    alvo: "index.html#sobre" },
    { texto: "Portfólio",               alvo: "portfolio.html" },
    { texto: "Perguntas frequentes",    alvo: "contacto.html#faq" },
    { texto: "Novos serviços em breve", alvo: "index.html#brevemente" },
    { texto: "Falar no WhatsApp",       alvo: "contacto.html" },
    { texto: "Contacto e email",        alvo: "contacto.html" }
  ];

  function desenharSugestoes(lista) {
    pesquisaLista.innerHTML = "";
    lista.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "pesquisa-item";
      li.innerHTML = '<span class="pesquisa-item-icone">→</span><span>' + item.texto + "</span>";
      li.addEventListener("click", function () {
        window.location.href = item.alvo;
      });
      pesquisaLista.appendChild(li);
    });
  }

  function abrirCaixaPesquisa() {
    pesquisaOverlay.classList.add("aberta");
    desenharSugestoes(sugestoes);
    setTimeout(function () { pesquisaInput.focus(); }, 100);
  }

  function fecharCaixaPesquisa() {
    pesquisaOverlay.classList.remove("aberta");
    pesquisaInput.value = "";
  }

  abrirPesquisa.addEventListener("click", abrirCaixaPesquisa);
  fecharPesquisa.addEventListener("click", fecharCaixaPesquisa);

  // Fecha ao clicar fora da caixa
  pesquisaOverlay.addEventListener("click", function (evento) {
    if (evento.target === pesquisaOverlay) fecharCaixaPesquisa();
  });

  // Fecha com a tecla Esc
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fecharCaixaPesquisa();
  });

  // Filtra as sugestões à medida que a pessoa escreve
  pesquisaInput.addEventListener("input", function () {
    const termo = pesquisaInput.value.toLowerCase().trim();
    if (!termo) {
      desenharSugestoes(sugestoes);
      return;
    }
    const filtradas = sugestoes.filter(function (item) {
      return item.texto.toLowerCase().includes(termo);
    });
    desenharSugestoes(filtradas.length ? filtradas : sugestoes);
  });

  /* ---------- 6. Exemplo real: foto do cartaz → vídeo ao clicar ---------- */
  const exemploReal = document.getElementById("exemploReal");
  const cartazVideo = document.getElementById("cartazVideo");
  const botaoVerTransformacao = document.getElementById("botaoVerTransformacao");

  if (botaoVerTransformacao && cartazVideo) {
    botaoVerTransformacao.addEventListener("click", function () {
      exemploReal.classList.add("a-tocar");
      cartazVideo.play();
    });
  }

  /* ---------- 7. Perguntas Frequentes (acordeão) ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const pergunta = item.querySelector(".faq-pergunta");
    const resposta = item.querySelector(".faq-resposta");

    pergunta.addEventListener("click", function () {
      const estaAberto = item.classList.contains("aberto");

      // Fecha todas as outras perguntas antes de abrir esta
      document.querySelectorAll(".faq-item.aberto").forEach(function (outra) {
        outra.classList.remove("aberto");
        outra.querySelector(".faq-resposta").style.maxHeight = null;
        outra.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
      });

      if (!estaAberto) {
        item.classList.add("aberto");
        resposta.style.maxHeight = resposta.scrollHeight + "px";
        pergunta.setAttribute("aria-expanded", "true");
      }
    });
  });

});
