---
layout: post
title: Music Spectrum
date: 17-2-2024 11:36
categorie: Portfolio
description: Desenvolvido em C++ com a biblioteca SFML e OpenGL.
image: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/SineWaveFFT.png
screenshot:
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/WindowSoftware.png
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/SineWaveNoFFT.png
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/SineWaveFFT.png
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/SpectrumNoFFT.png
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/SpectrumFFT.png
  - path: https://raw.githubusercontent.com/lucasfturos/MusicSpectrum/main/assets/img/Screenshot/WaveFFT3D.gif
---

<div class="post-line"></div>
<br />

## Tela Inicial

<div class="text-center">
  <img
    src="{{ page.screenshot[0].path }}"
    class="rounded post-img modal-trigger"
    alt=""
  />
</div>
<br />
<div class="post-line"></div>
<br />

{:.post-text}

## Sobre

{:.post-text}
<p>Visualizador de espectro de audio. Aplicação da transformada de Fourier FFT em conjunto com a fórmula de Euler.</p>
<p>Suporta audios no formato WAV e FLAC.</p>
{:.post-text}
<p>Desenvolvido em C++ com a biblioteca SFML.</p>
{:.post-text}

<div align="center">
    <a type="button" 
       class="btn btn-dark text-white"
       href="https://github.com/lucasfturos/MusicSpectrum" 
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

## Screenshot

{% for images in page.screenshot %}

<div class="text-center">
  <img
    src="{{ images.path }}"
    class="rounded post-img modal-trigger" id="post-img"
  />
</div>
<br />

{% endfor %}

<br>
<div class="modal-img" id="modal-img">
  <span class="close"><ion-icon name="close-outline"></ion-icon></span>
  <img class="rounded post-img modal-content" id="img-content" />
  <div id="caption"></div>
</div>
