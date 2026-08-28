/* ==========================================================================
   PROVIDENTIA FINANCIAL — script.js
   JavaScript puro, sem dependência nenhuma.
   TUDO QUE PRECISA SER TROCADO ESTÁ NO BLOCO CONFIG LOGO ABAIXO.
   ========================================================================== */

'use strict';

/* ==========================================================================
   CONFIG — [CONFIRMAR] dados de contato
   --------------------------------------------------------------------------
   Telefone informado pela Monica e conferido.

   O dominio providentiafinancialgroup.com ja existe e esta na Wix.

   O e-mail ainda depende de a CAIXA ser criada. Dominio registrado nao cria
   caixa de e-mail sozinho: e preciso contratar o servico, na propria Wix ou
   em outro lugar, e apontar os registros MX. Enquanto isso nao acontecer, o
   link mailto abre normalmente no programa de e-mail de quem clicar, mas a
   mensagem volta.

   whatsapp    Só números, com código do país. Nos EUA começa com 1.
               Exemplo: '14049557002'
   telefone    Como o número aparece escrito na tela.
   email       Endereço de e-mail.
   instagram   Só o usuário, sem @ e sem link.
   facebook    Só o usuário/página. Vazio esconde o ícone.
   linkedin    Trecho final da URL do perfil. Vazio esconde o ícone.

   Campo vazio mantém o marcador [ ... ] visível no site, de propósito:
   é assim que você percebe que faltou preencher.
   ========================================================================== */
var CONFIG = {
  // Telefone real, informado pela Monica.
  whatsapp:  '14703146160',
  telefone:  '(470) 314-6160',
  email:     'monica@providentiafinancialgroup.com', // <<< depende da caixa ser criada
  /* Agenda da Monica. Todo botão "Agendar uma conversa" do site aponta
     para cá. Vazio faz esses botões voltarem a levar para a seção de
     contato, com telefone e WhatsApp, em vez de quebrarem. */
  calendly:  'https://calendly.com/monicaprovidentia',
  /* Chave do Web3Forms, que recebe o formulário e encaminha por e-mail
     para monica@providentiafinancialgroup.com.

     Ela fica visível no código, e isso é normal: toda chave do Web3Forms
     aparece no HTML de quem usa o serviço. Ela não dá acesso a nada, só
     permite mandar mensagem para o endereço cadastrado. Para trocar o
     destino ou desativar, é no painel do web3forms.com.

     Vazia deixa a seção "Prefere escrever?" escondida por inteiro. */
  web3forms: 'd70d1245-acf0-4837-a12e-0dfc430a2d95',
  instagram: 'monica.providentia',
  facebook:  '',                             // <<< vazio esconde o ícone
  linkedin:  ''                              // <<< vazio esconde o ícone
};

/* ==========================================================================
   VIDEOS — [SUBSTITUIR] um link por card
   --------------------------------------------------------------------------
   Cole o endereço do vídeo como ele aparece na barra do navegador. Serve
   YouTube ou Vimeo, nestes formatos:
     https://www.youtube.com/watch?v=XXXXXXXXXXX
     https://youtu.be/XXXXXXXXXXX
     https://vimeo.com/123456789
   Chave vazia deixa o card marcado como pendente no site.
   ========================================================================== */
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

/* ==========================================================================
   AS PALAVRAS QUE O SCRIPT ESCREVE
   --------------------------------------------------------------------------
   Quase todo texto do site está no HTML, e é o construir.js que o coloca lá.
   Mas um punhado de frases só existe em resposta a alguma coisa que a pessoa
   faz: o erro de um campo, o "Enviando...", a mensagem que já vai escrita no
   WhatsApp. Essas nascem aqui, e por isso precisam existir nos dois idiomas.

   QUAL IDIOMA ESTÁ NO AR
   Sai do  lang  da própria página, que o construir.js escreve certo em cada
   uma. Não há adivinhação, não há detecção de navegador e não há cookie: a
   página em inglês fala inglês porque ela É a página em inglês.

   Se algum dia entrar um terceiro idioma, é copiar o bloco e usar a mesma
   sigla que estiver no textos.js.
   ========================================================================== */
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
    /* O assunto e o remetente do e-mail seguem o idioma de quem escreveu:
       assim a Monica ve na caixa de entrada, antes de abrir, em que lingua
       aquela pessoa espera ser respondida. */
    assunto:    'Site (EN): ',
    semNome:    'contact',
    remetente:  'Providentia Financial site'
  }

};

/* O idioma desta página. pt-BR e pt viram pt; qualquer outro cai em en. */
var IDIOMA = (document.documentElement.lang || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
var FALA = FALAS[IDIOMA];

/* Mensagem que já vai escrita no WhatsApp quando a pessoa clica. */
var MENSAGEM = FALA.zap;


/* -------------------------------------------------------------------------- */
var reduzirMovimento = window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }


