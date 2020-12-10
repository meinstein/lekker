# lekker

Yet another static site generator.

## Philosophy

Some static sites just need to be durable and easy to reason about. Rather than build another abstraction, lekker embraces the tried and true: HTML. Express your data via semantic HTML (albeit in fragments) and organize your hierarchy via the file system.

## Install

```
npm i lekker
```

## How To

To build your document tree, simply point lekker at the root document.

```
lekker build src/index.html
```

You can pass also pass an `outDir` option. Defaults to `dist`.

```
lekker build src/index.html --outDir=public
```

## Order of Operations

lekker operates by crawling your document tree and folding each fragments until it reaches the leaf document.

In doing so, lekker follows HTML best practices. For example, a folded document should not contain more than one of each of the following elements in it:

- `nav`
- `header`
- `main`
- `footer`

Therefore, lekker gives priority to last-in-time usage of the above elements. For all other elements, Lekker simply appends them to the DOM.

For example, when lekker encounters subsequent usage of `<meta>` tags, it will append them to the document's `<head>`.

The order of operations is as follows:

1. First, start with the `rootDoc` specified in `lekker.json`
2. Next, check each directory on the way to the document in question for more `index.html` documents
3. Finally, fold in the content from the actual document being compiled

Other elements, as for example:
