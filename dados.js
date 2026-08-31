/* ==========================================================================
   PROVIDENTIA FINANCIAL — dados.js
   --------------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA MEXER NOS SERVIÇOS.

   Ele não vai para o site. Ele é a fonte: o construir.js lê daqui e gera as
   oito páginas de serviço, todas com o mesmo cabeçalho e o mesmo rodapé.
   Sem isso, mexer no menu significaria editar oito arquivos na mão e torcer
   para não esquecer nenhum.

   DEPOIS DE EDITAR AQUI, RODE:      node construir.js

   Para trocar um vídeo, troque só o número do Vimeo em "video".
   Para tirar um serviço do ar, apague o bloco inteiro dele.
   ========================================================================== */

/* [CONFIRMAR] Todos os vídeos são do Vimeo da Alliance Group. A Monica
   informou que pode usá-los por ser afiliada. Guarde essa autorização por
   escrito: uso de material de marketing de terceiro sem registro é o tipo
   de coisa que só vira problema depois. */

/* ==========================================================================
   CAPAS DOS VÍDEOS
   --------------------------------------------------------------------------
   Endereço da imagem de capa de cada vídeo, direto do CDN do Vimeo. Eles
   foram buscados uma vez na API oEmbed e gravados aqui de propósito: assim
   o site não faz nenhuma chamada de API quando alguém abre a página.

   Se um vídeo for trocado, pegue a capa nova em
     https://vimeo.com/api/oembed.json?url=https://vimeo.com/NUMERO
   e copie o campo "thumbnail_url".

   A capa é imagem, e não o player: enquanto ninguém clicar, o Vimeo não
   carrega script nem escreve cookie.
   ========================================================================== */
var CAPAS = {
  '257941782': 'https://i.vimeocdn.com/video/685987616-3b6f0e02398228549c7ec1a457889d74fbf531207db9c2cb63d3e193449549f8-d_1280?region=us',
  '270160851': 'https://i.vimeocdn.com/video/701231944-30cac0aa52487ae618af5c7840fe061f82afebc16575da5ae41d0ea78c05be84-d_1280?region=us',
  '270162747': 'https://i.vimeocdn.com/video/701233818-96fcf4f3dd44f2cbc6eafde36c00dcf52987a6e879153168eed26634220f6b38-d_1280?region=us',
  '270183218': 'https://i.vimeocdn.com/video/701257637-71f3cd8899bcb889559497cf7ddc0af2c286c3bd845581f6f42f38bcd6e07ce0-d_1280?region=us',
  '270199244': 'https://i.vimeocdn.com/video/701276398-2e52f83f8f4e4fec5ba89a54b362a81d1d34f47f9286628425df387f50e6fda4-d_1280?region=us',
  '336429235': 'https://i.vimeocdn.com/video/784437285-64fb45e61442064bc0a15c6c63905b7d67d447bc72287e48c4c65f5442fd7a88-d_1280?region=us',
  '375733638': 'https://i.vimeocdn.com/video/834592931-b9abdc5c95909691d6b7edf3b635b3e57046cb8b4c5a8999800304be6c70e46c-d_1280?region=us',
  '377297016': 'https://i.vimeocdn.com/video/836685560-ec0760807b42d9f1785770e49e727922bee637eaaa74973ccc44e0f5d0134ec5-d_1280?region=us',
  '520044841': 'https://i.vimeocdn.com/video/1076941238-cfe8e67248cdc38e62c8162ee0a8602671b5cc47861b18d76462d9a03771661d-d_1280?region=us',
  '957368852': 'https://i.vimeocdn.com/video/1871251336-6306886955333fb83c53121b757f169fc632f7c0a0d3e291038bab5805a4a80a-d_1280?region=us',
  '572648707': 'https://i.vimeocdn.com/video/1184231154-ea6154248ce4e5c3dc4d235301cf3545b59922a254905a4ee6db156357ab9d8e-d_1280?region=us',

  /* Os cinco em inglês, informados pela Monica em 31/08/2026. A API do
     Vimeo devolveu estas capas em 640 de largura; aqui elas estão em 1280,
     que é o mesmo número trocado no fim do endereço, para não ficarem
     borradas num cartão largo. */
  '268020148': 'https://i.vimeocdn.com/video/702360332-fe0ba8c4266912f2988ae8de322db60c4fd1f7b264895a1af874961f4cc78ddb-d_1280?region=us',
  '268020112': 'https://i.vimeocdn.com/video/702340072-d04f526e62c7d4dcd0567b4f9620ea2de47622e7c7d5e5f98a68f5075e963ea0-d_1280?region=us',
  '268019992': 'https://i.vimeocdn.com/video/699918367-1c6cd9e814e7f0f4315acdd6ba361adf65481102736a1122d01fe1f29eea93c0-d_1280?region=us',
  '268019628': 'https://i.vimeocdn.com/video/702340405-8bc43e927b3206c1606fb146d416e5f9877c57e3cdc3495be731021d1b6bf4fd-d_1280?region=us',
  '268019587': 'https://i.vimeocdn.com/video/698665084-75aca23578971206ae424d80f1fcaa032d3ce57bfe9ebc0d897719d9cb6cb1ca-d_1280?region=us',

  /* Segunda leva, 31/08/2026. Estas voltaram da API em 295x166; o 1280 no
     fim do endereço pede a versão grande do mesmo arquivo. */
  '1218405681': 'https://i.vimeocdn.com/video/2193919181-bb3589bef0832d24db9842d38b5f3cbc3b33f91d35ea9c1827446bfe52593725-d_1280?region=us',
  '343000825':  'https://i.vimeocdn.com/video/792032627-e1f0f5432c9acbfb6b7e0fa85c9f74110a443702a6a59daa126eb96374284f15-d_1280?region=us',
  '379274858':  'https://i.vimeocdn.com/video/839280228-515bee4a5838d065d17ac77de8e6108eedad0cba4cc83379ed54b8f7e6483ea9-d_1280?region=us',
  '1167522359': 'https://i.vimeocdn.com/video/2125615680-fe76df4784ac1fd42be2b5a5d9bd9dbc8c0a359e69cf88d9cc5041ee59725565-d_1280?region=us',

  /* [CONFIRMAR O IDIOMA] Estes dois estão guardados aqui mas NÃO entram em
     página nenhuma ainda. A descrição dos dois no Vimeo está em português,
     e o título em inglês. Ver o comentário em DEPOIMENTOS. */
  '1208107879': 'https://i.vimeocdn.com/video/2177370676-920b2b327a3223b5bbee01ebe7cf0ede27db7e3137140af68056de89c45fafaf-d_1280?region=us',
  '1135370735': 'https://i.vimeocdn.com/video/2096123061-2f9368bb9ce687763cf93b197a9b571f18f42559728103114a0c84fbcc9f6aa6-d_1280?region=us',

  /* Terceira leva, 31/08/2026: os quatro que faltavam da série Animated
     Concepts. Com eles, sete dos oito serviços em inglês têm vídeo. */
  '331851782': 'https://i.vimeocdn.com/video/777378920-10f6c886f673ef3836d3080e5ac04cbc8d2851346eecb98fb997e1fdb6d7700e-d_1280?region=us',
  '268020199': 'https://i.vimeocdn.com/video/701881785-e342ab9bc074a57bc76dd0daea0af647302cea112671f47c6243b244b91c571d-d_1280?region=us',
  '268020035': 'https://i.vimeocdn.com/video/702361551-ac80028a3886e1385eb655c9f98b7c9779abac92ca0209007496996611541638-d_1280?region=us',
  '268019876': 'https://i.vimeocdn.com/video/699918642-a2a63c3480dec6417a6871026942ece9828dad0301c6c8519ba2e57ad5c06950-d_1280?region=us'
};

