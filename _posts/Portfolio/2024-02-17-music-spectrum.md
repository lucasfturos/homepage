---
layout: blog/post
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

---
{:.post-line}

{: .post-text}
## Tela Inicial

{% for images in page.screenshot limit:1 %}
{% include blog/modal-image.html src=images.path %}
{% endfor %}

---
{:.post-line}

{: .post-text}
## Sobre

{: .post-text}
Visualizador de espectro de áudio. Aplicação da transformada de Fourier FFT em conjunto com a fórmula de Euler.  
Suporta áudios nos formatos WAV e FLAC.  
Desenvolvido em C++ com a biblioteca SFML.

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

---
{:.post-line}

{: .post-text}

## Screenshot

{% for images in page.screenshot %}
{% include blog/modal-image.html src=images.path %}
{% endfor %}

