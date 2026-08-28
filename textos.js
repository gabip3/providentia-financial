/* ==========================================================================
   PROVIDENTIA FINANCIAL — textos.js
   --------------------------------------------------------------------------
   AS PALAVRAS DA MOLDURA DO SITE, NOS DOIS IDIOMAS.

   Aqui mora tudo que aparece em TODA página: menu, botões, rodapé, bloco
   jurídico, rótulos do formulário. O texto de cada serviço fica no dados.js;
   o texto da página inicial fica dentro do index.html e do en/index.html,
   porque aquilo é redação corrida e não rótulo.

   POR QUE EXISTE
   Sem isto, "Agendar uma conversa" estaria escrito em vinte arquivos, e
   "Book a conversation" em mais vinte. Trocar uma palavra viraria caçada.
   Aqui é um lugar só, e o construir.js espalha.

   COMO ACRESCENTAR UM TERCEIRO IDIOMA
   Copie o bloco en inteiro, troque a sigla, traduza, e acrescente a sigla
   nova em IDIOMAS. O gerador passa a produzir a árvore dele sozinho.

   DEPOIS DE EDITAR AQUI, RODE:      node construir.js
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   ONDE CADA IDIOMA MORA
   --------------------------------------------------------------------------
   pasta      prefixo do endereço a partir da raiz do site. O português fica
              na raiz, e não em /pt/, porque o site já está no ar assim: todo
              link que a Monica já mandou para alguém aponta para lá. Mudar
              isso quebraria os links dela.
   servicos   nome da pasta das páginas de serviço nesse idioma
   depo       nome do arquivo da página de depoimentos
   -------------------------------------------------------------------------- */
var IDIOMAS = {

  pt: {
    codigo:   'pt-BR',          /* o que vai no <html lang> */
    ogLocale: 'pt_BR',
    pasta:    '',               /* raiz do site */
    servicos: 'servicos',
    depo:     'depoimentos.html',
    nome:     'Português',
    sigla:    'PT',
    bandeira: 'br',
    /* O canal secundário de contato deste idioma. Ver o comentário em
       "canal", logo abaixo do bloco en. */
    canal:    'whatsapp'
  },

  en: {
    codigo:   'en',
    ogLocale: 'en_US',
    pasta:    'en/',
    servicos: 'services',
    depo:     'testimonials.html',
    nome:     'English',
    sigla:    'EN',
    bandeira: 'us',
    canal:    'telefone'
  }

};

/* --------------------------------------------------------------------------
   O CANAL SECUNDÁRIO DE CONTATO
   --------------------------------------------------------------------------
   Toda página tem duas ações: agendar uma conversa, que é a principal, e um
   jeito de falar agora, que é a secundária. Qual é esse segundo jeito muda
   com o idioma, e não é detalhe de tradução.

   Em português é o WhatsApp. É onde o público dela já está, e o botão leva
   a marca dele: ícone, borda verde, mensagem já escrita.

   Em inglês é o telefone. Nos Estados Unidos o WhatsApp não é o canal
   padrão para falar com um negócio, e um botão verde de WhatsApp fala com
   quem já usa e passa em branco por quem não usa. No lugar entra ligar ou
   mandar mensagem, que é o que um americano espera. O mesmo número serve
   para os dois: nos Estados Unidos o telefone recebe SMS.

   Isso vale em TODA a versão em inglês, e não só no topo: páginas de
   serviço, menu do celular, faixa de contato do fim e a bolha do canto.

   O construir.js lê este campo e monta o botão certo. Para trocar de
   canal, é mudar aqui e rodar o gerador.
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   AS PALAVRAS
   -------------------------------------------------------------------------- */
