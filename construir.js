/* ==========================================================================
   PROVIDENTIA FINANCIAL — construir.js
   --------------------------------------------------------------------------
   COMO USAR:  abra o terminal nesta pasta e rode

       node construir.js

   Ele lê o dados.js e o textos.js e gera o site inteiro nos dois idiomas.
   As páginas geradas são HTML puro: o servidor entrega direto, sem build,
   sem servidor de aplicação, sem dependência nenhuma.

   O QUE ELE ESCREVE
     servicos/*.html            oito páginas de serviço em português
     en/services/*.html         as mesmas oito em inglês
     index.html                 cabeçalho, rodapé, destaque e educação
     en/index.html              idem, em inglês
     depoimentos.html           cabeçalho, rodapé e a grade de vídeos
     en/testimonials.html       idem, em inglês

   POR QUE ISSO EXISTE
   São vinte páginas com o mesmo cabeçalho e o mesmo rodapé, em dois
   idiomas. Sem um gerador, mudar um item do menu significa abrir vinte
   arquivos e editar o mesmo trecho vinte vezes. Na vigésima primeira vez
   alguém esquece um, e o site fica com dois menus diferentes.

   ISSO JÁ ACONTECEU AQUI: o depoimentos.html era escrito à mão e divergiu.
   Enquanto as outras nove páginas já diziam "Flórida", o rodapé dele
   continuava em "Geórgia". O gerador existe para isso não voltar a
   acontecer, e agora, com dois idiomas, o risco seria o dobro.

   O QUE É GERADO E O QUE É ESCRITO À MÃO
   As páginas iniciais e as de depoimentos têm MIOLO escrito à mão: aquilo é
   redação corrida, e tradução não é trabalho de máquina. Mas o cabeçalho, o
   rodapé e os blocos marcados assim são costurados a cada rodada:

       <!-- GERADO: destaque -->     ...  <!-- FIM: destaque -->
       <!-- GERADO: educacao -->     ...  <!-- FIM: educacao -->
       <!-- GERADO: depoimentos -->  ...  <!-- FIM: depoimentos -->

   O que estiver entre esses marcadores é reescrito. Não edite lá dentro.

   NÃO EDITE OS ARQUIVOS  servicos/*.html  NEM  en/services/*.html  NA MÃO.
   Eles são regerados por inteiro e as suas mudanças somem. Edite o dados.js
   ou este arquivo, e rode de novo.
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const { SERVICOS, DESTAQUE, DEPOIMENTOS, TEMAS, CAPAS, VIDEO_INFO } = require('./dados.js');
const { IDIOMAS, TEXTOS, BANDEIRAS } = require('./textos.js');
const { icone } = require('./icones.js');

const raiz = __dirname;
const SITE_URL = 'https://www.providentiafinancialgroup.com';

/* ==========================================================================
   O CARIMBO DE VERSÃO DO CSS E DO JS
   --------------------------------------------------------------------------
   Todo endereço de style.css e script.js sai daqui com ?v= e oito letras
   tiradas do conteúdo do próprio arquivo. Mudou uma vírgula no CSS, muda o
   carimbo, muda o endereço, e o navegador é obrigado a buscar de novo.

   POR QUE ISSO EXISTE
   O GitHub Pages entrega os arquivos com Cache-Control: max-age=600. Quem
   tinha o site aberto recebia o HTML novo e continuava com o CSS velho por
   até dez minutos. Aconteceu de verdade: a troca de idioma foi ao ar e
   apareceu para a Gabi como duas bandeiras empilhadas, sem as pastilhas,
   porque o HTML já tinha as pastilhas e o CSS que as desenha ainda não
   tinha chegado. O site estava certo no servidor e errado na tela dela.

   A alternativa era pedir para todo mundo apertar Ctrl+Shift+R depois de
   cada mudança, o que funciona uma vez e falha na segunda, justamente com
   quem não sabe que precisa: a Monica, olhando a revisão.

   Só CSS e JS levam carimbo. São os dois que mudam a cada rodada. Foto e
   logo praticamente não mudam, e quando mudarem trocam de nome de arquivo.
   ========================================================================== */
const crypto = require('crypto');

function carimbo(arquivo) {
  const alvo = path.join(raiz, arquivo);
  if (!fs.existsSync(alvo)) { return ''; }
  return '?v=' + crypto.createHash('md5')
    .update(fs.readFileSync(alvo)).digest('hex').slice(0, 8);
}

