

'use strict';

var CONFIG = {
  // Telefone real, informado pela Monica.
  whatsapp:  '14703146160',
  telefone:  '(470) 314-6160',
  email:     'monica@providentiafinancialgroup.com', // <<< depende da caixa ser criada
  
  calendly:  'https://calendly.com/monicaprovidentia',
  
  web3forms: 'd70d1245-acf0-4837-a12e-0dfc430a2d95',
  instagram: 'monica.providentia',
  facebook:  '',                             // <<< vazio esconde o ícone
  linkedin:  ''                              // <<< vazio esconde o ícone
};

var VIDEOS = {
  'historia-1':      '',
  'historia-2':      '',
  'historia-3':      '',
  'regra-72':        '',
  'juros-compostos': '',
  'comecar-cedo':    '',
  'impostos':        '',
  'faculdade':       ''
};

var FALAS = {

  pt: {
    zap:        'Olá! Vim pelo site da Providentia Financial e gostaria de agendar uma conversa.',
    videoFalta: 'Vídeo ainda não publicado: ',
    assistir:   'Assistir: ',
    nomeVideo:  'vídeo',
    erroNome:   'Escreva seu nome.',
    erroEmail:  'Confira o endereço de e-mail.',
    erroMsg:    'Escreva sua mensagem.',
    faltam:     'Faltam alguns campos.',
    enviando:   'Enviando...',
    recebido:   'Recebido. Respondo em até um dia útil.',
    falhou:     'Não consegui enviar agora. Tente de novo, ou fale ',
    peloZap:    'pelo WhatsApp',
    assunto:    'Site: ',
    semNome:    'contato',
    remetente:  'Site da Providentia Financial'
  },

  en: {
    zap:        'Hi! I came from the Providentia Financial site and I would like to book a conversation.',
    videoFalta: 'Video not published yet: ',
    assistir:   'Watch: ',
    nomeVideo:  'video',
    erroNome:   'Please write your name.',
    erroEmail:  'Please check the email address.',
    erroMsg:    'Please write your message.',
    faltam:     'Some fields are missing.',
    enviando:   'Sending...',
    recebido:   'Got it. I answer within one business day.',
    falhou:     'I could not send that right now. Try again, or reach me ',
    peloZap:    'on WhatsApp',
    
    assunto:    'Site (EN): ',
    semNome:    'contact',
    remetente:  'Providentia Financial site'
  }

};