/* Títulos e duração como estão no Vimeo da Alliance. */
var VIDEO_INFO = {
  "257941782": {
    "titulo": "Anuidades indexadas fixas",
    "segundos": 179
  },
  "270160851": {
    "titulo": "Proteção hipotecária",
    "segundos": 159
  },
  "270162747": {
    "titulo": "Preservação de negócios",
    "segundos": 103
  },
  "270183218": {
    "titulo": "Planejamento universitário",
    "segundos": 99
  },
  "270199244": {
    "titulo": "O que é o seguro de vida universal indexado (IUL)?",
    "segundos": 216
  },
  "336429235": {
    "titulo": "IUL para crianças",
    "segundos": 141
  },
  "375733638": {
    "titulo": "Benefícios em Vida: os smartphones do seguro de vida",
    "segundos": 169
  },
  "377297016": {
    "titulo": "Planejamento sucessório",
    "segundos": 82
  },
  "520044841": {
    "titulo": "Pessoas reais. Histórias reais de Benefícios em Vida.",
    "segundos": 134
  },
  "957368852": {
    "titulo": "Uma história de Benefícios em Vida: Roseli de Paula",
    "segundos": 284
  },
  "572648707": {
    "titulo": "Latasha McCray: uma história de Benefícios em Vida",
    "segundos": 304
  },

  "268020148": { "titulo": "College Planning",          "segundos": 98 },
  "268020112": { "titulo": "Compound Interest",         "segundos": 92 },
  "268019992": { "titulo": "The Impact of Taxes",       "segundos": 103 },
  "268019628": { "titulo": "The Need to Invest Early",  "segundos": 158 },
  "268019587": { "titulo": "The Rule of 72",            "segundos": 134 },

  "1218405681": { "titulo": "Living Benefits: Life Insurance That Can Save Your Life", "segundos": 397 },
  "343000825":  { "titulo": "Estate Planning",            "segundos": 82 },
  "379274858":  { "titulo": "Living Benefits & Airbags",  "segundos": 60 },
  "1167522359": { "titulo": "Alexandra Nascimento",       "segundos": 329 },
  "1208107879": { "titulo": "Alexandre Carvalho",         "segundos": 248 },
  "1135370735": { "titulo": "Pastor Izaque",              "segundos": 294 },

  "331851782":  { "titulo": "IUL for Kids",                          "segundos": 140 },
  "268020199":  { "titulo": "Business Preservation",                 "segundos": 103 },
  "268020035":  { "titulo": "Fixed Indexed Annuities - Explained!",  "segundos": 164 },
  "268019876":  { "titulo": "What is Indexed Universal Life?",       "segundos": 214 }
};