/* ==========================================================================
   1. Contatos
   Preenche todo link e todo texto marcado no HTML. Um lugar só para editar.
   ========================================================================== */
function montarContatos() {

  $$('[data-whatsapp]').forEach(function (el) {
    if (!CONFIG.whatsapp) { return; }
    el.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(MENSAGEM));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* A agenda abre em aba nova: é ferramenta de terceiro, e mandar a pessoa
     para fora do site sem volta no meio de uma decisão é perder a pessoa.
     Sem endereço configurado, o botão cai para a seção de contato. */
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


/* ==========================================================================
   2. Menu do celular
   ========================================================================== */
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


/* ==========================================================================
   3. Submenu de serviços
   --------------------------------------------------------------------------
   Abrir e fechar é trabalho do CSS (:hover e :focus-within). Aqui só entram
   as duas coisas que o CSS não resolve: fechar no Esc, e informar o estado
   ao leitor de tela pelo aria-expanded.
   ========================================================================== */
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


/* ==========================================================================
   4. O item do menu acompanha a rolagem
   O sublinhado dourado passa para a seção em que a pessoa está.
   ========================================================================== */
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


/* ==========================================================================
   5. Botão flutuante do WhatsApp
   Só aparece depois que a abertura sai da tela, para não cobrir os botões
   que já estão ali em cima.
   ========================================================================== */
function montarZap() {
  var zap = $('.zap');
  if (!zap) { return; }

  /* POR QUE ISTO TEM DOIS LIMITES E NÃO UM
     Com um limite só, quem para de rolar exatamente em cima dele fica com o
     botão entrando e saindo a cada tremida do dedo ou do trackpad: some,
     volta, some. É o piscar. Com dois, o botão aparece ao passar de ENTRA e
     só some ao voltar abaixo de SAI. A faixa de 120px entre os dois é a
     zona morta onde nada acontece. */
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


/* ==========================================================================
   6. A frase que abre com a rolagem
   --------------------------------------------------------------------------
   O painel entra estreito e vai abrindo até quase a largura da tela, com o
   canto endireitando no caminho. O movimento é amortecido, então continua
   macio mesmo com a rolagem aos trancos.

   Funciona em qualquer seção marcada com data-abre que tenha dentro um
   .frase__painel. Para mover o efeito, mova os dois.

   Para calibrar, mexa só neste objeto:
     larguraDe / larguraAte   largura do painel, em % da seção
     raioAte                  arredondamento no começo, em px
     raioTermina              em que ponto da rolagem o canto termina de
                              endireitar (0 a 1)
     suavidade                quanto menor, mais lento e mais macio

   Sem JavaScript, ou com prefers-reduced-motion, o painel já nasce aberto
   e a frase aparece igual. O efeito é enfeite, nunca requisito de leitura.
   ========================================================================== */
var ABRE = {
  /* 74 e nao 66: abaixo disso a faixa util dentro do painel fica menor que
     os 800px do texto, e a frase quebraria no comeco da rolagem para
     desquebrar no fim. O movimento perde seis pontos e ganha em nao pular. */
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

  /* 0 quando o topo do painel está na base da tela, 1 quando chega ao topo. */
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


/* ==========================================================================
   7. Vídeos
   --------------------------------------------------------------------------
   O iframe só entra na página depois do clique. Antes disso o YouTube não
   escreve cookie em quem apenas passou pelo site, e a página abre mais
   leve, porque um embed custa algumas centenas de KB cada.
   ========================================================================== */
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

/* Converte o link normal no endereço de incorporação. Devolve string vazia
   se não reconhecer, e aí o vídeo abre em aba nova em vez de quebrar. */
function paraIncorporar(url) {
  var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) { return 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&rel=0'; }
  var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) { return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1&dnt=1'; }
  return '';
}


/* ==========================================================================
   8. Formulário
   --------------------------------------------------------------------------
   Envia para o Web3Forms por fetch, sem sair da página. Sem servidor nosso e
   sem banco de dados: o Web3Forms recebe e encaminha por e-mail.

   Sem chave configurada a seção inteira fica escondida, e o aviso vai só
   para o console. Formulário desativado na tela é pior que formulário
   nenhum: parece site quebrado.
   ========================================================================== */
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

  /* Sem chave, a secao inteira fica escondida e o visitante nunca sabe que
     ela existe. A versao anterior mostrava o formulario desativado com um
     aviso, e o resultado era um site com cara de inacabado.

     O aviso continua existindo, mas so no console, para quem for publicar. */
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

    /* O assunto e o remetente sao montados aqui, e nao ficam fixos no HTML.
       Com valor fixo, toda mensagem chegaria com o mesmo titulo e o mesmo
       nome, e a caixa de entrada viraria uma pilha indistinguivel. Assim
       ela ve quem escreveu e sobre o que antes de abrir. */
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


/* ========================================================================== */
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
