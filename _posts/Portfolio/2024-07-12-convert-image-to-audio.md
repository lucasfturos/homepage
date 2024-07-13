---
layout: post
title: Convert Image to Audio
date: 12-7-2024 21:32
categorie: Portfolio
description: Converte imagens em áudio.
image: https://github.com/lucasfturos/ConvertImageToAudio/raw/main/assets/screenshot/resultHouse.png
screenshot: https://github.com/lucasfturos/ConvertImageToAudio/raw/main/assets/screenshot/resultHouse.png
---

<div class="post-line"></div>
<br />

{:.post-text}

## Sobre

<br />

{:.post-text}

<p>Converte imagens em áudio.</p>
<p>O programa só aceita como saída áudios no formato FLAC, OGG e WAV.</p>
{:.post-text}
<p>Desenvolvido em C++.</p>
{:.post-text}
<p>Para visualizar o espectro do áudio foi utilizado o software <a href="https://www.audacityteam.org/" target="_blank" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Audacity</a>.</p>
{:.post-text}

<div align="center">
    <a type="button" 
       class="btn btn-dark text-white"
       href="https://github.com/lucasfturos/ConvertImageToAudio" 
       target="_blank" 
    >
        <ion-icon name="logo-github"></ion-icon>
        Código fonte
    </a>
</div>

<br />
<div class="post-line"></div>
<br />

{:.post-text}


## Visualização da Saída do Programa

<br />
<div class="text-center">
  <img
    src="{{ page.image }}"
    class="rounded post-img modal-trigger"
    alt=""
  />
</div>

<br>
<div class="modal-img" id="modal-img">
  <span class="close"><ion-icon name="close-outline"></ion-icon></span>
  <img class="rounded post-img modal-content" id="img-content" />
  <div id="caption"></div>
</div>
