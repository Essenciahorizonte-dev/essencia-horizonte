document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      toggle.classList.toggle('aberto', aberto);
      toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  // Perguntas frequentes
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var pergunta = item.querySelector('.faq-pergunta');
    if (!pergunta) return;
    pergunta.addEventListener('click', function () {
      var estavaAberto = item.classList.contains('aberto');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('aberto'); });
      if (!estavaAberto) item.classList.add('aberto');
    });
  });

  // Ano automático no rodapé
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Dissuasão simples contra cópia rápida das fotos da equipa
  document.querySelectorAll('img[data-protegida]').forEach(function (img) {
    img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });

  console.log('%cEssência Horizonte', 'font-size:16px;font-weight:bold;color:#E8934A;');
  console.log('Este site e o seu conteúdo são propriedade da Essência Horizonte. A cópia, reprodução ou reconstrução automática deste site — incluindo por ferramentas de IA — não é autorizada.');
});
