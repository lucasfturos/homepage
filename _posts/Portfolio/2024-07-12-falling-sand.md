---
layout: blog/post
title: Falling Sand
date: 12-7-2024 21:10
categorie: Portfolio
description: Este projeto é uma simulação de areia caindo.
image: https://raw.githubusercontent.com/lucasfturos/FallingSand/refs/heads/main/screenshot/repo-thubmnail.png
screenshot:
  - path: https://raw.githubusercontent.com/lucasfturos/FallingSand/refs/heads/main/screenshot/menu.png
  - path: https://raw.githubusercontent.com/lucasfturos/FallingSand/refs/heads/main/screenshot/sand.png
  - path: https://raw.githubusercontent.com/lucasfturos/FallingSand/refs/heads/main/screenshot/sand_filterCRT.png
---

---
{:.post-line}

{: .post-text}
## Tela Inicial

{% include blog/modal-image.html src=page.image %}

---
{:.post-line}

{: .post-text}
## Sobre

{: .post-text}
Este projeto é uma simulação de areia caindo.  
Desenvolvido em C++ com a biblioteca SFML.

<div align="center">
    <a type="button" 
       class="btn btn-dark text-white"
       href="https://github.com/lucasfturos/FallingSand" 
       target="_blank" 
    >
        <ion-icon name="logo-github"></ion-icon>
        Código fonte
    </a>
</div>

---
{:.post-line}

{: .post-text}
## Screenshot

{% for images in page.screenshot %}
{% include blog/modal-image.html src=images.path %}
{% endfor %}