/* ==========================================================================
   SEGURADORAS
   --------------------------------------------------------------------------
   Lista real, informada pela Monica. A versão anterior deste bloco era um
   exemplo tirado de uma orientação de compliance, e terminava em "etc.":
   tinha companhia com quem ela não trabalha. Foi substituída.

   Só pode ficar no ar companhia com nomeação ativa. Se alguma sair da
   carteira dela, apague o bloco aqui e rode o construir.js.

   [ANTES DE PÔR LOGO] O disclaimer no rodapé resolve a parte de dizer que
   as marcas são de terceiros. Ele NÃO substitui a autorização de uso da
   marca: a maioria das companhias exige aprovação do departamento de
   marketing delas para um agente usar o logo, e várias têm manual de marca
   com regra de tamanho, espaçamento e fundo. Peça a aprovação por escrito
   de cada uma, e o kit de marca junto.

   COMO TROCAR UM LOGO
   Ponha o arquivo novo em  logos/, escreva o nome dele no campo "logo" e
   recalcule a altura pela conta explicada logo abaixo. Depois rode
   node construir.js.

   Campo "logo" vazio faz o nome aparecer em tipografia, sem quebrar nada:
   e assim que a secao funcionava antes de as logos chegarem.
   ========================================================================== */
/* Lista informada pela Monica em 26/08/2026, na ordem em que ela mandou.
   A National Life Group vem primeiro por escolha dela: e a companhia
   pioneira em Beneficios em Vida, que e o assunto central do site.

   Saiu da versao anterior: Mutual of Omaha e Allianz. As duas estavam ali
   porque a orientacao de compliance citava exemplos e terminava em "etc.".
   Nao sao dela, e nao podiam ficar.

   NOME COMPLETO E SUBSIDIARIA DE CADA UMA, para o dia de pedir autorizacao
   de marca. O site mostra so o nome curto, que e como cada uma se apresenta
   hoje:
     National Life Group    NLG
     F&G                    antes Fidelity & Guaranty Life
     Corebridge Financial   antes AIG
     Foresters Financial
     American National      ANICO, com a subsidiaria Garden State Life
     Americo                com a subsidiaria Great Southern Life

   Cuidado com a sigla GSL: ela serve para Garden State Life E para Great
   Southern Life, que sao de grupos diferentes. Nunca escreva so "GSL". */
/* A ALTURA DE CADA LOGO NAO E A MESMA, E ISSO E DE PROPOSITO
   --------------------------------------------------------------------------
   As proporcoes vao de 1,15:1 (F&G, quase quadrada) a 3,51:1 (Ameritas).
   Com altura igual para todas, a F&G ficaria com um terco da area da
   Ameritas na tela e pareceria uma logo menor, quando so e mais estreita.

   Entao o que se iguala aqui e a AREA, e nao a altura: cada altura vem de
   sqrt(area / proporcao), com a area de referencia sendo a de uma logo 3:1
   com 46px. O resultado fica preso entre 38 e 62px, para nenhuma virar
   selo nem cartaz.

   Se trocar um arquivo, recalcule: altura = raiz(6440 / (largura/altura)).
   O comentario ao lado de cada linha guarda as medidas do arquivo. */
var SEGURADORAS = [
  { nome: 'National Life Group',     logo: 'NLG-logo.png',             altura: 45 },  /* 2026x648, 3.13:1 */
  { nome: 'F&G',                     logo: 'FG.png',                   altura: 62 },  /* 385x335, 1.15:1 */
  { nome: 'Corebridge Financial',    logo: 'corebridge.png',           altura: 46 },  /* 1601x522, 3.07:1 */
  { nome: 'Foresters Financial',     logo: 'forester.png',             altura: 60 },  /* 640x360, 1.78:1 */
  { nome: 'American National',       logo: 'american.png',             altura: 47 },  /* 403x140, 2.88:1 */
  { nome: 'Americo',                 logo: 'americo.png',              altura: 60 },  /* 640x360, 1.78:1 */
  { nome: 'Ameritas',                logo: 'Ameritas-Insurance.png',   altura: 43 },  /* 565x161, 3.51:1 */
];

/* ==========================================================================
   OS SERVIÇOS, NOS DOIS IDIOMAS
   --------------------------------------------------------------------------
   Cada serviço é UM bloco. Os campos de fora são o português; o bloco
   "ingles" dentro dele é a versão em inglês do MESMO serviço.

   Estar no mesmo bloco é de propósito: assim os dois idiomas não podem se
   separar. Se alguém apagar um serviço, ele some nos dois; se alguém trocar
   o vídeo, é no mesmo lugar. A alternativa seria um dados-en.js separado, e
   aí bastaria uma distração para o site ter oito serviços em português e
   sete em inglês.

   CUIDADO PARA NÃO CONFUNDIR DOIS CAMPOS COM NOME PARECIDO
     en:      "Living Benefits"
              É a linha miudinha em cima do título, na página em PORTUGUÊS.
              O termo de mercado em inglês, que serve de ponte para quem já
              ouviu falar assim. Na página em inglês ela não aparece: lá o
              título já é esse.
     ingles:  o bloco inteiro da versão em inglês.

   O VÍDEO
     video:          o vídeo da página em português
     ingles.video:   o vídeo da página em inglês

   Os vídeos da Alliance que estão aqui são TODOS em português: os títulos
   no Vimeo estão em português, e o áudio também. Por isso ingles.video está
   vazio em todos os oito. Enquanto estiver vazio, a página em inglês
   simplesmente não mostra vídeo, e o construir.js avisa no fim da rodada
   quais faltam. Quando os links chegarem, é colar um por linha e rodar de
   novo: nada mais precisa mudar.
   ========================================================================== */
