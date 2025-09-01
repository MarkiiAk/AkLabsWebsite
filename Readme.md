# AK Labs — Landing One-Page

Live: **https://ak-labs-website.vercel.app/**  
Preview OG: ![OG](https://ak-labs-website.vercel.app/assets/img/og-cover.jpg)

## Qué es
Landing estática, rápida y editable por JSON: textos, imágenes, colores y SEO básico.

## Stack
HTML + CSS vanilla · JS (un toque de jQuery) · Sin build

## Estructura
index.html
robots.txt
assets/
css/styles.css
img/
js/{bindings.js, app.js, reveal.js, backtop.js}
config/
textos.json
imagenes.json
colores.json
seo.json

## Editables (bindings)
- **Textos:** `data-text` / `data-html` → `config/textos.json`
  ```html
  <h1 data-html="hero.tituloHero">fallback</h1>
  <li data-html="hero.bullets.0">fallback</li>
Imágenes / fondos / enlaces: data-src / data-bg / data-href → config/imagenes.json
<img data-src="logo" alt="AK Labs">
<figure class="mock m1" data-bg="hero.mock1"></figure>
<a class="media" data-bg="catalogo.proy1"></a>
Colores (CSS vars): config/colores.json → se inyecta como --primary, --bg, etc.
SEO básico: config/seo.json (usa URLs absolutas para icon, og.image, jsonld.logo).

## Notas

Optimiza imágenes (ideal .webp / OG: 1200×630).

robots.txt ya incluido.

Este proyecto es propiedad de AK Labs. Todos los derechos reservados.

::contentReference[oaicite:0]{index=0}