/* ==========================================================================
   PROVIDENTIA FINANCIAL — construir.js
   --------------------------------------------------------------------------
   COMO USAR:  abra o terminal nesta pasta e rode

       node construir.js

   Ele lê o dados.js e gera as oito páginas de serviço, mais o menu que
   aparece em todas elas. As páginas geradas são HTML puro: o Netlify serve
   direto, sem build, sem servidor, sem dependência.

   POR QUE ISSO EXISTE
   São oito páginas com o mesmo cabeçalho e o mesmo rodapé. Sem um gerador,
   mudar um item do menu significa abrir oito arquivos e editar o mesmo
   trecho oito vezes. Na nona vez alguém esquece um, e o site fica com dois
   menus diferentes. Aqui o menu mora num lugar só.

   NÃO EDITE OS ARQUIVOS  servicos/*.html  NA MÃO.
   Eles são regerados e as suas mudanças somem. Edite o dados.js ou este
   arquivo, e rode de novo.
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const { SERVICOS, DESTAQUE, CAPAS, VIDEO_INFO } = require('./dados.js');

const raiz = __dirname;
const saida = path.join(raiz, 'servicos');

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* O ícone do WhatsApp aparece em vários lugares. Fica numa constante para o
   caminho SVG não ser copiado seis vezes. */
const ZAP = '<svg class="ico-zap" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>';

/* O arquivo oficial do escudo, PNG com fundo transparente. Como tem alfa,
   ele pode ir sobre qualquer cor, e não só sobre branco. O alt fica vazio
   de propósito: o <a> em volta já tem aria-label com o nome da marca, e
   repetir faria o leitor de tela ler a marca duas vezes seguidas. */
const ESCUDO = function (base) {
  return '<img class="marca__escudo" src="' + base + 'escudo.png" alt="" width="500" height="500" decoding="async">';
};

/* base: '' na raiz, '../' dentro de servicos/ */
function marca(base, classe) {
  return `<a class="marca${classe ? ' ' + classe : ''}" href="${base}index.html" aria-label="Providentia Financial, início">
      ${ESCUDO(base)}
      <span class="marca__nome"><b>Providentia</b><i>Financial</i></span>
    </a>`;
}

function submenu(base, atual) {
  return SERVICOS.map(s =>
    `            <li><a href="${base}servicos/${s.slug}.html"${s.slug === atual ? ' aria-current="page"' : ''}>${esc(s.nome)}</a></li>`
  ).join('\n');
}

function cabecalho(base, atual) {
  return `<header class="topo" id="topo">
  <div class="faixa topo__in">

    ${marca(base)}

    <nav class="nav" aria-label="Navegação principal">
      <ul>
        <li><a href="${base}index.html">Início</a></li>
        <li><a href="${base}index.html#sobre">Sobre</a></li>
        <li class="tem-sub">
          <button class="sub-abre" type="button" aria-expanded="false" aria-controls="sub-servicos">
            Serviços
            <svg class="ico-seta" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <ul class="sub" id="sub-servicos">
${submenu(base, atual)}
            <li class="sub__todos"><a href="${base}index.html#solucoes">Ver todos os serviços</a></li>
          </ul>
        </li>
        <li><a href="${base}depoimentos.html">Depoimentos</a></li>
        <li><a href="${base}index.html#educacao">Educação</a></li>
        <li><a href="${base}index.html#contato">Contato</a></li>
      </ul>
    </nav>

    <a class="botao botao--marinho botao--topo" href="${base}index.html#contato">Agendar uma conversa</a>

    <button class="sanduiche" type="button" aria-expanded="false" aria-controls="menu-movel">
      <span class="sanduiche__txt">Menu</span>
      <svg class="ico-menu" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
    </button>

  </div>
</header>

<div class="painel" id="menu-movel" inert>
  <nav class="faixa painel__in" aria-label="Navegação">
    <ul class="painel__lista">
      <li><a href="${base}index.html">Início</a></li>
      <li><a href="${base}index.html#sobre">Sobre</a></li>
      <li><a href="${base}index.html#solucoes">Serviços</a></li>
${SERVICOS.map(s => `      <li class="painel__sub"><a href="${base}servicos/${s.slug}.html">${esc(s.nome)}</a></li>`).join('\n')}
      <li><a href="${base}depoimentos.html">Depoimentos</a></li>
      <li><a href="${base}index.html#educacao">Educação</a></li>
      <li><a href="${base}index.html#contato">Contato</a></li>
    </ul>
    <div class="painel__pe">
      <a class="botao botao--marinho botao--cheio" href="${base}index.html#contato">Agendar uma conversa</a>
      <a class="botao botao--linha botao--cheio" href="#" data-whatsapp>${ZAP} Falar no WhatsApp</a>
    </div>
  </nav>
</div>`;
}