var SERVICOS = [

  {
    slug:  'beneficios-em-vida',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'living-benefits',
      nome:   'Living Benefits',
      /* 6:37, e o mais longo do site. E a historia da Heather Seidel, com
         diagnostico de cancer em estagio 4, contada como explicacao do que
         sao os Beneficios em Vida. */
      video:  '1218405681',
      resumo: 'Coverage that protects you while you are still living.',
      titulo: 'There is life insurance you do not have to die to use.',
      texto: [
        'Some policies come with features called Living Benefits. If you are diagnosed with a serious condition, you can draw part of your own benefit while you are still living and use it however you need: treatment, the bills at home, the kids at school, whatever it takes.',
        'What is left over continues as a death benefit. Which conditions qualify, how much is released and who is eligible depend on the policy, on the carrier and on the approval of each case.'
      ],
      lista: {
        titulo: 'The four conditions that usually open the door',
        itens: [
          ['Terminal illness', 'When life expectancy drops to one or two years.'],
          ['Chronic illness', 'When you can no longer perform two of six basic daily activities, or there is severe cognitive loss.'],
          ['Critical illness', 'Cancer, heart attack and stroke are among the conditions usually on the list.'],
          ['Critical injury', 'Paralysis, coma, severe burns, serious brain injury.']
        ]
      }
    },
    nome:  'Benefícios em Vida',
    en:    'Living Benefits',
    video: '375733638',
    resumo: 'Cobertura que protege você ainda em vida.',
    titulo: 'Existe um seguro de vida que você não precisa morrer para utilizar.',
    texto: [
      'Algumas apólices trazem recursos chamados Benefícios em Vida. Se você for diagnosticado com uma condição séria, pode antecipar parte do próprio benefício ainda em vida e usar como precisar: tratamento, contas da casa, escola das crianças, o que for.',
      'O que sobra continua valendo como benefício por morte. Quais condições entram, quanto é liberado e quem se qualifica dependem da apólice, da companhia e dos critérios de aprovação de cada caso.'
    ],
    lista: {
      titulo: 'As quatro condições que costumam dar acesso',
      itens: [
        ['Doença terminal', 'Quando a expectativa de vida passa a ser de um a dois anos.'],
        ['Doença crônica', 'Quando você deixa de conseguir fazer duas de seis atividades básicas do dia, ou há perda cognitiva grave.'],
        ['Doença crítica', 'Câncer, infarto e derrame estão entre as condições que costumam estar na lista.'],
        ['Lesão crítica', 'Paralisia, coma, queimadura grave, lesão cerebral séria.']
      ]
    }
  },

  {
    /* [ATENÇÃO / COMPLIANCE] O nome "livre de impostos" foi escolha da
       Monica, e é o nome que a Alliance usa no material dela. O texto
       abaixo NÃO promete isenção: diz que o tratamento tributário depende
       do desenho da apólice e manda a pessoa falar com o contador.
       Não troque esse texto por promessa de imposto sem autorização
       escrita do compliance. Apólice mal desenhada vira MEC e perde o
       tratamento, e aí a promessa que ficou no site vira problema. */
    slug:  'aposentadoria-livre-de-impostos',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'tax-free-retirement',
      nome:   'Tax-free retirement',
      video:  '268019876',
      resumo: 'A way to build value over the years and reach it later.',
      titulo: 'Build it today so you can reach it later.',
      texto: [
        'A policy designed to build cash value over the years, with access to that value further down the road. It is a long term strategy: the earlier you start, the more time works in your favor.',
        'How that access is taxed depends on how the policy is designed and on your own situation. Your accountant is the one who answers that, and I work alongside them. This site does not give tax advice.'
      ]
    },
    nome:  'Aposentadoria livre de impostos',
    en:    'Tax-Free Retirement',
    video: '270199244',
    resumo: 'Uma forma de acumular valor ao longo dos anos e acessar depois.',
    titulo: 'Acumular hoje para ter acesso depois.',
    texto: [
      'Uma apólice desenhada para acumular valor ao longo dos anos, com acesso a esse valor mais adiante. É uma estratégia de longo prazo: quanto mais cedo começa, mais o tempo trabalha a favor.',
      'Como esse acesso é tributado depende do desenho da apólice e da sua situação. Quem responde por isso é o seu contador, e eu converso junto com ele. Este site não dá orientação fiscal.'
    ]
  },

  {
    slug:  'iul-para-criancas',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'iul-for-kids',
      nome:   'IUL for kids',
      video:  '331851782',
      resumo: 'Starting early locks in the age and the health of the child.',
      titulo: 'Time does the heavy lifting for whoever starts early.',
      texto: [
        'A policy opened in childhood locks in the age and the health of the child, and lets the years work in their favor. A small, steady contribution, kept up for a long time, goes a long way.',
        'It is usually meant for college, a down payment on a house or a first business. And it leaves the child with permanent coverage already secured into adulthood, whatever their health does later on.'
      ]
    },
    nome:  'IUL para crianças',
    en:    'IUL for Kids',
    video: '336429235',
    resumo: 'Começar cedo trava a idade e a saúde da criança.',
    titulo: 'O tempo é o maior aliado de quem começa cedo.',
    texto: [
      'Uma apólice aberta na infância trava a idade e a saúde da criança e deixa os anos trabalharem a favor. Uma contribuição pequena e constante, mantida por muito tempo, chega longe.',
      'Costuma ser pensada para faculdade, entrada de uma casa ou o primeiro negócio. E deixa a criança com cobertura permanente já garantida na vida adulta, independente do que a saúde dela fizer depois.'
    ]
  },

  {
    slug:  'protecao-hipotecaria',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'mortgage-protection',
      nome:   'Mortgage protection',
      video:  '',   /* [COLAR O LINK EM INGLES] o video em PT nao serve aqui */
      resumo: 'Helps keep your home and the future of your family.',
      titulo: 'The biggest debt and the biggest asset a family has are the same thing.',
      texto: [
        'If the main income of the household stops, the policy is designed so the mortgage keeps being paid. The idea is simple: nobody should lose the house right after losing someone.',
        'Many of these plans come with Living Benefits included, which means the money can also come in for a serious illness or injury, and not only for a death.'
      ]
    },
    nome:  'Proteção hipotecária',
    en:    'Mortgage Protection',
    video: '270160851',
    resumo: 'Ajuda a manter sua casa e o futuro da sua família.',
    titulo: 'A maior dívida e o maior bem da família são a mesma coisa.',
    texto: [
      'Se a renda principal da casa parar, a apólice é desenhada para que a hipoteca continue sendo paga. A ideia é simples: ninguém deveria perder a casa logo depois de perder alguém.',
      'Muitos desses planos vêm com Benefícios em Vida inclusos, o que significa que o dinheiro também pode entrar em caso de doença ou lesão séria, e não só em caso de morte.'
    ]
  },

  {
    slug:  'protecao-do-negocio',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'business-planning',
      nome:   'Business planning',
      video:  '268020199',
      resumo: 'Protect your business, your partners and your legacy.',
      titulo: 'A business runs on people. And people get sick.',
      texto: [
        'A partner leaving, a key person falling ill, a succession nobody ever agreed on. These are risks every business owner knows about and almost nobody organizes ahead of time.',
        'I help you structure the insurance side of it: key person coverage, buy and sell agreements between partners, continuity. The legal agreement itself is with an attorney and an accountant, and I work alongside them.'
      ]
    },
    nome:  'Proteção do seu negócio',
    en:    'Business Planning',
    video: '270162747',
    resumo: 'Proteja seu negócio, seus sócios e o seu legado.',
    titulo: 'O negócio depende de pessoas. E pessoas adoecem.',
    texto: [
      'Sócio que sai, pessoa-chave que adoece, sucessão que ninguém combinou. São riscos que todo dono de negócio conhece e quase ninguém organiza antes da hora.',
      'Eu ajudo a estruturar a parte de seguro disso: cobertura de pessoa-chave, acordo de compra e venda entre sócios, continuidade. O acordo jurídico em si é com advogado e contador, e eu trabalho junto com eles.'
    ]
  },

  {
    slug:  'anuidades',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'fixed-indexed-annuities',
      nome:   'Fixed indexed annuities',
      video:  '268020035',
      resumo: 'A guaranteed floor, with limited participation in the rise of an index.',
      titulo: 'A floor underneath, and a ceiling above.',
      texto: [
        'A fixed indexed annuity guarantees a minimum amount of interest and at the same time takes part, within limits, in the rise of a market index. You do not lose in the down years, and you also do not capture the whole climb.',
        'It has fees and it has a surrender period: taking money out before that period ends costs you. That goes on the table before anything else, and not afterwards.'
      ]
    },
    nome:  'Anuidades com índice fixo',
    en:    'Fixed Indexed Annuities',
    video: '257941782',
    resumo: 'Um piso garantido, com participação limitada na alta de um índice.',
    titulo: 'Um piso embaixo, e um teto em cima.',
    texto: [
      'A anuidade com índice fixo garante um mínimo de juros e ao mesmo tempo participa, de forma limitada, da alta de um índice de mercado. Você não perde nas quedas, e também não acompanha toda a subida.',
      'Tem taxas e tem prazo de resgate: tirar dinheiro antes do prazo custa. Isso entra na conversa antes de qualquer coisa, e não depois.'
    ],
    /* [CONFIRMAR] Anuidade costuma exigir licença ou nomeação separada da
       de seguro de vida. Confirme antes de deixar esta página no ar. */
    alerta: 'Confirmar licença para anuidades'
  },

  {
    /* O nome em inglês é "Estate Planning", que em português técnico seria
       planejamento sucessório. "Planejamento Imobiliário" é o termo que a
       própria Alliance usa na página em português dela, e é por isso que
       ele fica aqui: o site inteiro segue a terminologia oficial da
       Alliance, e divergir só neste item criaria duas linguagens para a
       mesma coisa. Como "imobiliário" pode sugerir imóveis, o subtítulo e
       o primeiro parágrafo deixam claro logo de cara que o assunto é
       sucessão e herança. */
    slug:  'planejamento-imobiliario',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'estate-planning',
      nome:   'Estate planning',
      video:  '343000825',
      resumo: 'Organizing today what stays for the people who come after.',
      titulo: 'Leaving things in order is an act of care.',
      texto: [
        'Estate planning is deciding, while you are here and with a clear head, what happens to what you built. Without it, the people who stay have to make hard decisions at the worst possible moment.',
        'Life insurance is usually the simplest piece of that plan, because it delivers money quickly and directly to the people you chose. The other pieces involve an attorney and an accountant, and I work alongside them.'
      ]
    },
    nome:  'Planejamento imobiliário',
    en:    'Estate Planning',
    video: '377297016',
    resumo: 'Organizar hoje o que fica para quem vem depois.',
    titulo: 'Deixar as coisas organizadas é um gesto de cuidado.',
    texto: [
      'Planejar a sucessão é decidir, em vida e com calma, o que acontece com o que você construiu. Sem isso, quem fica precisa tomar decisões difíceis no pior momento possível.',
      'O seguro de vida costuma ser a peça mais simples desse plano, porque entrega dinheiro rápido e direto a quem você escolheu. As demais peças envolvem advogado e contador, e eu trabalho junto com eles.'
    ]
  },

  {
    slug:  'planejamento-universitario',

    /* ---------- a versao em ingles deste mesmo servico ---------- */
    ingles: {
      slug:   'college-planning',
      nome:   'College planning',
      /* O original em ingles. O 270183218 do campo acima e a versao dublada
         em portugues do mesmo assunto. */
      video:  '268020148',
      resumo: 'Getting ready for the cost of higher education in the United States.',
      titulo: 'College gets here faster than it looks.',
      texto: [
        'The cost of higher education in the United States has been rising faster than inflation for decades. Whoever starts getting organized early has choices; whoever starts late has debt.',
        'There are different paths for this, each with its own rule about taxes and about how the money counts when you apply for financial aid. The conversation starts by understanding your situation, and not by picking a product.'
      ]
    },
    nome:  'Planejamento universitário',
    en:    'College Planning',
    video: '270183218',
    resumo: 'Preparar-se para o custo do ensino superior nos Estados Unidos.',
    titulo: 'A faculdade chega mais rápido do que parece.',
    texto: [
      'O custo do ensino superior nos Estados Unidos sobe mais rápido que a inflação há décadas. Quem começa a se organizar cedo tem escolhas; quem começa tarde tem dívida.',
      'Existem caminhos diferentes para isso, cada um com regra própria sobre imposto e sobre como o dinheiro conta na hora de pedir ajuda financeira. A conversa começa por entender o seu caso, e não por escolher um produto.'
    ]
  }

];

