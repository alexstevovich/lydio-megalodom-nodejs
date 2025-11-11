# @lydio/megalodom

**Canonical URL:**  
[https://alexstevovich.com/a/lydio-megalodom-nodejs](https://alexstevovich.com/a/lydio-megalodom-nodejs)

**Software URL:**  
[https://midnightcitylights.com/software/lydio-megalodom-nodejs](https://midnightcitylights.com/software/lydio-megalodom-nodejs)

**A complete production grade DOM for [Lydio](https://alexstevovich.com/a/lydio-nodejs).**

Megalodom creates a complete production grade HTML DOM including doctype, `<html>`, `<head>`, and `<body>` with integrated meta tags, schema, and layout fragments.

---

## Installation

```sh
npm install @lydio/megalodom
```

## Example

```js
import LydioMegalodom from '@lydio/megalodom';

const doc = new LydioMegalodom();

doc.withTitle('Example Page');
doc.withDescription('A fully generated HTML document built with Lydio.');
doc.withCanonical('https://example.com');

// Add structured data schema
doc.withSchema({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Example Page',
    url: 'https://example.com',
});

// Add styles or scripts
doc.styles
    .addLeaf('link')
    .withAttribute('rel', 'stylesheet')
    .withAttribute('href', '/css/site.css');

doc.scripts.addLeaf('script').withAttribute('src', '/js/main.js');

// Add content
doc.main.addTag('h1').withText('Welcome to Example Page');
doc.body.postmain.addTag('footer').withText('© 2025 Example Site');

console.log(doc.toHtml());

/*output
<!DOCTYPE html>
<html lang="en-US">
<head>
<title>Example Page</title>
<link rel="canonical" href="https://example.com">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="description" content="A fully generated HTML document built with Lydio.">
<meta property="og:title" content="Example Page">
<meta property="og:url" content="https://example.com">
<script src="/js/main.js"></script>
<link rel="stylesheet" href="/css/site.css">
</head>
<body>
<main>
<h1>Welcome to Example Page</h1>
</main>
<footer>© 2025 Example Site</footer>
</body>
</html>
*/
```

## Features

- Generates a complete HTML document tree with doctype.
- Integrates @lydio/meta-tags and @lydio/schema automatically.
- Provides pre-structured <head> and <body> regions for predictable composition.
- Simple chainable API for titles, descriptions, and canonical links.
- Perfect for static site generation, server-side rendering, or content exports.

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Trademark

“Lydio” and related marks are trademarks of [Alex Stevovich](https://alexstevovich.com).

See [TRADEMARK.md](./TRADEMARK.md) for details.