var IDIOMA = (document.documentElement.lang || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
var FALA = FALAS[IDIOMA];

var MENSAGEM = FALA.zap;

var reduzirMovimento = window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

function montarContatos() {

  $$('[data-whatsapp]').forEach(function (el) {
    if (!CONFIG.whatsapp) { return; }
    el.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(MENSAGEM));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  
  $$('[data-agendar]').forEach(function (el) {
    if (CONFIG.calendly) {
      el.setAttribute('href', CONFIG.calendly);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.setAttribute('href', (el.getAttribute('data-agendar') || '') + '#contato');
    }
  });

  $$('[data-telefone]').forEach(function (el) {
    if (CONFIG.telefone) {
      el.setAttribute('href', 'tel:+' + CONFIG.telefone.replace(/\D/g, ''));
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  });

  $$('[data-email]').forEach(function (el) {
    if (CONFIG.email) {
      el.setAttribute('href', 'mailto:' + CONFIG.email);
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  });

  var redes = {
    'data-instagram': CONFIG.instagram ? 'https://instagram.com/' + CONFIG.instagram : '',
    'data-facebook':  CONFIG.facebook  ? 'https://facebook.com/'  + CONFIG.facebook  : '',
    'data-linkedin':  CONFIG.linkedin  ? 'https://linkedin.com/in/' + CONFIG.linkedin : ''
  };

  Object.keys(redes).forEach(function (attr) {
    $$('[' + attr + ']').forEach(function (el) {
      if (redes[attr]) {
        el.setAttribute('href', redes[attr]);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        // Rede sem perfil sai do ar inteira. Ícone que leva a lugar nenhum
        // é pior que ícone ausente.
        var item = el.closest('li');
        if (item) { item.remove(); } else { el.remove(); }
      }
    });
  });

  // O marcador [ ... ] só some quando o dado real existe
  var textos = {
    telefone:  CONFIG.telefone,
    email:     CONFIG.email,
    instagram: CONFIG.instagram ? '@' + CONFIG.instagram : ''
  };
  $$('[data-preencher]').forEach(function (el) {
    var valor = textos[el.getAttribute('data-preencher')];
    if (valor) { el.textContent = valor; }
  });

  // O ano do rodapé se atualiza sozinho, para ninguém esquecer em janeiro
  $$('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
}

function montarMenu() {
  var botao = $('.sanduiche');
  var painel = $('#menu-movel');
  if (!botao || !painel) { return; }

  function abrir() {
    painel.removeAttribute('inert');
    painel.classList.add('aberto');
    botao.setAttribute('aria-expanded', 'true');
    botao.querySelector('.sanduiche__txt').textContent = botao.getAttribute('data-fechar') || 'Fechar';
    document.body.classList.add('travado');
  }

  function fechar() {
    painel.classList.remove('aberto');
    painel.setAttribute('inert', '');
    botao.setAttribute('aria-expanded', 'false');
    botao.querySelector('.sanduiche__txt').textContent = botao.getAttribute('data-menu') || 'Menu';
    document.body.classList.remove('travado');
  }

  botao.addEventListener('click', function () {
    if (botao.getAttribute('aria-expanded') === 'true') { fechar(); } else { abrir(); }
  });

  $$('a', painel).forEach(function (a) { a.addEventListener('click', fechar); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      fechar();
      botao.focus();
    }
  });

  // Se a tela crescer com o menu aberto, o painel some pelo CSS. Fechar aqui
  // evita que o body continue travado e o rótulo continue em "Fechar".
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900 && botao.getAttribute('aria-expanded') === 'true') { fechar(); }
  }, { passive: true });
}

function montarSubmenu() {
  $$('.tem-sub').forEach(function (item) {
    var botao = $('.sub-abre', item);
    if (!botao) { return; }

    function marcar(aberto) { botao.setAttribute('aria-expanded', String(aberto)); }

    item.addEventListener('mouseenter', function () { item.classList.remove('fechado'); marcar(true); });
    item.addEventListener('mouseleave', function () { marcar(false); });
    item.addEventListener('focusin',  function () { item.classList.remove('fechado'); marcar(true); });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) { marcar(false); }
    });

    // Esc fecha e devolve o foco ao botão. A classe .fechado vence o
    // :hover no CSS, senão o menu reabriria sozinho com o ponteiro parado
    // em cima. Ela sai assim que o ponteiro ou o foco entram de novo.
    item.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      item.classList.add('fechado');
      marcar(false);
      botao.focus();
    });

    // No toque não existe hover: o clique no botão leva para a seção.
    botao.addEventListener('click', function () {
      var alvo = $('.sub__todos a', item) || $('.sub a', item);
      if (alvo) { alvo.click(); }
    });
  });
}