/* O vídeo em destaque da página inicial. Texto escrito pela Monica. */
var DESTAQUE = {
  video:    '520044841',
  titulo:   'Histórias de Benefícios em Vida',
  subtitulo:'Clientes reais. Histórias reais.',
  /* [CONFIRMAR] "não custam nada a mais" é afirmação forte e veio do
     material da Alliance. Em muitas apólices o recurso vem incluso sem
     prêmio adicional, mas isso depende da companhia e do produto.
     Confirme que vale para TODAS as apólices que a Monica oferece antes
     de publicar, ou troque por "costumam vir inclusos sem custo adicional". */
  texto: 'Os Benefícios em Vida existem há 20 anos, mas a maioria dos americanos ainda não sabe o que são ou o que significam. Eles permitem que o segurado tenha acesso ao valor do seguro de vida por causa de morte, para ter dinheiro em mãos quando mais precisa, caso sofra um ataque cardíaco, derrame, câncer ou outra doença qualificada. E a melhor parte é que esses benefícios não custam nada a mais.',

  /* A versão em inglês do mesmo bloco, para en/index.html.

     O vídeo está vazio porque o vídeo da Alliance que está no ar é o
     dublado em português, e não serve numa página em inglês. Enquanto
     estiver vazio, a seção inteira não é gerada lá, e o construir.js
     avisa no fim da rodada. */
  ingles: {
    video:     '',   /* [COLAR O LINK EM INGLES] */
    titulo:    'Living Benefit Stories',
    subtitulo: 'Real clients. Real stories.',
    texto:     'Living Benefits have been around for 20 years, but most Americans still do not know what they are or what they mean. They let the policyholder reach the value of their own life insurance, the money that would be paid on death, so they have cash in hand when they need it most, if they suffer a heart attack, a stroke, cancer or another qualifying illness. And the best part is that these benefits cost nothing extra.'
  }
};