function rodape(base) {
  return `<footer class="rodape">
  <div class="faixa rodape__in">

    ${marca(base, 'marca--rodape')}

    <ul class="rodape__dados">
      <li>
        <svg class="ico-mini" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
        <a href="#" data-telefone><span data-preencher="telefone">[ TELEFONE ]</span></a>
      </li>
      <li>
        <svg class="ico-mini" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
        <a href="#" data-email><span data-preencher="email">[ E-MAIL ]</span></a>
      </li>
      <li>
        <svg class="ico-mini" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
        <!-- [CONFIRMAR] A Monica mora na Flórida. Isto precisa bater com os
             estados em que ela e de fato licenciada, que podem ser mais de um. -->
        <span>Atendendo a Flórida e estados vizinhos</span>
      </li>
    </ul>

    <ul class="rodape__redes">
      <li><a href="#" data-facebook aria-label="Facebook da Providentia Financial"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 8.6V7.1c0-.8.2-1.2 1.4-1.2h1.5V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.5H8.3V11h2.4v8h3v-8h2.5l.4-2.4H14z"/></svg></a></li>
      <li><a href="#" data-instagram aria-label="Instagram da Providentia Financial"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="3.9" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.1" cy="6.9" r="1.3"/></svg></a></li>
      <li><a href="#" data-linkedin aria-label="Meu perfil no LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.9 8.9H4.2V19h2.7zM5.5 4.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM19.8 19h-2.7v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19H11V8.9h2.6v1.4h.1a2.9 2.9 0 0 1 2.6-1.4c2.8 0 3.3 1.8 3.3 4.2z"/></svg></a></li>
    </ul>

  </div>

  <div class="faixa rodape__legal">
    <!-- ====================================================================
         O BLOCO JURÍDICO
         --------------------------------------------------------------------
         SOBRE O NÚMERO DA LICENÇA
         Ele NÃO é dado sigiloso. Licença de corretor de seguros nos Estados
         Unidos é registro público: qualquer pessoa consulta a Monica pelo
         nome no site do Departamento de Seguros da Flórida e vê o número, o
         status e as linhas em que ela pode atuar.

         Em vários estados publicá-lo é obrigatório. A Califórnia, por
         exemplo, exige o número da licença em anúncio impresso e cartão de
         visita. Se a Flórida exige em site, EU NÃO SEI, e isso não é coisa
         para deduzir: quem responde é o compliance da Alliance ou da
         companhia, que costuma ter regra própria de publicidade acima da
         regra do estado.

         Por isso o número está aqui como linha SEPARADA e opcional. Se o
         compliance disser que não vai, apague só aquela linha; o resto do
         bloco continua necessário.

         O QUE É NECESSÁRIO DE QUALQUER JEITO
         · o nome sob o qual ela é licenciada, escrito exatamente assim
         · os estados em que ela pode de fato atender
         · o disclosure que a companhia exigir

         Um "e mais" que costuma passar batido: se "Providentia Financial"
         for nome fantasia e não a razão social licenciada, muitos estados
         pedem que o nome legal apareça em algum lugar da página.
         ==================================================================== -->
    <p class="falta">[SUBSTITUIR] Nome legal sob o qual ela é licenciada</p>
    <p class="falta">[SUBSTITUIR] Estados em que ela pode atender</p>
    <p class="falta">[SUBSTITUIR] Disclosure exigido pela companhia</p>
    <!-- [OPCIONAL - PERGUNTE AO COMPLIANCE ANTES]
         <p class="rodape__mini">Licença nº 000000 (Flórida).</p>
    -->
    <p class="rodape__mini">
      Este site tem finalidade informativa e não constitui aconselhamento
      fiscal, jurídico ou de investimento. Garantias dependem da capacidade
      de pagamento da companhia emissora. Nem todos os produtos estão
      disponíveis em todos os estados. Não envie dados financeiros por
      este site.
    </p>
    <p class="rodape__mini">&copy; <span data-ano>2026</span> Providentia Financial.</p>
  </div>
</footer>

<a class="zap" href="#" data-whatsapp aria-label="Falar comigo no WhatsApp">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
</a>`;
}

function cabeca(titulo, descricao, base) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- ==========================================================================
     ARQUIVO GERADO POR  construir.js  A PARTIR DE  dados.js
     NÃO EDITE ESTE ARQUIVO NA MÃO: ele é reescrito na próxima vez que
     alguém rodar  node construir.js  e as suas mudanças somem.
     Para mudar o texto, edite dados.js. Para mudar a estrutura da página,
     edite construir.js.
     ========================================================================== -->

<title>${esc(titulo)} | Providentia Financial</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="https://providentiafinancial.com/${base ? 'servicos/' : ''}"><!-- [SUBSTITUIR] domínio real -->
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}escudo.png">

<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Providentia Financial">
<meta property="og:title" content="${esc(titulo)} | Providentia Financial">
<meta property="og:description" content="${esc(descricao)}">
<meta name="twitter:card" content="summary_large_image">
<!-- [REMOVER ANTES DE PUBLICAR DE VERDADE]
     Enquanto o site for rascunho para revisão, ele não pode aparecer no
     Google. Ainda tem dados por confirmar e nenhum bloco jurídico.
     Quando tudo estiver aprovado, apague estas duas linhas e o robots.txt. -->
<meta name="robots" content="noindex, nofollow">

<meta name="theme-color" content="#0a2368">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&amp;family=Poppins:wght@300;400;500;600;700&amp;family=Allura&amp;display=swap" rel="stylesheet">