function montarMenuAtivo() {
  var links = $$('.nav a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) { return; }

  var mapa = {};
  var secoes = [];
  links.forEach(function (a) {
    var alvo = document.querySelector(a.getAttribute('href'));
    if (alvo) { mapa[alvo.id] = a; secoes.push(alvo); }
  });

  function marcar(a) {
    links.forEach(function (o) { o.classList.remove('nav__ativo'); o.removeAttribute('aria-current'); });
    a.classList.add('nav__ativo');
    a.setAttribute('aria-current', 'page');
  }

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting && mapa[e.target.id]) { marcar(mapa[e.target.id]); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secoes.forEach(function (s) { obs.observe(s); });
}

function montarZap() {
  var zap = $('.zap');
  if (!zap) { return; }

  
  var ENTRA = 0;
  var SAI = 0;

  function medir() {
    var abertura = $('.abertura');
    // Nas páginas internas não existe abertura: aí o botão entra depois de
    // uma rolagem curta, em vez de nunca aparecer.
    ENTRA = abertura ? (abertura.offsetTop + abertura.offsetHeight - 140) : 420;
    SAI = Math.max(0, ENTRA - 120);
  }

  var visivel = false;
  var esperando = false;

  function conferir() {
    var y = window.scrollY;
    if (!visivel && y > ENTRA) { visivel = true; zap.classList.add('aparece'); }
    else if (visivel && y < SAI) { visivel = false; zap.classList.remove('aparece'); }
    esperando = false;
  }

  window.addEventListener('scroll', function () {
    if (!esperando) { window.requestAnimationFrame(conferir); esperando = true; }
  }, { passive: true });

  window.addEventListener('resize', function () { medir(); conferir(); }, { passive: true });

  // A altura da abertura muda quando a foto termina de carregar. Sem medir de
  // novo, o limite fica calculado em cima de uma página que ainda não existia.
  window.addEventListener('load', function () { medir(); conferir(); });

  medir();
  conferir();
}

var ABRE = {
  
  desktop: { larguraDe: 74, larguraAte: 95 },
  mobile:  { larguraDe: 84, larguraAte: 100 },
  raioAte: 22,
  raioTermina: 0.9,
  suavidade: 0.12
};

function montarAbertura() {
  var secao = $('[data-abre]');
  if (!secao) { return; }

  var painel = $('.frase__painel', secao);
  if (!painel) { return; }

  function medidas() { return window.innerWidth < 700 ? ABRE.mobile : ABRE.desktop; }

  function aplicar(p) {
    var m = medidas();
    var largura = m.larguraDe + (m.larguraAte - m.larguraDe) * p;
    var pr = Math.min(1, p / ABRE.raioTermina);
    painel.style.width = largura.toFixed(2) + '%';
    painel.style.borderRadius = (ABRE.raioAte * (1 - pr)).toFixed(1) + 'px';
  }

  if (reduzirMovimento || !('requestAnimationFrame' in window)) { aplicar(1); return; }

  
  function progresso() {
    var r = painel.getBoundingClientRect();
    var altura = window.innerHeight || document.documentElement.clientHeight;
    return Math.min(1, Math.max(0, 1 - (r.top / altura)));
  }

  var atual = progresso();
  var alvo = atual;
  var rodando = false;

  function passo() {
    atual += (alvo - atual) * ABRE.suavidade;
    if (Math.abs(alvo - atual) < 0.0004) { atual = alvo; rodando = false; }
    aplicar(atual);
    if (rodando) { window.requestAnimationFrame(passo); }
  }

  function acordar() {
    alvo = progresso();
    if (!rodando) { rodando = true; window.requestAnimationFrame(passo); }
  }

  aplicar(atual);
  window.addEventListener('scroll', acordar, { passive: true });
  window.addEventListener('resize', acordar, { passive: true });
}

function montarVideos() {
  $$('.video__capa').forEach(function (capa) {
    var vimeo = capa.getAttribute('data-vimeo');
    var chave = capa.getAttribute('data-video');
    var url = vimeo ? 'https://vimeo.com/' + vimeo
                    : (chave && typeof VIDEOS !== 'undefined' ? (VIDEOS[chave] || '') : '');

    var titulo = capa.parentNode.querySelector('h2, h3');
    var nome = titulo ? titulo.textContent.trim() : FALA.nomeVideo;

    if (!url) {
      capa.setAttribute('disabled', '');
      capa.setAttribute('aria-label', FALA.videoFalta + nome);
      return;
    }

    var item = capa.closest('.video') || capa.parentNode;
    if (item) { item.classList.add('video--pronto'); }
    if (!capa.getAttribute('aria-label')) { capa.setAttribute('aria-label', FALA.assistir + nome); }

    capa.addEventListener('click', function () {
      var incorporar = paraIncorporar(url);
      if (!incorporar) { window.open(url, '_blank', 'noopener'); return; }
      var frame = document.createElement('iframe');
      frame.src = incorporar;
      frame.title = nome;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      capa.innerHTML = '';
      capa.appendChild(frame);
      capa.style.cursor = 'default';
    }, { once: true });
  });
}

function paraIncorporar(url) {
  var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) { return 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&rel=0'; }
  var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) { return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1&dnt=1'; }
  return '';
}

function montarFormulario() {
  var form = $('.form');
  if (!form) { return; }

  var secao = form.closest('.escrever');
  var estado = $('.form__estado', form);
  var botao = $('button[type="submit"]', form);
  var chave = $('input[name="access_key"]', form);

  // O campo da chave pode nao existir se alguem editar o HTML. Sem esta
  // guarda, o formulario inteiro parava de montar por causa disso.
  if (!chave) { return; }

  
  if (!CONFIG.web3forms) {
    if (window.console && console.info) {
      console.info('[Providentia] A secao "Prefere escrever?" esta oculta: ' +
        'falta a chave do Web3Forms no CONFIG, no topo do script.js. ' +
        'Pegue a chave gratuita em https://web3forms.com.');
    }
    return;
  }

  chave.value = CONFIG.web3forms;
  secao.removeAttribute('hidden');

  var regras = {
    nome:     { msg: FALA.erroNome,  ok: function (v) { return v.trim().length >= 2; } },
    email:    { msg: FALA.erroEmail, ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
    mensagem: { msg: FALA.erroMsg,   ok: function (v) { return v.trim().length >= 5; } }
  };

  function campoDe(input) { return input.closest('.campo'); }

  function mostrar(input, msg) {
    var campo = campoDe(input);
    var alvo = $('[data-erro="' + input.name + '"]', form);
    if (campo) { campo.classList.toggle('com-erro', Boolean(msg)); }
    if (alvo) {
      alvo.textContent = msg || '';
      // O erro só é anunciado quando existe: aria-describedby apontando
      // para um span vazio faz o leitor de tela ler silêncio depois do
      // rótulo, toda vez que a pessoa entra no campo.
      if (msg) { input.setAttribute('aria-describedby', 'erro-' + input.name); alvo.id = 'erro-' + input.name; }
      else { input.removeAttribute('aria-describedby'); }
    }
    if (msg) { input.setAttribute('aria-invalid', 'true'); }
    else { input.removeAttribute('aria-invalid'); }
  }

  function validar(input) {
    var r = regras[input.name];
    if (!r) { return true; }
    var vale = r.ok(input.value);
    mostrar(input, vale ? '' : r.msg);
    return vale;
  }

  // O erro some assim que a pessoa corrige, e não só no próximo envio
  Object.keys(regras).forEach(function (nome) {
    var input = form.elements[nome];
    if (!input) { return; }
    input.addEventListener('input', function () {
      if (campoDe(input) && campoDe(input).classList.contains('com-erro')) { validar(input); }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var primeiro = null;
    Object.keys(regras).forEach(function (nome) {
      var input = form.elements[nome];
      if (input && !validar(input) && !primeiro) { primeiro = input; }
    });
    if (primeiro) {
      estado.className = 'form__estado form__estado--erro';
      estado.textContent = FALA.faltam;
      primeiro.focus();
      return;
    }

    estado.className = 'form__estado';
    estado.textContent = FALA.enviando;
    botao.disabled = true;

    
    var dados = Object.fromEntries(new FormData(form));
    var quem = (dados.nome || '').trim();
    var sobre = (dados.assunto || '').trim();
    dados.subject = FALA.assunto + (quem || FALA.semNome) + (sobre ? ' - ' + sobre : '');
    dados.from_name = quem || FALA.remetente;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.success) { throw new Error(res.d.message || 'falhou'); }
        form.reset();
        estado.className = 'form__estado form__estado--certo';
        estado.textContent = FALA.recebido;
      })
      .catch(function () {
        estado.className = 'form__estado form__estado--erro';
        estado.innerHTML = FALA.falhou + '<a href="#" data-whatsapp>' + FALA.peloZap + '</a>.';
        montarContatos();
      })
      .then(function () { botao.disabled = false; });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  montarContatos();
  montarMenu();
  montarSubmenu();
  montarMenuAtivo();
  montarZap();
  montarVideos();
  montarFormulario();
  montarAbertura();
});