/* ==========================================================================
   OS DEPOIMENTOS
   --------------------------------------------------------------------------
   Antes esta lista morava escrita à mão dentro do depoimentos.html, e por
   isso não tinha como existir em inglês: o texto de cada card estava preso
   no HTML de uma página só. Agora ela mora aqui, e o construir.js escreve a
   grade nos dois idiomas.

   [CONFIRMAR] Os três vídeos são material da Alliance Group, e os dois de
   baixo mostram pessoas identificadas pelo nome. Isso é diferente de imagem
   genérica: são histórias reais de pessoas reais, e o direito de uso vem da
   autorização de afiliada da Monica. Guarde essa autorização por escrito.

   O texto de cada card saiu da descrição do próprio vídeo no Vimeo, sem
   acrescentar nada. Não invente detalhe de diagnóstico, de valor pago nem
   de desfecho.

   Os campos em inglês estão vazios pelo mesmo motivo dos outros: os vídeos
   que existem são os dublados em português. Enquanto TODOS estiverem
   vazios, a página em inglês não é gerada e o item "Testimonials" não
   aparece no menu de lá. Uma página de depoimentos sem depoimento nenhum é
   pior que não ter a página.

   PARA ACRESCENTAR UM DEPOIMENTO
   Copie um bloco, troque o número do vídeo, o título e o texto, e pegue a
   capa em https://vimeo.com/api/oembed.json?url=https://vimeo.com/NUMERO
   no campo "thumbnail_url". A grade se reorganiza sozinha.
   ========================================================================== */