const V_CSS = carimbo('style.css');
const V_JS = carimbo('script.js');

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* 169 segundos viram "2:49" */
function tempo(segundos) {
  if (!segundos) { return ''; }
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

/* O ícone do WhatsApp aparece em vários lugares. Fica numa constante para o
   caminho SVG não ser copiado seis vezes. */
const ZAP = '<svg class="ico-zap" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>';

/* O telefone, para o canal secundário em inglês. É o mesmo desenho do
   rodapé: traço, e não preenchimento, como todos os ícones deste site. */
const TEL = '<svg class="ico-tel" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>';

const PLAY = '<span class="video__play" aria-hidden="true"><svg class="ico-play" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg></span>';

/* O arquivo oficial do escudo, PNG com fundo transparente. Como tem alfa,
   ele pode ir sobre qualquer cor, e não só sobre branco. O alt fica vazio
   de propósito: o <a> em volta já tem aria-label com o nome da marca, e
   repetir faria o leitor de tela ler a marca duas vezes seguidas. */
const ESCUDO = base =>
  '<img class="marca__escudo" src="' + base + 'escudo.png" alt="" width="500" height="500" decoding="async">';


/* ==========================================================================
   ONDE CADA PÁGINA MORA
   --------------------------------------------------------------------------
   Um lugar só decide o endereço de tudo. Assim o menu, o hreflang, o
   canonical, o og:url e o botão de trocar idioma nunca discordam entre si:
   os cinco perguntam para esta mesma função.

   Devolve o caminho A PARTIR DA RAIZ DO SITE, sem barra na frente:
     pt  inicial  ->  index.html
     pt  serviço  ->  servicos/beneficios-em-vida.html
     en  inicial  ->  en/index.html
     en  serviço  ->  en/services/living-benefits.html
   ========================================================================== */
function conteudo(idioma, s) { return idioma === 'pt' ? s : s.ingles; }

function caminho(idioma, tipo, s) {
  const c = IDIOMAS[idioma];
  if (tipo === 'home') { return c.pasta + 'index.html'; }
  if (tipo === 'depo') { return c.pasta + c.depo; }
  return c.pasta + c.servicos + '/' + conteudo(idioma, s).slug + '.html';
}

/* Quantos "../" para voltar do arquivo até a raiz do site. */
function subir(caminhoDoArquivo) {
  return '../'.repeat(caminhoDoArquivo.split('/').length - 1);
}

/* --------------------------------------------------------------------------
   O ENDEREÇO DE UMA PÁGINA VISTO DE OUTRA
   --------------------------------------------------------------------------
   Os dois vêm a partir da raiz do site, e sai o caminho de um para o outro.
     de en/index.html          para index.html       ->  ../index.html
     de en/index.html          para en/index.html    ->  index.html
     de en/services/x.html     para en/index.html    ->  ../index.html
     de index.html             para servicos/x.html  ->  servicos/x.html

   Sem isto, montar o endereço como base + pasta + arquivo dava coisas como
   ../en/index.html para ir de en/ até en/: funciona, mas é caminho que sai
   da pasta só para voltar. Quem lê o HTML depois tropeça nisso.
   -------------------------------------------------------------------------- */
function relativo(de, para) {
  const daqui = de.split('/');
  daqui.pop();                        /* a pasta de onde eu estou */
  const ate = para.split('/');
  const arquivo = ate.pop();
  let i = 0;
  while (i < daqui.length && i < ate.length && daqui[i] === ate[i]) { i++; }
  return '../'.repeat(daqui.length - i) + ate.slice(i).map(p => p + '/').join('') + arquivo;
}

/* O vídeo daquele item naquele idioma, ou '' se ainda não houver link. */
function video(idioma, item) { return (conteudo(idioma, item) || {}).video || ''; }

/* Um idioma só ganha página de depoimentos se tiver ao menos um vídeo. Uma
   página de depoimentos sem depoimento nenhum é pior do que não ter a
   página, e um item de menu que leva a uma sala vazia é pior ainda. */
function temDepoimentos(idioma) {
  return DEPOIMENTOS.some(d => video(idioma, d));
}

/* Idem para a grade de educação, que é feita só de vídeos. Ela tem dois
   tipos de cartão, e basta um deles existir. */
function temEducacao(idioma) {
  return SERVICOS.some(s => video(idioma, s)) || (TEMAS[idioma] || []).length > 0;
}

/* O contexto de uma página: idioma, textos, e todos os endereços de que ela
   precisa, já relativos a ela mesma. */
function contexto(idioma, tipo, s) {
  const meu = caminho(idioma, tipo, s);
  const base = subir(meu);
  const c = IDIOMAS[idioma];

  /* O mesmo lugar no outro idioma. Se a página não existir lá, o botão leva
     para a inicial de lá, e nunca para um endereço que dá 404. É o caso da
     de depoimentos enquanto faltarem os vídeos em inglês. */
  const equivalente = outro => (tipo === 'depo' && !temDepoimentos(outro))
    ? caminho(outro, 'home')
    : caminho(outro, tipo, s);

  return {
    idioma: idioma,
    cfg: c,
    T: TEXTOS[idioma],
    tipo: tipo,
    /* base leva aos arquivos que moram na raiz do site: style.css,
       escudo.png, favicon.svg, logos/, script.js */
    base: base,
    home: relativo(meu, caminho(idioma, 'home')),
    depo: relativo(meu, caminho(idioma, 'depo')),
    servicoEm: outro => relativo(meu, caminho(idioma, 'servico', outro)),
    alternativas: Object.keys(IDIOMAS).map(outro => ({
      id: outro,
      cfg: IDIOMAS[outro],
      href: relativo(meu, equivalente(outro)),
      absoluto: SITE_URL + '/' + equivalente(outro).replace(/(^|\/)index\.html$/, '$1')
    })),
    absoluto: SITE_URL + '/' + meu.replace(/(^|\/)index\.html$/, '$1')
  };
}


/* ==========================================================================
   O BOTÃO DO CANAL SECUNDÁRIO
   --------------------------------------------------------------------------
   Em português leva ao WhatsApp; em inglês, ao telefone. Quem decide é o
   campo "canal" do idioma, no textos.js, e o porquê está explicado lá.

   As duas versões não são só rótulos diferentes: mudam o destino do link
   (wa.me contra tel:), o ícone e a cor da borda. A borda verde que pulsa é
   do WhatsApp, feita para lembrar a marca dele; num botão que liga para um
   telefone ela não quer dizer nada.
   ========================================================================== */
function botaoCanal(ctx, classes) {
  /* sem classe extra, nao sobra espaco duplo no atributo */
  const cls = classes ? 'botao ' + classes : 'botao';
  if (ctx.cfg.canal === 'whatsapp') {
    return '<a class="' + cls + ' botao--linha" href="#" data-whatsapp>' +
           ZAP + ' ' + esc(ctx.T.canal) + '</a>';
  }
  return '<a class="' + cls + ' botao--contorno" href="#" data-telefone>' +
         TEL + ' ' + esc(ctx.T.canal) +
         ' <span data-preencher="telefone">[ TELEFONE ]</span></a>';
}


/* ==========================================================================
   PEÇAS QUE APARECEM EM TODA PÁGINA
   ========================================================================== */
function marca(ctx, classe) {
  return `<a class="marca${classe ? ' ' + classe : ''}" href="${ctx.home}" aria-label="${esc(ctx.T.marcaInicio)}">
      ${ESCUDO(ctx.base)}
      <span class="marca__nome"><b>Providentia</b><i>Financial</i></span>
    </a>`;
}

/* --------------------------------------------------------------------------
   O BOTÃO DE TROCAR IDIOMA
   --------------------------------------------------------------------------
   Ele leva para a MESMA página no outro idioma, e não para a inicial de lá.
   Quem está lendo sobre proteção hipotecária em português e aperta EN quer
   continuar lendo sobre mortgage protection, e não voltar para o começo.

   O idioma que já está no ar aparece marcado e NÃO é link: apertar para ir
   onde já se está é botão que não faz nada.

   A BANDEIRA NUNCA VEM SOZINHA. Bandeira é país, não é idioma, e há muito
   país de língua portuguesa e muito país de língua inglesa. Por isso ao
   lado dela vai a sigla escrita, o link carrega hreflang, e o aria-label
   diz a frase inteira para quem usa leitor de tela.
   -------------------------------------------------------------------------- */
function trocaIdioma(ctx, classe) {
  const itens = Object.keys(IDIOMAS).map(id => {
    const a = ctx.alternativas.filter(x => x.id === id)[0];
    const bandeira = BANDEIRAS[a.cfg.bandeira];
    if (id === ctx.idioma) {
      return `      <li><span class="idioma__atual" aria-current="true">${bandeira}<b>${esc(a.cfg.sigla)}</b></span></li>`;
    }
    return `      <li><a class="idioma__link" href="${a.href}" hreflang="${a.cfg.codigo}" lang="${a.cfg.codigo}" aria-label="${esc(ctx.T.trocarPara)}">${bandeira}<b>${esc(a.cfg.sigla)}</b></a></li>`;
  }).join('\n');

  return `<nav class="idioma${classe ? ' ' + classe : ''}" aria-label="${esc(ctx.T.idioma)}">
      <ul>
${itens}
      </ul>
    </nav>`;
}

function submenu(ctx, atual) {
  return SERVICOS.map(s => {
    const d = conteudo(ctx.idioma, s);
    const aqui = d.slug === atual ? ' aria-current="page"' : '';
    return `            <li><a href="${ctx.servicoEm(s)}"${aqui}>${esc(d.nome)}</a></li>`;
  }).join('\n');
}

function cabecalho(ctx, atual) {
  const T = ctx.T;
  const dep = temDepoimentos(ctx.idioma);
  const edu = temEducacao(ctx.idioma);

  const itemDepo = dep ? `        <li><a href="${ctx.depo}">${esc(T.depoimentos)}</a></li>\n` : '';
  const itemEdu = edu ? `        <li><a href="${ctx.home}#educacao">${esc(T.educacao)}</a></li>\n` : '';
  const painelDepo = dep ? `      <li><a href="${ctx.depo}">${esc(T.depoimentos)}</a></li>\n` : '';
  const painelEdu = edu ? `      <li><a href="${ctx.home}#educacao">${esc(T.educacao)}</a></li>\n` : '';

  return `<header class="topo" id="topo">
  <div class="faixa topo__in">

    ${marca(ctx)}

    <nav class="nav" aria-label="${esc(T.navPrincipal)}">
      <ul>
        <li><a href="${ctx.home}">${esc(T.inicio)}</a></li>
        <!-- O item "Sobre" saiu do menu a pedido da Gabi. A SECAO continua na
             pagina, com a foto e a bio, e continua com id="sobre": o que saiu
             foi so o atalho no topo. Quem rola chega la de qualquer jeito, e o
             menu ficou com cinco itens em vez de seis, o que devolveu uns 60px
             para a barra respirar.
             Para trazer de volta, e descomentar aqui e no painel:
             <li><a href="${ctx.home}#sobre">${esc(T.sobre)}</a></li> -->
        <li class="tem-sub">
          <button class="sub-abre" type="button" aria-expanded="false" aria-controls="sub-servicos">
            ${esc(T.servicos)}
            <svg class="ico-seta" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <ul class="sub" id="sub-servicos">
${submenu(ctx, atual)}
            <li class="sub__todos"><a href="${ctx.home}#solucoes">${esc(T.verTodos)}</a></li>
          </ul>
        </li>
${itemDepo}${itemEdu}        <li><a href="${ctx.home}#contato">${esc(T.contato)}</a></li>
      </ul>
    </nav>

    ${trocaIdioma(ctx)}

    <a class="botao botao--marinho botao--topo" href="${ctx.home}#contato" data-agendar="${ctx.home}">${esc(T.agendar)}</a>

    <button class="sanduiche" type="button" aria-expanded="false" aria-controls="menu-movel" data-menu="${esc(T.menu)}" data-fechar="${esc(T.fechar)}">
      <span class="sanduiche__txt">${esc(T.menu)}</span>
      <svg class="ico-menu" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
    </button>

  </div>
</header>

<div class="painel" id="menu-movel" inert>
  <nav class="faixa painel__in" aria-label="${esc(T.navegacao)}">
    <ul class="painel__lista">
      <li><a href="${ctx.home}">${esc(T.inicio)}</a></li>
      <!-- "Sobre" saiu daqui junto com o menu do topo, para os dois nao
           divergirem. O motivo esta no cabecalho. -->
      <li><a href="${ctx.home}#solucoes">${esc(T.servicos)}</a></li>
${SERVICOS.map(s => `      <li class="painel__sub"><a href="${ctx.servicoEm(s)}">${esc(conteudo(ctx.idioma, s).nome)}</a></li>`).join('\n')}
${painelDepo}${painelEdu}      <li><a href="${ctx.home}#contato">${esc(T.contato)}</a></li>
    </ul>
    <div class="painel__pe">
      ${trocaIdioma(ctx, 'idioma--painel')}
      <a class="botao botao--marinho botao--cheio" href="${ctx.home}#contato" data-agendar="${ctx.home}">${esc(T.agendar)}</a>
      ${botaoCanal(ctx, 'botao--cheio')}
    </div>
  </nav>
</div>`;
}


function rodape(ctx) {
  const T = ctx.T;
  return `<footer class="rodape">
  <div class="faixa rodape__in">

    ${marca(ctx, 'marca--rodape')}

    <!-- ====================================================================
         O SELO DE CREDENCIAL
         --------------------------------------------------------------------
         [CONFIRMAR AS DUAS PALAVRAS, UMA A UMA]

         "Licensed" e a licenca de corretora. "Insured", no mercado
         americano, quer dizer que ela carrega E&O: Errors & Omissions,
         o seguro de responsabilidade profissional. Sao duas afirmacoes
         verificaveis, e nao slogan.

         A maioria dos agentes carrega E&O, e as IMOs costumam exigir. Mas
         se por algum motivo ela nao tiver a apolice ativa, a palavra
         "Insured" tem de sair. Confirme antes de publicar.

         Fica em ingles NOS DOIS IDIOMAS porque e termo do mercado dos
         Estados Unidos, e e assim que o publico dela ja viu em outros
         negocios americanos. A linha de baixo e que muda: em portugues ela
         traduz a expressao, em ingles ela diz o que a expressao cobre.
         ==================================================================== -->
    <p class="selo">
      <svg class="ico-mini" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
      <span>
        <b>${T.seloTitulo}</b>
        <i>${esc(T.seloTraducao)}</i>
      </span>
    </p>

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
        <!-- [CONFIRMAR ANTES DE PUBLICAR] A Monica informou que atende os
             Estados Unidos inteiros. Isso e comum entre agentes: da para ser
             licenciado em varios estados de uma vez. Mas "todos os EUA" e
             afirmacao verificavel, e um estado em que ela NAO esteja
             licenciada torna a frase falsa.

             Peca a lista dos estados em que ela tem licenca ativa. Se for
             mesmo todos, esta frase fica. Se faltar algum, troque por
             "Atendendo clientes em XX estados" e ponha a lista numa pagina
             ou no rodape. O texto mora no textos.js, em "atendimento", e
             muda nos dois idiomas de uma vez.

             A palavra "brasileiras" saiu daqui a pedido da Gabi: o site
             atende quem chegar. -->
        <span>${esc(T.atendimento)}</span>
      </li>
    </ul>

    <ul class="rodape__redes">
      <li><a href="#" data-facebook aria-label="${esc(T.redeFacebook)}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 8.6V7.1c0-.8.2-1.2 1.4-1.2h1.5V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.5H8.3V11h2.4v8h3v-8h2.5l.4-2.4H14z"/></svg></a></li>
      <li><a href="#" data-instagram aria-label="${esc(T.redeInstagram)}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="3.9" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.1" cy="6.9" r="1.3"/></svg></a></li>
      <li><a href="#" data-linkedin aria-label="${esc(T.redeLinkedin)}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.9 8.9H4.2V19h2.7zM5.5 4.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM19.8 19h-2.7v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19H11V8.9h2.6v1.4h.1a2.9 2.9 0 0 1 2.6-1.4c2.8 0 3.3 1.8 3.3 4.2z"/></svg></a></li>
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

         O QUE É NECESSÁRIO DE QUALQUER JEITO
         · o nome sob o qual ela é licenciada, escrito exatamente assim
         · os estados em que ela pode de fato atender
         · o disclosure que a companhia exigir

         Um "e mais" que costuma passar batido: se "Providentia Financial"
         for nome fantasia e não a razão social licenciada, muitos estados
         pedem que o nome legal apareça em algum lugar da página.

         AGORA SÃO DOIS IDIOMAS, e isso muda uma coisa: o que entrar aqui
         precisa entrar nos dois. Um disclosure que só existe em português
         não protege ninguém na página em inglês. É por isso que estes
         textos moram no textos.js, e não soltos no HTML.

         Quando tiver os textos, descomente e preencha lá, e a linha entra
         nas vinte páginas de uma vez:

         <p class="rodape__mini">Monica Silva, licenciada como NOME LEGAL.</p>
         <p class="rodape__mini">Atendendo os estados de XX, XX e XX.</p>
         <p class="rodape__mini">TEXTO EXATO DO DISCLOSURE DA COMPANHIA.</p>
         <p class="rodape__mini">Licença nº 000000 (Flórida).</p>
         ==================================================================== -->
    <!-- Este parágrafo é obrigatório a partir do momento em que o site cita
         nome de seguradora. Ele diz três coisas, e as três importam:
         que a Providentia é agência independente e não pertence a nenhuma
         delas, que a disponibilidade muda de estado para estado, e que as
         marcas são de terceiros. O texto veio da orientação de compliance
         que a Monica recebeu.

         Se a lista de seguradoras mudar, o nome citado aqui muda junto. -->
    <p class="rodape__mini">
      ${T.legalAgencia}
    </p>

    <p class="rodape__mini">
      ${esc(T.legalAviso)}
    </p>
    <p class="rodape__mini">&copy; <span data-ano>2026</span> ${esc(T.direitos)}</p>
  </div>
</footer>

${ctx.cfg.canal === 'whatsapp' ? `<a class="zap" href="#" data-whatsapp aria-label="${esc(T.canalFlutuante)}">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>
</a>` : `<!-- A bolha do canto, em inglês, liga em vez de abrir o WhatsApp. Marinho
     e não verde: verde aqui é a cor do WhatsApp, e este botão não é ele. -->
<a class="zap zap--tel" href="#" data-telefone aria-label="${esc(T.canalFlutuante)}">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
</a>`}`;
}


/* ==========================================================================
   O <head>
   ========================================================================== */
function cabeca(ctx, titulo, descricao) {
  /* hreflang diz ao Google que estas páginas são a mesma coisa em idiomas
     diferentes, e não conteúdo duplicado. Sem isso as duas versões brigam
     entre si na busca. O x-default é para quem não bate com nenhum idioma
     da lista, e aponta para o português, que é a raiz do site. */
  const alternativas = ctx.alternativas.map(a =>
    `<link rel="alternate" hreflang="${a.cfg.codigo}" href="${a.absoluto}">`).join('\n');
  const xDefault = ctx.alternativas
    .filter(a => a.id === 'pt')
    .map(a => `<link rel="alternate" hreflang="x-default" href="${a.absoluto}">`)
    .join('');

  const IMG = SITE_URL + '/familia.png';
  const IMG_ALT = ctx.idioma === 'pt'
    ? 'Uma família reunida na sala de casa: pai, mãe e duas crianças, sorrindo juntos.'
    : 'A family together in the living room: a father, a mother and two children, smiling.';

  return `<!DOCTYPE html>
<html lang="${ctx.cfg.codigo}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- ==========================================================================
     ARQUIVO GERADO POR  construir.js  A PARTIR DE  dados.js  E  textos.js
     NÃO EDITE ESTE ARQUIVO NA MÃO: ele é reescrito na próxima vez que
     alguém rodar  node construir.js  e as suas mudanças somem.
     Texto do serviço: dados.js. Menu e rodapé: textos.js. Estrutura da
     página: construir.js.
     ========================================================================== -->

<title>${esc(titulo)} | Providentia Financial</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${ctx.absoluto}">
${alternativas}
${xDefault}
<link rel="icon" href="${ctx.base}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${ctx.base}escudo.png">

<!-- ==========================================================================
     OPEN GRAPH E TWITTER
     --------------------------------------------------------------------------
     E o que aparece quando alguem cola o link no WhatsApp, no Facebook, no
     LinkedIn ou no iMessage. Sem isso, o preview sai so com o endereco.

     A imagem precisa de endereco ABSOLUTO. Caminho relativo funciona no
     site e falha no preview, porque quem monta o cartao e um servidor de
     fora que nao sabe de onde o caminho parte.

     [OTIMIZAR] familia.png tem 1,8 MB. Facebook e LinkedIn aguentam, mas o
     WhatsApp costuma desistir de imagem grande e mostrar o cartao sem foto.
     Exportar como JPEG qualidade 82 resolve, e e o mesmo arquivo que ja
     precisa encolher por causa do tempo de carregamento da pagina.
     ========================================================================== -->
<meta property="og:type" content="article">
<meta property="og:locale" content="${ctx.cfg.ogLocale}">
<meta property="og:site_name" content="Providentia Financial">
<meta property="og:url" content="${ctx.absoluto}">
<meta property="og:title" content="${esc(titulo)} | Providentia Financial">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:image" content="${IMG}">
<meta property="og:image:width" content="1693">
<meta property="og:image:height" content="929">
<meta property="og:image:alt" content="${esc(IMG_ALT)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)} | Providentia Financial">
<meta name="twitter:description" content="${esc(descricao)}">
<meta name="twitter:image" content="${IMG}">
<meta name="twitter:image:alt" content="${esc(IMG_ALT)}">
<!-- [REMOVER ANTES DE PUBLICAR DE VERDADE]
     Enquanto o site for rascunho para revisão, ele não pode aparecer no
     Google. Ainda tem dados por confirmar e nenhum bloco jurídico.
     Quando tudo estiver aprovado, apague estas duas linhas e o robots.txt. -->
<meta name="robots" content="noindex, nofollow">

<!-- ==========================================================================
     SEGURANCA
     --------------------------------------------------------------------------
     O GitHub Pages nao deixa configurar cabecalho HTTP. Destes dois, o
     navegador aceita a versao em <meta>, e e o que da para fazer aqui.

     A POLITICA DE CONTEUDO (CSP)
     Ela diz de onde a pagina pode carregar cada coisa. Tudo que nao esta na
     lista e bloqueado pelo navegador, mesmo que alguem consiga injetar
     codigo no HTML.

     script-src 'self' e a parte que importa: NAO tem 'unsafe-inline'. Este
     site nao tem nenhum <script> inline, nenhum onclick e nenhum
     href="javascript:", entao script injetado simplesmente nao roda.

     style-src tem 'unsafe-inline' por causa de sete atributos
     style="--alt-logo:46px" nos logos das seguradoras, que carregam a
     altura calculada de cada um. E uma excecao so para estilo: CSS inline
     nao executa codigo. A protecao que vale, a de script, continua estrita.

     O QUE NAO DA PARA FAZER AQUI
     frame-ancestors e X-Frame-Options, que impediriam o site de ser
     embutido num iframe de outra pessoa, so funcionam como cabecalho HTTP
     de verdade. Em <meta> o navegador ignora. Para ter esses dois seria
     preciso trocar o GitHub Pages por um servico que deixa configurar
     cabecalho, como Netlify ou Cloudflare Pages.

     POR QUE NAO TEM upgrade-insecure-requests
     Ela estava aqui e foi tirada. Essa diretiva converte http em https em
     TODA requisicao, inclusive http://localhost, e o servidor de
     desenvolvimento nao fala https: o preview local quebrava com
     ERR_SSL_PROTOCOL_ERROR e parecia erro de codigo.

     O que ela protegeria ja esta coberto: as origens listadas acima sao
     todas https por extenso, e o site em producao e https com redirecao
     obrigatoria.
     ========================================================================== -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://i.vimeocdn.com; frame-src https://player.vimeo.com https://www.youtube-nocookie.com; connect-src 'self' https://api.web3forms.com; form-action 'self'; base-uri 'self'; object-src 'none'">

<!-- Ao sair do site, manda so o dominio no Referer, e nunca o caminho
     completo da pagina. Em HTTP puro nao manda nada. -->
<meta name="referrer" content="strict-origin-when-cross-origin">

<meta name="theme-color" content="#0a2368">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&amp;family=Poppins:wght@300;400;500;600;700&amp;family=Allura&amp;display=swap" rel="stylesheet">

<link rel="stylesheet" href="${ctx.base}style.css${V_CSS}">
</head>
<body>

<a class="pular" href="#conteudo">${esc(ctx.T.pular)}</a>

`;
}


/* ==========================================================================
   BLOCOS DE VÍDEO
   --------------------------------------------------------------------------
   Todo vídeo do site só carrega depois do clique: antes disso o Vimeo não
   escreve cookie em quem apenas passou pela página, e a página abre mais
   leve. Enquanto ninguém clica, o que existe ali é uma imagem.

   Se o idioma ainda não tem link para aquele vídeo, estas funções devolvem
   string vazia e a seção inteira some daquela página. É o que segura as
   páginas em inglês hoje: os vídeos da Alliance que estão no ar são os
   dublados em português, e não servem lá.
   ========================================================================== */
function videoGrande(ctx, id, rotulo) {
  if (!id) { return ''; }
  return `
    <div class="video video--largo">
      <button class="video__capa" type="button" data-vimeo="${esc(id)}" aria-label="${esc(rotulo)}">
        <img src="${esc(CAPAS[id] || '')}" alt="" width="1280" height="720" loading="lazy" decoding="async">
        ${PLAY}
      </button>
    </div>
`;
}


/* ==========================================================================
   UMA PÁGINA DE SERVIÇO
   ========================================================================== */
function pagina(s, i, idioma) {
  const ctx = contexto(idioma, 'servico', s);
  const d = conteudo(idioma, s);
  const T = ctx.T;
  const antes = SERVICOS[i - 1];
  const depois = SERVICOS[i + 1];

  const lista = d.lista ? `
    <h2 class="servico__sub">${esc(d.lista.titulo)}</h2>
    <ul class="condicoes">
${d.lista.itens.map(par => `      <li>
        <h3>${esc(par[0])}</h3>
        <p>${esc(par[1])}</p>
      </li>`).join('\n')}
    </ul>
` : '';

  /* A linha miudinha com o termo em inglês só existe na página em
     português, onde ela é ponte para quem já ouviu falar assim. Na página
     em inglês o título já é esse termo, e repetir seria eco. */
  const termoEn = idioma === 'pt' ? `    <p class="servico__en">${esc(s.en)}</p>\n` : '';

  const vizinhos = (antes || depois) ? `
<nav class="vizinhos faixa" aria-label="${esc(T.outrosServicos)}">
  ${antes ? `<a class="vizinho vizinho--antes" href="${conteudo(idioma, antes).slug}.html">
    ${icone('arrow-left', 'ico-seta vizinho__seta')}
    <span class="vizinho__txt"><span>${esc(T.anterior)}</span><b>${esc(conteudo(idioma, antes).nome)}</b></span>
  </a>` : '<span></span>'}
  ${depois ? `<a class="vizinho vizinho--depois" href="${conteudo(idioma, depois).slug}.html">
    ${icone('arrow-right', 'ico-seta vizinho__seta')}
    <span class="vizinho__txt"><span>${esc(T.proximo)}</span><b>${esc(conteudo(idioma, depois).nome)}</b></span>
  </a>` : '<span></span>'}
</nav>
` : '';

  return cabeca(ctx, d.nome, d.resumo) + cabecalho(ctx, d.slug) + `

<main id="conteudo">

<article class="servico">
  <div class="faixa">

    <p class="migalha">
      <a href="${ctx.home}">${esc(T.inicio)}</a>
      <span aria-hidden="true">/</span>
      <a href="${ctx.home}#solucoes">${esc(T.servicos)}</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${esc(d.nome)}</span>
    </p>

${termoEn}    <h1>${esc(d.titulo)}</h1>
${videoGrande(ctx, d.video, T.assistirVideo + d.nome)}
    <div class="servico__texto">
${d.texto.map(p => `      <p>${esc(p)}</p>`).join('\n')}
    </div>
${lista}
    <div class="servico__acoes">
      <a class="botao botao--marinho" href="${ctx.home}#contato" data-agendar="${ctx.home}">${esc(T.agendar)}</a>
      ${botaoCanal(ctx)}
    </div>

    <p class="nota nota--esq">
      ${esc(T.notaServico)}
    </p>

  </div>
</article>
${vizinhos}
</main>

` + rodape(ctx) + `

<script src="${ctx.base}script.js${V_JS}"></script>
</body>
</html>
`;
}


/* ==========================================================================
   OS BLOCOS COSTURADOS NAS PÁGINAS DE MIOLO PRÓPRIO
   --------------------------------------------------------------------------
   O miolo da página inicial é escrito à mão, porque é redação. Mas três
   pedaços dela são dados repetidos, e por isso passam a ser gerados: o
   vídeo em destaque, a grade de educação e a grade de depoimentos.

   Antes a grade de educação era HTML à mão com as durações, os títulos e os
   endereços de capa copiados do dados.js. Duas cópias da mesma informação,
   e a segunda envelhece sem ninguém perceber.
   ========================================================================== */
function blocoDestaque(ctx) {
  const d = conteudo(ctx.idioma, DESTAQUE);
  if (!d.video) { return ''; }
  const T = ctx.T;
  const verTodos = temDepoimentos(ctx.idioma)
    ? `      <a class="botao botao--linha-clara" href="${ctx.depo}">${esc(T.depoimentos)}</a>\n` : '';

  return `
<section class="destaque" id="destaque">
  <div class="faixa destaque__in">

    <div class="destaque__txt">
      <p class="destaque__olho">${esc(d.subtitulo)}</p>
      <h2>${esc(d.titulo)}</h2>
      <p>${esc(d.texto)}</p>
${verTodos}    </div>
${videoGrande(ctx, d.video, T.assistirVideo + d.titulo)}
  </div>
</section>
`;
}

function blocoEducacao(ctx, lead) {
  const cards = SERVICOS.filter(s => video(ctx.idioma, s));
  const temas = (TEMAS[ctx.idioma] || []).filter(t => t.video);
  if (!cards.length && !temas.length) { return ''; }

  const itens = cards.map(s => {
    const d = conteudo(ctx.idioma, s);
    const info = VIDEO_INFO[d.video] || {};
    const dur = tempo(info.segundos);
    return `      <li class="video">
        <a href="${ctx.servicoEm(s)}">
          <span class="video__capa video__capa--link">
            <img src="${esc(CAPAS[d.video] || '')}" alt="" width="1280" height="720" loading="lazy" decoding="async">
            ${PLAY}
${dur ? `            <span class="video__tempo">${dur}</span>\n` : ''}          </span>
          <h3>${esc(info.titulo || d.nome)}</h3>
          <p>${esc(d.resumo)}</p>
        </a>
      </li>`;
  });

  /* ------------------------------------------------------------------
     OS CARTÕES DE TEMA
     O de serviço LEVA para a página do serviço, onde o vídeo dele vive.
     O de tema TOCA aqui mesmo, porque ele não tem outra página para onde
     ir: fala de uma ideia, e não de um produto.

     Por isso um é <a> e o outro é <button>. Não é detalhe de marcação:
     leitor de tela anuncia link e botão de formas diferentes, e a pessoa
     precisa saber se vai sair da página ou se o vídeo vai começar ali.
     ------------------------------------------------------------------ */
  const itensTema = temas.map(t => {
    const info = VIDEO_INFO[t.video] || {};
    const dur = tempo(info.segundos);
    return `      <li class="video">
        <button class="video__capa" type="button" data-vimeo="${esc(t.video)}" aria-label="${esc(ctx.T.assistirVideo + t.titulo)}">
          <img src="${esc(CAPAS[t.video] || '')}" alt="" width="1280" height="720" loading="lazy" decoding="async">
          ${PLAY}
${dur ? `          <span class="video__tempo">${dur}</span>\n` : ''}        </button>
        <h3>${esc(t.titulo)}</h3>
        <p>${esc(t.texto)}</p>
      </li>`;
  });

  const todos = itens.concat(itensTema).join('\n');

  return `
<section class="educacao" id="educacao">
  <div class="faixa">
    <h2>${esc(lead.titulo)}</h2>
    <p class="educacao__lead">
      ${esc(lead.texto)}
    </p>
    <!-- Cada card leva para a página do serviço, onde o vídeo toca. Assim o
         mesmo vídeo tem UM lugar só onde ele vive, e não duas cópias na
         mesma página disputando quem carrega primeiro. -->
    <ul class="videos videos--quatro" data-cartoes="${itens.length + itensTema.length}">
${todos}
    </ul>
  </div>
</section>
`;
}

function blocoDepoimentos(ctx) {
  const itens = DEPOIMENTOS.filter(x => video(ctx.idioma, x));
  if (!itens.length) { return ''; }

  const cards = itens.map(x => {
    const d = conteudo(ctx.idioma, x);
    const info = VIDEO_INFO[d.video] || {};
    const dur = tempo(info.segundos);
    return `      <li class="video">
        <button class="video__capa" type="button" data-vimeo="${esc(d.video)}" aria-label="${esc(ctx.T.assistirVideo + d.titulo)}">
          <img src="${esc(CAPAS[d.video] || '')}" alt="" width="1280" height="720" loading="lazy" decoding="async">
          ${PLAY}
${dur ? `          <span class="video__tempo">${dur}</span>\n` : ''}        </button>
        <h2>${esc(d.titulo)}</h2>
        <p>${esc(d.texto)}</p>
      </li>`;
  }).join('\n');

  /* data-cartoes deixa o CSS saber quantos são. Com um ou dois numa grade
     de três colunas, o buraco à direita faz a página parecer inacabada. */
  return `
    <ul class="videos videos--tres" data-cartoes="${itens.length}">
${cards}
    </ul>
`;
}


/* ==========================================================================
   COSTURA
   --------------------------------------------------------------------------
   Troca um trecho de um arquivo escrito à mão pelo trecho gerado. É assim
   que o cabeçalho e o rodapé chegam às páginas que têm miolo próprio.
   ========================================================================== */
function trocarEntre(texto, de, ate, novo, nome, arquivo) {
  const i = texto.indexOf(de);
  if (i < 0) { throw new Error(arquivo + ': nao achei o comeco de "' + nome + '"  (' + de + ')'); }
  const j = texto.indexOf(ate, i);
  if (j < 0) { throw new Error(arquivo + ': nao achei o fim de "' + nome + '"  (' + ate + ')'); }
  return texto.slice(0, i) + novo + texto.slice(j);
}

/* Troca o que está entre <!-- GERADO: x --> e <!-- FIM: x -->, mantendo os
   dois marcadores no lugar para a próxima rodada achar. */
function trocarMarcado(texto, nome, novo, arquivo) {
  const de = '<!-- GERADO: ' + nome + ' -->';
  const ate = '<!-- FIM: ' + nome + ' -->';
  if (texto.indexOf(de) < 0) { return texto; }   /* esta pagina nao tem esse bloco */
  return trocarEntre(texto, de, ate, de + '\n' + novo + '\n', nome, arquivo);
}

/* Exige o marcador: uma página de miolo próprio SEM ele ficaria para trás
   sem ninguém perceber, que é exatamente o defeito que este gerador existe
   para não deixar acontecer. */
function exigirMarcado(texto, nome, novo, arquivo) {
  if (texto.indexOf('<!-- GERADO: ' + nome + ' -->') < 0) {
    throw new Error(arquivo + ': falta o marcador <!-- GERADO: ' + nome + ' -->');
  }
  return trocarMarcado(texto, nome, novo, arquivo);
}

function costurar(arquivo, ctx, lead) {
  const alvo = path.join(raiz, arquivo);
  if (!fs.existsSync(alvo)) { return false; }
  let t = fs.readFileSync(alvo, 'utf8');

  /* Cabeçalho e rodapé usam marcador, e não busca pela tag. Já usaram busca:
     procuravam o texto <header class="topo" e trocavam até o <main>. Um
     comentário desta mesma página que CITAVA essa tag, explicando o que era
     costurado, virou o primeiro resultado da busca, e o gerador escreveu o
     cabeçalho inteiro dentro do comentário, levando junto o <head> da
     página. Com marcador isso não acontece: só é trocado o que está
     declarado como gerado. */
  t = exigirMarcado(t, 'cabecalho', cabecalho(ctx, ''), arquivo);
  t = exigirMarcado(t, 'rodape', rodape(ctx), arquivo);

  t = trocarMarcado(t, 'destaque', blocoDestaque(ctx), arquivo);
  if (lead) { t = trocarMarcado(t, 'educacao', blocoEducacao(ctx, lead), arquivo); }
  t = trocarMarcado(t, 'depoimentos', blocoDepoimentos(ctx), arquivo);

  /* O carimbo de versão do CSS e do JS. Estas quatro páginas têm o <head>
     escrito à mão, então o endereço é reescrito aqui: apaga o ?v= que
     estiver lá e põe o de agora. Sem isto elas seriam as únicas quatro do
     site a continuar servindo CSS velho, e duas delas são as iniciais. */
  const temCss = t.indexOf('style.css') >= 0;
  const temJs = t.indexOf('script.js') >= 0;
  t = t.replace(/(href=")([^"]*style\.css)(\?v=[0-9a-f]+)?(")/g, '$1$2' + V_CSS + '$4');
  t = t.replace(/(src=")([^"]*script\.js)(\?v=[0-9a-f]+)?(")/g, '$1$2' + V_JS + '$4');
  /* O aviso olha se o LINK existe, e nao se o texto mudou. A primeira
     versao comparava o antes com o depois: quando o carimbo ja estava
     certo, o texto ficava igual, e ela avisava que a pagina nao tinha
     folha de estilo nenhuma. Dizia isso das quatro paginas, todas as
     rodadas, e um aviso que sempre aparece deixa de ser lido. */
  if (!temCss) { console.log('  AVISO: ' + arquivo + ' sem link de style.css'); }
  if (!temJs) { console.log('  AVISO: ' + arquivo + ' sem link de script.js'); }

  fs.writeFileSync(alvo, t);
  return true;
}


/* ==========================================================================
   EXECUTA
   ========================================================================== */
/* --------------------------------------------------------------------------
   O TEXTO DE ABERTURA DA EDUCAÇÃO
   --------------------------------------------------------------------------
   O campo "afirma" existe porque este texto faz afirmações CONFERÍVEIS, e
   afirmação conferível em texto fixo envelhece calada.

   Aconteceu: a versão em inglês dizia "eight short videos, none of them
   longer than four minutes", copiada da versão em português. Aí entrou o
   vídeo de Living Benefits, com 6:37, e a frase virou mentira na mesma
   rodada em que o vídeo entrou. Ninguém percebeu porque nada quebra: a
   página monta bonito com a frase errada.

   Agora o gerador confere quantos vídeos existem e qual o mais longo, e
   avisa no fim se a conta não bate. Quem escrever um texto novo com número
   dentro põe o número aqui também, ou tira o "afirma" e escreve sem número.
   -------------------------------------------------------------------------- */
const LEAD_EDUCACAO = {
  pt: {
    titulo: 'Entenda antes de decidir',
    texto: 'Oito vídeos curtos, nenhum passa de quatro minutos. Nada aqui é venda: ' +
           'são as ideias que costumam aparecer na conversa, explicadas com calma ' +
           'para você poder pensar sem ninguém do lado esperando resposta.',
    afirma: { quantos: 8, maisLongoSegundos: 240 }
  },
  en: {
    /* Sem número nenhum, de propósito: ela ainda está mandando vídeos, e
       um texto que não conta nada não precisa ser reescrito a cada link
       que chega. As durações aparecem no canto de cada capa. */
    titulo: 'Understand before you decide',
    texto: 'Short videos, one idea at a time. Nothing here is a sales pitch: these ' +
           'are the ideas that usually come up in the conversation, explained ' +
           'calmly so you can think it through with nobody sitting beside you ' +
           'waiting for an answer.'
  }
};

/* Confere o que o texto de abertura afirma contra o que existe de verdade. */
function conferirLead(idioma) {
  const lead = LEAD_EDUCACAO[idioma];
  if (!lead || !lead.afirma) { return; }
  const ids = SERVICOS.filter(s => video(idioma, s)).map(s => conteudo(idioma, s).video)
    .concat((TEMAS[idioma] || []).filter(t => t.video).map(t => t.video));
  const quantos = ids.length;
  const maisLongo = ids.reduce((m, id) => Math.max(m, (VIDEO_INFO[id] || {}).segundos || 0), 0);

  if (quantos !== lead.afirma.quantos) {
    avisos.push('o texto da educacao em ' + idioma + ' diz ' + lead.afirma.quantos +
                ' videos, e agora sao ' + quantos);
  }
  if (maisLongo > lead.afirma.maisLongoSegundos) {
    avisos.push('o texto da educacao em ' + idioma + ' diz que nenhum passa de ' +
                tempo(lead.afirma.maisLongoSegundos) + ', e o mais longo tem ' +
                tempo(maisLongo));
  }
}

const avisos = [];
let contagem = 0;

Object.keys(IDIOMAS).forEach(idioma => {
  const c = IDIOMAS[idioma];
  const pasta = path.join(raiz, c.pasta, c.servicos);
  fs.mkdirSync(pasta, { recursive: true });

  const vistos = new Set();
  SERVICOS.forEach((s, i) => {
    const d = conteudo(idioma, s);
    if (!d) { throw new Error('o servico ' + s.slug + ' nao tem o bloco "' + idioma + '"'); }
    ['slug', 'nome', 'resumo', 'titulo', 'texto'].forEach(campo => {
      if (!d[campo]) { throw new Error(idioma + '/' + s.slug + ' sem "' + campo + '"'); }
    });
    if (vistos.has(d.slug)) { throw new Error('slug repetido em ' + idioma + ': ' + d.slug); }
    vistos.add(d.slug);
    if (!d.video) { avisos.push('falta o video de  ' + idioma + '/' + d.slug); }
    fs.writeFileSync(path.join(pasta, d.slug + '.html'), pagina(s, i, idioma));
    contagem++;
  });
  console.log('  ' + c.pasta + c.servicos + '/   ' + SERVICOS.length + ' paginas');

  const home = c.pasta + 'index.html';
  if (costurar(home, contexto(idioma, 'home'), LEAD_EDUCACAO[idioma])) {
    console.log('  ' + home + '   cabecalho, rodape, destaque e educacao');
  } else {
    avisos.push('nao encontrei ' + home);
  }

  /* A pagina de depoimentos e sempre costurada, mesmo sem video nenhum: ela
     precisa existir pronta para o dia em que os links chegarem. Sem video, a
     grade sai vazia, o item some do menu e nada aponta para la. */
  const dep = c.pasta + c.depo;
  if (costurar(dep, contexto(idioma, 'depo'))) {
    console.log('  ' + dep + '   cabecalho, rodape e a grade' +
      (temDepoimentos(idioma) ? '' : '   (grade vazia)'));
  } else {
    avisos.push('nao encontrei ' + dep);
  }
  if (!temDepoimentos(idioma)) {
    avisos.push('sem depoimentos em ' + idioma + ': a grade fica vazia e o item sai do menu');
  }
});

Object.keys(IDIOMAS).forEach(conferirLead);

if (!conteudo('en', DESTAQUE).video) { avisos.push('falta o video do destaque em ingles'); }

Object.keys(IDIOMAS).forEach(idioma => {
  const n = (TEMAS[idioma] || []).filter(t => t.video).length;
  if (n) { console.log('  ' + n + ' tema(s) de educacao em ' + idioma); }
});

console.log('\ngeradas ' + contagem + ' paginas de servico em ' +
            Object.keys(IDIOMAS).length + ' idiomas');

if (avisos.length) {
  console.log('\nO QUE AINDA FALTA');
  avisos.forEach(a => console.log('  · ' + a));
  console.log('\n  Os videos da Alliance que estao no ar sao os dublados em portugues,');
  console.log('  e por isso nao entram nas paginas em ingles. Cole os links em ingles');
  console.log('  no dados.js e rode este arquivo de novo: as secoes, a pagina de');
  console.log('  depoimentos e os itens de menu aparecem sozinhos.');
}

if (SERVICOS.some(s => s.alerta)) {
  console.log('\nATENCAO');
  SERVICOS.filter(s => s.alerta).forEach(s => console.log('  ' + s.slug + ': ' + s.alerta));
}