var TEXTOS = {

  pt: {
    /* navegação */
    pular:        'Ir para o conteúdo',
    navPrincipal: 'Navegação principal',
    navegacao:    'Navegação',
    inicio:       'Início',
    sobre:        'Sobre',
    servicos:     'Serviços',
    depoimentos:  'Depoimentos',
    educacao:     'Educação',
    contato:      'Contato',
    verTodos:     'Ver todos os serviços',
    menu:         'Menu',
    fechar:       'Fechar',
    marcaInicio:  'Providentia Financial, início',

    /* botões */
    agendar:      'Agendar uma conversa',
    /* O rótulo do canal secundário. Em português ele nomeia o WhatsApp; em
       inglês, ligar ou mandar mensagem. Ver o comentário sobre "canal". */
    canal:        'Falar no WhatsApp',
    canalFlutuante: 'Falar comigo no WhatsApp',

    /* troca de idioma */
    idioma:       'Idioma',
    trocarPara:   'Ver este site em inglês',

    /* páginas de serviço */
    anterior:       'Anterior',
    proximo:        'Próximo',
    outrosServicos: 'Outros serviços',
    assistirVideo:  'Assistir ao vídeo sobre ',
    notaServico:
      'Nem todos os produtos estão disponíveis em todos os estados, e o que ' +
      'serve para você depende da sua idade, da sua saúde, de onde você mora ' +
      'e da aprovação da companhia. Esta página é informativa e não é ' +
      'aconselhamento fiscal, jurídico ou de investimento.',

    /* rodapé */
    seloTitulo:    'Licensed &amp; Insured Agent',
    seloTraducao:  'Agente licenciada, com seguro de responsabilidade profissional.',
    atendimento:   'Atendendo famílias em todos os Estados Unidos',
    redeFacebook:  'Facebook da Providentia Financial',
    redeInstagram: 'Instagram da Providentia Financial',
    redeLinkedin:  'Meu perfil no LinkedIn',
    legalAgencia:
      'A Providentia Financial é uma agência independente. A disponibilidade de ' +
      'produtos e seguradoras varia por estado. National Life Group&reg; e demais ' +
      'marcas citadas pertencem aos seus respectivos proprietários.',
    legalAviso:
      'Este site tem finalidade informativa e não constitui aconselhamento ' +
      'fiscal, jurídico ou de investimento. Garantias dependem da capacidade ' +
      'de pagamento da companhia emissora. Nem todos os produtos estão ' +
      'disponíveis em todos os estados. Não envie dados financeiros por ' +
      'este site.',
    direitos:      'Providentia Financial.'
  },

  en: {
    pular:        'Skip to content',
    navPrincipal: 'Main navigation',
    navegacao:    'Navigation',
    inicio:       'Home',
    sobre:        'About',
    servicos:     'Services',
    depoimentos:  'Testimonials',
    educacao:     'Education',
    contato:      'Contact',
    verTodos:     'See all services',
    menu:         'Menu',
    fechar:       'Close',
    marcaInicio:  'Providentia Financial, home',

    agendar:      'Book a conversation',
    canal:        'Call or text',
    canalFlutuante: 'Call or text me',

    idioma:       'Language',
    trocarPara:   'View this site in Portuguese',

    anterior:       'Previous',
    proximo:        'Next',
    outrosServicos: 'Other services',
    assistirVideo:  'Watch the video about ',
    notaServico:
      'Not all products are available in all states, and what works for you ' +
      'depends on your age, your health, where you live and the approval of ' +
      'the carrier. This page is informational and is not tax, legal or ' +
      'investment advice.',

    /* O selo fica igual nos dois idiomas: é termo do mercado americano, e
       já estava em inglês na versão em português. A linha de baixo, que lá
       traduzia a expressão, aqui explica o que ela cobre. */
    seloTitulo:    'Licensed &amp; Insured Agent',
    seloTraducao:  'Licensed agent, carrying professional liability coverage.',
    atendimento:   'Serving families across the United States',
    redeFacebook:  'Providentia Financial on Facebook',
    redeInstagram: 'Providentia Financial on Instagram',
    redeLinkedin:  'My LinkedIn profile',
    legalAgencia:
      'Providentia Financial is an independent agency. Product and carrier ' +
      'availability varies by state. National Life Group&reg; and other marks ' +
      'mentioned belong to their respective owners.',
    legalAviso:
      'This site is for informational purposes and does not constitute tax, ' +
      'legal or investment advice. Guarantees depend on the claims paying ' +
      'ability of the issuing carrier. Not all products are available in all ' +
      'states. Do not send financial information through this site.',
    direitos:      'Providentia Financial.'
  }

};