/* ==========================================================================
   [ESPERANDO] UM VÍDEO QUE AINDA NÃO ENTROU

     Alexandre Carvalho   https://vimeo.com/1208107879   4:08

   Mesma situação do Pastor Izaque: título em inglês, "A Living Benefits
   Story", e descrição no Vimeo em português, começando em "Como pai de uma
   criança de dois anos". Pelo idioma da descrição, o lugar dele é a página
   em PORTUGUÊS. A capa e a duração já estão guardadas em CAPAS e
   VIDEO_INFO: para pôr no ar, copie o bloco do Pastor Izaque e troque o
   número, o título e o texto.

   SOBRE OS DEPOIMENTOS EM GERAL, E ISSO VALE PARA TODOS ELES
   A descrição desses vídeos nomeia OUTROS AGENTES, e não a Monica. São
   clientes da Alliance, e não dela. Isso não impede o uso, mas depende da
   autorização de afiliada por escrito, e quem assistir vai ouvir o nome de
   outra pessoa, além de valores pagos e de afirmações sobre imposto que o
   site nunca faria por escrito. É assunto de compliance, e não de texto.
   ========================================================================== */
var DEPOIMENTOS = [

  {
    video:  '520044841',
    titulo: 'Pessoas reais, histórias reais',
    texto:  'O que são os Benefícios em Vida, contado por quem precisou usar.',
    ingles: {
      video:  '',   /* [COLAR O LINK EM INGLES] */
      titulo: 'Real people, real stories',
      texto:  'What Living Benefits are, told by the people who needed to use them.'
    }
  },

  {
    video:  '957368852',
    titulo: 'Roseli de Paula',
    texto:  'A jornada de uma brasileira, da chegada aos Estados Unidos até realizar o grande sonho, passando por desafios que ela não escolheu.',
    ingles: {
      video:  '',   /* [COLAR O LINK EM INGLES] */
      titulo: 'Roseli de Paula',
      /* Aqui "brasileira" fica, nos dois idiomas: não é o site dizendo a
         quem atende, é a história da própria Roseli. Tirar mudaria o que
         aconteceu com ela. */
      texto:  'The journey of a Brazilian woman, from arriving in the United States to reaching the big dream, through challenges she did not choose.'
    }
  },

  {
    /* SÓ EXISTE EM INGLÊS, e por isso o campo de cima está vazio: com ele
       vazio, este bloco não aparece na página em português. */
    video:  '',
    titulo: 'Alexandra Nascimento',
    texto:  '',
    ingles: {
      video:  '1167522359',
      titulo: 'Alexandra Nascimento',
      /* Tirado da descrição do próprio vídeo no Vimeo, sem acrescentar
         nada. Não invente diagnóstico, valor pago nem desfecho. */
      texto:  'She noticed a weakness in her left hand and did not think much of it. When it spread to her leg, she went looking for answers.'
    }
  },

  {
    /* Entrou no lugar da Latasha McCray, a pedido da Gabi.

       SÓ EM PORTUGUÊS: a descrição do vídeo no Vimeo está inteira em
       português, o que confirma o idioma do áudio. Era a dúvida que
       segurava este e o do Alexandre Carvalho.

       [O QUE FICOU DE FORA DESTE TEXTO, E POR QUÊ]
       A descrição no Vimeo traz três coisas que NÃO entram numa página de
       agente, e nenhuma delas está no texto abaixo:

         · o valor recebido, US$ 135.728. Número de pagamento vira
           promessa: o próximo leitor calcula o dele.
         · a expressão "livre de impostos". Tratamento tributário depende
           do caso, e o site inteiro evita afirmar isso.
         · o nome da agente que o atendeu, Ana Gusmão. Ele era cliente
           dela, e não da Monica.

       [ATENÇÃO] As três coisas continuam DENTRO DO VÍDEO, e quem assistir
       vai ouvir. Isso é assunto para o compliance da Alliance antes de
       publicar de verdade, e não é algo que o texto do cartão resolva. */
    video:  '1135370735',
    titulo: 'Pastor Izaque',
    texto:  'Pastor e líder querido da comunidade brasileira na Carolina do Sul. Ele contratou a cobertura com boa saúde, e meses depois um derrame paralisou todo o lado direito do corpo.',
    ingles: {
      video:  '',   /* o audio e em portugues; so entra aqui se houver versao legendada */
      titulo: 'Pastor Izaque',
      texto:  'A pastor and a beloved leader of the Brazilian community in South Carolina. He took out the coverage in good health, and months later a stroke left the whole right side of his body paralyzed.'
    }
  }

  /* ------------------------------------------------------------------
     A LATASHA McCRAY SAIU, A PEDIDO DA GABI.

     Ela era o terceiro cartão da página em português. O vídeo continua
     existindo no Vimeo, e a capa e a duração dele continuam guardadas em
     CAPAS e VIDEO_INFO: para trazer de volta, é descolar o bloco abaixo.

  {
    video:  '572648707',
    titulo: 'Latasha McCray',
    texto:  'Ela estava em ótima forma, com um bom emprego e um plano financeiro pronto para o futuro. O diagnóstico de câncer de mama virou tudo de cabeça para baixo.',
    ingles: {
      video:  '',
      titulo: 'Latasha McCray',
      texto:  'She was in great shape, with a good job and a financial plan ready for the future. A breast cancer diagnosis turned everything upside down.'
    }
  }

     ------------------------------------------------------------------ */

];



