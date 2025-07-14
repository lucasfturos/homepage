---
layout: blog/post
title: Introdução ao Docker: Guia Rápido de Comandos
categorie: Artigo
description: Um guia rápido e prático com os principais comandos Docker e docker-compose para iniciantes. Ideal para quem está começando e quer entender como listar, executar, parar e gerenciar containers, imagens, volumes e redes no dia a dia.
date: 14-06-2025 15:30
image: "https://www.svgrepo.com/show/303231/docker-logo.svg"
---

<div class="post-line"></div>
<br />

{:.post-text}


Se você está começando no mundo dos containers, provavelmente já ouviu falar do Docker. Ele se tornou uma das ferramentas mais populares para criar ambientes isolados, padronizados e portáteis para aplicações — seja em desenvolvimento, testes ou produção.

Neste artigo, preparei um guia rápido e direto com os comandos mais usados no dia a dia de quem trabalha com Docker e docker-compose. A ideia é te dar uma referência prática para rodar, parar, limpar e gerenciar seus containers e imagens sem complicação.

Se você está dando os primeiros passos ou quer ter um "cola rápida" sempre à mão, esse conteúdo é pra você. Segue abaixo os mais comuns.

{:.post-text}

## Containers

{:.post-text}

| Ação                          | Comando                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| Listar containers ativos      | `docker ps`                                                             |
| Listar todos os containers    | `docker ps -a`                                                          |
| Iniciar container             | `docker start <nome ou ID>`                                            |
| Parar container               | `docker stop <nome ou ID>`                                             |
| Remover container             | `docker rm <nome ou ID>`                                               |
| Executar comando no container | `docker exec -it <nome ou ID> bash` ou `sh`                            |
| Ver logs do container         | `docker logs <nome ou ID>`                                             |

---

{:.post-text}

## Imagens

{:.post-text}

| Ação                          | Comando                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| Listar imagens locais         | `docker images`                                                        |
| Remover imagem                | `docker rmi <nome ou ID>`                                              |
| Criar imagem via Dockerfile   | `docker build -t nome_da_imagem .`                                     |
| Baixar imagem do Docker Hub   | `docker pull nome_da_imagem`                                           |
| Subir imagem para Docker Hub  | `docker push usuario/nome_da_imagem`                                   |

---

{:.post-text}

## Volumes e Redes

{:.post-text}

| Ação                          | Comando                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| Listar volumes                | `docker volume ls`                                                     |
| Remover volume                | `docker volume rm <nome>`                                              |
| Listar redes                  | `docker network ls`                                                    |

---

{:.post-text}

## Limpeza

{:.post-text}

| Ação                          | Comando                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| Remover containers parados    | `docker container prune`                                               |
| Remover imagens não usadas    | `docker image prune`                                                   |
| Remover tudo não usado        | `docker system prune`                                                  |

---

{:.post-text}

## docker-compose

{:.post-text}

| Ação                          | Comando                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| Subir os serviços             | `docker-compose up`                                                    |
| Subir e reconstruir           | `docker-compose up --build`                                            |
| Parar os serviços             | `docker-compose down`                                                  |
| Ver containers do compose     | `docker-compose ps`                                                    |
| Ver logs dos serviços         | `docker-compose logs -f`                                               |

