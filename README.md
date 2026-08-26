# Providentia Financial

Site da Monica Silva, consultora de seguro de vida e planejamento financeiro
para familias brasileiras nos Estados Unidos.

**Este site ainda e um rascunho para revisao. Nao esta pronto para publicar.**
O que falta esta listado no fim deste arquivo.

## Como mexer

O site e HTML, CSS e JavaScript puros. Nao tem framework, nao tem dependencia,
nao precisa instalar nada para ver funcionando: da para abrir o `index.html`
direto no navegador.

### Para mudar texto de servico, ou trocar um video

Edite **`dados.js`**. E o unico arquivo que voce precisa abrir. Depois rode:

```
node construir.js
```

Isso reescreve as oito paginas dentro de `servicos/`. Nao edite esses
arquivos na mao: eles sao gerados, e as suas mudancas somem na proxima vez
que alguem rodar o comando.

O gerador existe porque sao oito paginas com o mesmo cabecalho e o mesmo
rodape. Sem ele, mudar um item do menu significaria abrir oito arquivos e
editar o mesmo trecho oito vezes.

### Para mudar o link da agenda

Todo botao "Agendar uma conversa" do site aponta para o Calendly da Monica.
O endereco fica no campo `calendly` do bloco `CONFIG`, no topo do
**`script.js`**. Um lugar so, e vale para as dez paginas.

Se o campo ficar vazio, os botoes voltam a levar para a secao de contato da
pagina inicial, com telefone e WhatsApp. Eles nao quebram.

### Para mudar telefone, e-mail ou redes sociais

Edite o bloco `CONFIG` no topo de **`script.js`**. Um lugar so; ele preenche
todos os links de todas as paginas.

### Para trocar um icone

Escolha em https://lucide.dev, copie o conteudo de dentro da tag `<svg>` e
cole em **`icones.js`** com um nome novo.

## Os arquivos

| arquivo | o que e |
|---|---|
| `index.html` | pagina inicial |
| `depoimentos.html` | pagina de depoimentos, feita para receber muitos videos |
| `servicos/*.html` | **gerados** pelo `construir.js`, um por servico |
| `dados.js` | o conteudo dos servicos. **Edite aqui.** |
| `construir.js` | gera as paginas de servico a partir do `dados.js` |
| `icones.js` | os icones, todos do Lucide (licenca ISC) |
| `style.css` | todo o visual, comentado por dentro |
| `script.js` | menu, submenu, videos e o painel que abre com a rolagem |

## O que ainda falta

Bloqueiam a publicacao:

- [ ] Nome legal sob o qual ela e licenciada, estados atendidos e o
      disclosure exigido pela companhia.

      ATENCAO: os marcadores visiveis foram removidos do rodape a pedido
      da Monica, entao esta pendencia NAO aparece mais na tela. Ela
      continua existindo. O lugar onde o texto entra esta comentado no
      construir.js, na funcao rodape(), com o modelo pronto.
- [ ] Decidir com o compliance se o numero da licenca entra. Ele e registro
      publico, nao e sigiloso, e alguns estados exigem em publicidade. Se a
      Florida exige em site, confirme antes: a linha ja esta pronta e
      comentada no rodape.
- [ ] Confirmar o telefone. O `(404) 955-7002` veio do mockup e e DDD de
      Atlanta, mas a Monica mora na Florida.
- [ ] Apontar o dominio para o GitHub Pages. Ele existe e esta na Wix, mas
      hoje o DNS aponta para a propria Wix. Os registros a trocar estao na
      secao "Ligar o dominio" mais abaixo.
- [ ] Criar a caixa de e-mail monica@providentiafinancialgroup.com. Dominio
      registrado nao cria caixa sozinho: precisa contratar o servico e
      apontar os registros MX. O endereco ja esta no site e passa a
      funcionar sozinho quando a caixa existir.

Convem resolver:

- [ ] Pegar a chave gratuita em https://web3forms.com e colar no campo
      `web3forms` do CONFIG, no script.js. Enquanto ela estiver vazia, a
      secao "Prefere escrever?" fica ESCONDIDA e o site nao tem formulario.
      O aviso sai so no console do navegador.

- [ ] Confirmar que ela carrega E&O (Errors & Omissions) ativo. O rodape
      das dez paginas diz "Licensed & Insured Agent", e no mercado
      americano "insured" quer dizer exatamente isso. Sem a apolice, a
      palavra sai.

- [ ] Autorizacao por escrito da Alliance Group para usar os videos.
- [ ] Biografia revisada por ela. O texto atual e um rascunho.
- [ ] Lockup horizontal da logo em SVG. Hoje o nome ao lado do escudo esta
      composto em tipografia.
- [ ] `familia.png` tem 1,8 MB e e a primeira imagem que a pagina carrega.
      Exportar como JPEG qualidade 82 ou WebP derruba para algo entre 150 e
      250 KB, sem diferenca visivel. E o item que mais pesa no site hoje.
- [ ] `hero.png`, `Monica.png`, `Monica01.jpeg` e `Monica02.jpeg` nao sao
      mais usados por nenhuma pagina. Ficaram no repositorio caso voce
      queira voltar atras. Somados dao cerca de 2,4 MB.

## Antes de publicar de verdade

Apague o `robots.txt` e as linhas `<meta name="robots" content="noindex">`
das paginas. Elas existem para o Google nao indexar um rascunho.


## Ligar o dominio

O site esta em https://gabip3.github.io/providentia-financial/ e o dominio
www.providentiafinancialgroup.com esta registrado na Wix, apontando para a
propria Wix.

A ordem importa. Trocar o dominio no GitHub ANTES de o DNS estar pronto
derruba o endereco atual, porque o github.io passa a redirecionar para um
dominio que ainda nao responde.

### 1. Na Wix, no editor de DNS do dominio

Troque o registro CNAME de "www":

    Tipo    Host    Valor
    CNAME   www     gabip3.github.io

Se quiser que providentiafinancialgroup.com sem o "www" tambem funcione,
troque os registros A do apex por estes quatro:

    Tipo    Host    Valor
    A       @       185.199.108.153
    A       @       185.199.109.153
    A       @       185.199.110.153
    A       @       185.199.111.153

ATENCAO: se houver um site da Wix publicado nesse dominio, ele sai do ar
nesse momento. Pelo estado atual do DNS parece ser dominio parado, mas
confirme antes.

### 2. Espere o DNS propagar

Costuma levar de alguns minutos a algumas horas. Para conferir:

    nslookup www.providentiafinancialgroup.com 8.8.8.8

Quando a resposta trouxer gabip3.github.io, esta pronto.

### 3. So entao, no GitHub

Settings > Pages > Custom domain, escreva
www.providentiafinancialgroup.com e salve. Marque "Enforce HTTPS" depois
que o certificado for emitido, o que leva mais alguns minutos.

Isso cria um arquivo CNAME na raiz do repositorio. Nao apague esse arquivo:
sem ele o dominio personalizado desliga.