<link rel="stylesheet" href="${base}style.css">
</head>
<body>

<a class="pular" href="#conteudo">Ir para o conteúdo</a>

`;
}

/* --------------------------------------------------------------------------
   Uma página de serviço
   -------------------------------------------------------------------------- */
function pagina(s, i) {
  const base = '../';
  const antes = SERVICOS[i - 1];
  const depois = SERVICOS[i + 1];

  const lista = s.lista ? `
    <h2 class="servico__sub">${esc(s.lista.titulo)}</h2>
    <ul class="condicoes">
${s.lista.itens.map(([t, d]) => `      <li>
        <h3>${esc(t)}</h3>
        <p>${esc(d)}</p>
      </li>`).join('\n')}
    </ul>
` : '';

  const vizinhos = (antes || depois) ? `
<nav class="vizinhos faixa" aria-label="Outros serviços">
  ${antes ? `<a class="vizinho vizinho--antes" href="${antes.slug}.html"><span>Anterior</span><b>${esc(antes.nome)}</b></a>` : '<span></span>'}
  ${depois ? `<a class="vizinho vizinho--depois" href="${depois.slug}.html"><span>Próximo</span><b>${esc(depois.nome)}</b></a>` : '<span></span>'}
</nav>
` : '';

  return cabeca(s.nome, s.resumo, base) + cabecalho(base, s.slug) + `

<main id="conteudo">

<article class="servico">
  <div class="faixa">

    <p class="migalha">
      <a href="${base}index.html">Início</a>
      <span aria-hidden="true">/</span>
      <a href="${base}index.html#solucoes">Serviços</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${esc(s.nome)}</span>
    </p>

    <p class="servico__en">${esc(s.en)}</p>
    <h1>${esc(s.titulo)}</h1>

    <!-- O vídeo só carrega depois do clique: antes disso o Vimeo não
         escreve cookie em quem apenas passou pela página, e a página abre
         mais leve. O número do vídeo vem do dados.js. -->
    <div class="video video--largo">
      <button class="video__capa" type="button" data-vimeo="${esc(s.video)}" aria-label="Assistir ao vídeo sobre ${esc(s.nome)}">
        <img src="${esc(CAPAS[s.video] || '')}" alt="" width="1280" height="720" loading="lazy" decoding="async">
        <span class="video__play" aria-hidden="true"><svg class="ico-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg></span>
      </button>
    </div>

    <div class="servico__texto">
${s.texto.map(p => `      <p>${esc(p)}</p>`).join('\n')}
    </div>
${lista}
    <div class="servico__acoes">
      <a class="botao botao--marinho" href="${base}index.html#contato">Agendar uma conversa</a>
      <a class="botao botao--linha" href="#" data-whatsapp>${ZAP} Falar no WhatsApp</a>
    </div>

    <p class="nota nota--esq">
      Nem todos os produtos estão disponíveis em todos os estados, e o que
      serve para você depende da sua idade, da sua saúde, de onde você mora
      e da aprovação da companhia. Esta página é informativa e não é
      aconselhamento fiscal, jurídico ou de investimento.
    </p>

  </div>
</article>
${vizinhos}
</main>

` + rodape(base) + `

<script src="${base}script.js"></script>
</body>
</html>
`;
}

/* --------------------------------------------------------------------------
   Executa
   -------------------------------------------------------------------------- */
if (!fs.existsSync(saida)) { fs.mkdirSync(saida); }

const vistos = new Set();
SERVICOS.forEach((s, i) => {
  ['slug', 'nome', 'video', 'resumo', 'titulo', 'texto'].forEach(campo => {
    if (!s[campo]) { throw new Error('servico ' + i + ' sem "' + campo + '"'); }
  });
  if (vistos.has(s.slug)) { throw new Error('slug repetido: ' + s.slug); }
  vistos.add(s.slug);
  fs.writeFileSync(path.join(saida, s.slug + '.html'), pagina(s, i));
});

/* O menu e o rodapé das páginas da raiz saem daqui também, para não
   divergirem das páginas de serviço. */
fs.writeFileSync(path.join(raiz, '_parciais.json'), JSON.stringify({
  cabecalho: cabecalho('', ''),
  rodape: rodape(''),
  servicos: SERVICOS.map(s => ({ slug: s.slug, nome: s.nome, en: s.en, resumo: s.resumo, video: s.video, capa: CAPAS[s.video] || '', videoTitulo: (VIDEO_INFO[s.video] || {}).titulo || '', segundos: (VIDEO_INFO[s.video] || {}).segundos || 0 })),
  destaque: Object.assign({}, DESTAQUE, { capa: CAPAS[DESTAQUE.video] || '' })
}, null, 2));

console.log('geradas ' + SERVICOS.length + ' paginas em servicos/');
SERVICOS.forEach(s => console.log('  servicos/' + s.slug + '.html   vimeo ' + s.video));
if (SERVICOS.some(s => s.alerta)) {
  console.log('\nATENCAO:');
  SERVICOS.filter(s => s.alerta).forEach(s => console.log('  ' + s.slug + ': ' + s.alerta));
}
