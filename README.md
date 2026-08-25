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
      disclosure exigido pela companhia. Aparecem marcados no site de
      proposito, para ninguem publicar sem ver.
- [ ] Decidir com o compliance se o numero da licenca entra. Ele e registro
      publico, nao e sigiloso, e alguns estados exigem em publicidade. Se a
      Florida exige em site, confirme antes: a linha ja esta pronta e
      comentada no rodape.
- [ ] Confirmar o telefone. O `(404) 955-7002` veio do mockup e e DDD de
      Atlanta, mas a Monica mora na Florida.
- [ ] Confirmar o e-mail.

Convem resolver:

- [ ] Autorizacao por escrito da Alliance Group para usar os videos.
- [ ] Biografia revisada por ela. O texto atual e um rascunho.
- [ ] Lockup horizontal da logo em SVG. Hoje o nome ao lado do escudo esta
      composto em tipografia.
- [ ] `hero.png` tem 1,6 MB. Exportar como JPEG qualidade 82 ou WebP derruba
      para algo entre 150 e 250 KB, sem diferenca visivel.

## Antes de publicar de verdade

Apague o `robots.txt` e as linhas `<meta name="robots" content="noindex">`
das paginas. Elas existem para o Google nao indexar um rascunho.