/* ==========================================================================
   OS TEMAS DO CENTRO DE EDUCAÇÃO
   --------------------------------------------------------------------------
   Vídeo curto que explica uma IDEIA, e não um produto. Ele não pertence a
   nenhum dos oito serviços, e por isso não cabe na lista de cima.

   Foi assim que os quatro primeiros chegaram: dos cinco vídeos em inglês que
   a Monica mandou, só "College Planning" correspondia a um serviço. Os
   outros quatro falam de juros compostos, de imposto, de começar cedo e da
   regra do 72. São assunto de quem está entendendo antes de decidir, que é
   exatamente o que a seção de educação existe para ser.

   COMO ELES APARECEM
   Na grade de educação, depois dos cartões dos serviços. A diferença é que
   o cartão de tema TOCA ali mesmo, e o de serviço leva para a página do
   serviço, onde o vídeo dele vive. Faz sentido: o vídeo de tema não tem
   outra página para onde ir.

   PARA ACRESCENTAR UM
   Copie um bloco, ponha o número do Vimeo, o título e uma linha de texto.
   Depois pegue a capa em
     https://vimeo.com/api/oembed.json?url=https://vimeo.com/NUMERO
   no campo "thumbnail_url", troque o 640 do fim por 1280, e ponha em CAPAS.
   A duração vai em VIDEO_INFO, em segundos. Depois rode node construir.js.

   [NÃO INVENTE NÚMERO] Os textos abaixo dizem do que o vídeo TRATA, e não
   quanto alguém ganha. Rendimento, porcentagem e prazo em página de agente
   viram promessa, e promessa é problema de compliance.
   ========================================================================== */
var TEMAS = {

  /* Em português ainda não há tema nenhum: os oito vídeos que existem são
     todos de serviço. Quando houver, é só preencher aqui. */
  pt: [],

  en: [
    {
      video:  '268019587',
      titulo: 'The Rule of 72',
      texto:  'A quick way to estimate how long money takes to double.'
    },
    {
      video:  '268020112',
      titulo: 'Compound Interest',
      texto:  'How money grows once the earnings start earning too.'
    },
    {
      video:  '268019628',
      titulo: 'The Need to Invest Early',
      texto:  'Why the same amount set aside sooner ends up somewhere different.'
    },
    {
      video:  '268019992',
      titulo: 'The Impact of Taxes',
      texto:  'What taxes do to savings over a long stretch of time.'
    },
    {
      /* Um minuto, o mais curto do site. A comparação é do próprio vídeo:
         ninguém compra um carro sem airbag, então por que carregar uma
         apólice sem os recursos que dão acesso antecipado. */
      video:  '379274858',
      titulo: 'Living Benefits & Airbags',
      texto:  'Why a policy without these features is like a car without airbags.'
    }
  ]

};

if (typeof module !== 'undefined') { module.exports = { SERVICOS: SERVICOS, DESTAQUE: DESTAQUE, CAPAS: CAPAS, VIDEO_INFO: VIDEO_INFO, SEGURADORAS: SEGURADORAS, DEPOIMENTOS: DEPOIMENTOS, TEMAS: TEMAS }; }