/* --------------------------------------------------------------------------
   AS BANDEIRINHAS
   --------------------------------------------------------------------------
   Desenhadas em SVG, e não com emoji, por um motivo prático: o Windows não
   desenha emoji de bandeira. No Chrome do Windows, que é onde boa parte do
   público dela está, o emoji da bandeira do Brasil aparece como as duas
   letras "BR" numa caixinha. Em SVG a bandeira é a mesma em toda máquina.

   São simplificadas de propósito. A 22px de largura, a esfera com as 27
   estrelas e a faixa "Ordem e Progresso" viram borrão; o que identifica a
   bandeira nesse tamanho é o verde, o losango e o círculo azul. Mesma coisa
   do lado americano: 13 listras a 15px de altura empastam, então são cinco
   listras brancas e um cantão com pontos.

   BANDEIRA NÃO É IDIOMA, e por isso ela nunca vem sozinha: ao lado dela
   sempre aparece PT ou EN escrito, e o link carrega hreflang mais um
   aria-label por extenso. Quem usa leitor de tela ouve "Ver este site em
   inglês", e não "imagem".
   -------------------------------------------------------------------------- */
var BANDEIRAS = {

  br: '<svg class="bandeira" viewBox="0 0 24 17" aria-hidden="true" focusable="false">' +
      '<rect width="24" height="17" rx="2" fill="#009b3a"/>' +
      '<path d="M12 2.2 22.1 8.5 12 14.8 1.9 8.5z" fill="#fedf00"/>' +
      '<circle cx="12" cy="8.5" r="3.7" fill="#002776"/>' +
      '<path d="M8.4 7.1a10.5 10.5 0 0 1 7.2 1.6 3.7 3.7 0 0 1-.2 1.1 9.2 9.2 0 0 0-6.6-1.5z" fill="#fff"/>' +
      '</svg>',

  us: '<svg class="bandeira" viewBox="0 0 24 17" aria-hidden="true" focusable="false">' +
      '<rect width="24" height="17" rx="2" fill="#b22234"/>' +
      '<g fill="#fff">' +
      '<rect y="2.4" width="24" height="1.3"/>' +
      '<rect y="5.1" width="24" height="1.3"/>' +
      '<rect y="7.7" width="24" height="1.3"/>' +
      '<rect y="10.4" width="24" height="1.3"/>' +
      '<rect y="13" width="24" height="1.3"/>' +
      '</g>' +
      '<path d="M0 2a2 2 0 0 1 2-2h8.2v9h-10.2z" fill="#3c3b6e"/>' +
      '<g fill="#fff">' +
      '<circle cx="2.3" cy="1.9" r=".5"/><circle cx="5.1" cy="1.9" r=".5"/><circle cx="7.9" cy="1.9" r=".5"/>' +
      '<circle cx="3.7" cy="3.6" r=".5"/><circle cx="6.5" cy="3.6" r=".5"/>' +
      '<circle cx="2.3" cy="5.3" r=".5"/><circle cx="5.1" cy="5.3" r=".5"/><circle cx="7.9" cy="5.3" r=".5"/>' +
      '<circle cx="3.7" cy="7" r=".5"/><circle cx="6.5" cy="7" r=".5"/>' +
      '</g>' +
      '</svg>'

};

if (typeof module !== 'undefined') {
  module.exports = { IDIOMAS: IDIOMAS, TEXTOS: TEXTOS, BANDEIRAS: BANDEIRAS };
}
