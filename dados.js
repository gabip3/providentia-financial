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
  '520044841': 'https://i.vimeocdn.com/video/1076941238-cfe8e67248cdc38e62c8162ee0a8602671b5cc47861b18d76462d9a03771661d-d_1280?region=us'
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
  }
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

var SERVICOS = [

  {
    slug:  'beneficios-em-vida',
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
  texto: 'Os Benefícios em Vida existem há 20 anos, mas a maioria dos americanos ainda não sabe o que são ou o que significam. Eles permitem que o segurado tenha acesso ao valor do seguro de vida por causa de morte, para ter dinheiro em mãos quando mais precisa, caso sofra um ataque cardíaco, derrame, câncer ou outra doença qualificada. E a melhor parte é que esses benefícios não custam nada a mais.'
};

if (typeof module !== 'undefined') { module.exports = { SERVICOS: SERVICOS, DESTAQUE: DESTAQUE, CAPAS: CAPAS, VIDEO_INFO: VIDEO_INFO, SEGURADORAS: SEGURADORAS }; }
