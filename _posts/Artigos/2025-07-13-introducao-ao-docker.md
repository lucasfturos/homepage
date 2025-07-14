---
layout: blog/post
title: "Introdução ao Docker: Guia Rápido de Comandos"
categorie: Artigo
description: Um guia rápido e prático com os principais comandos Docker e docker-compose para iniciantes. Ideal para quem está começando e quer entender como listar, executar, parar e gerenciar containers, imagens, volumes e redes no dia a dia.
date: 14-07-2025 15:30
image: "https://www.svgrepo.com/show/303231/docker-logo.svg"
---

<div class="post-line"></div>
<br />

<div class="post-text">
  <p>Se você está começando no mundo dos containers, provavelmente já ouviu falar do Docker. Ele se tornou uma das ferramentas mais populares para criar ambientes isolados, padronizados e portáteis para aplicações — seja em desenvolvimento, testes ou produção.</p>
  <p>Neste artigo, preparei um guia rápido e direto com os comandos mais usados no dia a dia de quem trabalha com Docker e docker-compose. A ideia é te dar uma referência prática para rodar, parar, limpar e gerenciar seus containers e imagens sem complicação.</p>
  <p>Se você está dando os primeiros passos ou quer ter um "cola rápida" sempre à mão, esse conteúdo é pra você. Segue abaixo os mais comuns.</p>
</div>

<h2 class="post-text">Containers</h2>

<table class="table post-text">
  <thead>
    <tr>
      <th>Ação</th>
      <th>Comando</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Listar containers ativos</td><td><code class="code-text">docker ps</code></td></tr>
    <tr><td>Listar todos os containers</td><td><code class="code-text">docker ps -a</code></td></tr>
    <tr><td>Iniciar container</td><td><code class="code-text">docker start &lt;nome ou ID&gt;</code></td></tr>
    <tr><td>Parar container</td><td><code class="code-text">docker stop &lt;nome ou ID&gt;</code></td></tr>
    <tr><td>Remover container</td><td><code class="code-text">docker rm &lt;nome ou ID&gt;</code></td></tr>
    <tr><td>Executar comando no container</td><td><code class="code-text">docker exec -it &lt;nome ou ID&gt; bash</code></td></tr>
    <tr><td>Ver logs do container</td><td><code class="code-text">docker logs &lt;nome ou ID&gt;</code></td></tr>
  </tbody>
</table>

<hr />

<h2 class="post-text">Imagens</h2>

<table class="table post-text">
  <thead>
    <tr>
      <th>Ação</th>
      <th>Comando</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Listar imagens locais</td><td><code class="code-text">docker images</code></td></tr>
    <tr><td>Remover imagem</td><td><code class="code-text">docker rmi &lt;nome ou ID&gt;</code></td></tr>
    <tr><td>Criar imagem via Dockerfile</td><td><code class="code-text">docker build -t nome_da_imagem .</code></td></tr>
    <tr><td>Baixar imagem do Docker Hub</td><td><code class="code-text">docker pull nome_da_imagem</code></td></tr>
    <tr><td>Subir imagem para Docker Hub</td><td><code class="code-text">docker push usuario/nome_da_imagem</code></td></tr>
  </tbody>
</table>

<hr />

<h2 class="post-text">Volumes e Redes</h2>

<table class="table post-text">
  <thead>
    <tr>
      <th>Ação</th>
      <th>Comando</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Listar volumes</td><td><code class="code-text">docker volume ls</code></td></tr>
    <tr><td>Remover volume</td><td><code class="code-text">docker volume rm &lt;nome&gt;</code></td></tr>
    <tr><td>Listar redes</td><td><code class="code-text">docker network ls</code></td></tr>
  </tbody>
</table>

<hr />

<h2 class="post-text">Limpeza</h2>

<table class="table post-text">
  <thead>
    <tr>
      <th>Ação</th>
      <th>Comando</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Remover containers parados</td><td><code class="code-text">docker container prune</code></td></tr>
    <tr><td>Remover imagens não usadas</td><td><code class="code-text">docker image prune</code></td></tr>
    <tr><td>Remover tudo não usado</td><td><code class="code-text">docker system prune</code></td></tr>
  </tbody>
</table>

<hr />

<h2 class="post-text">docker-compose</h2>

<table class="table post-text">
  <thead>
    <tr>
      <th>Ação</th>
      <th>Comando</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Subir os serviços</td><td><code class="code-text">docker-compose up</code></td></tr>
    <tr><td>Subir e reconstruir</td><td><code class="code-text">docker-compose up --build</code></td></tr>
    <tr><td>Parar os serviços</td><td><code class="code-text">docker-compose down</code></td></tr>
    <tr><td>Ver containers do compose</td><td><code class="code-text">docker-compose ps</code></td></tr>
    <tr><td>Ver logs dos serviços</td><td><code class="code-text">docker-compose logs -f</code></td></tr>
  </tbody>
</table>
