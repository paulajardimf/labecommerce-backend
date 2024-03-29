# Labecommerce Back End
![Badge Finalizado](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=RED&style=for-the-badge)

## Índice

* [Introdução](#introdução)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Funcionabilidades do Projeto](#funcionabilidades-do-projeto)
* [Aplicações utilizadas](#aplicações-utilizadas)
* [Documentação](#documentação)
* [Rodando o projeto](#rodando-o-projeto)

## Introdução
    Projeto do back end de um e-commerce. 

## Tecnologias utilizadas

1. ``Node.js``
2. ``Typescript.js``
3. ``Knex``
4. ``Express``
5. ``SQLite``

## Funcionabilidades do Projeto

- [x] Cadastro de usuário:
- id;
- name;
- email;
- password;
- created_at.
<br>

- [x] Cadastro de produtos:
- id;
- name;
- price;
- description;
- image_url.
<br>

- [x] Cadastro de compras:
- id;
- buyer;
- total_price;
- created_at;
- paid.
<br>

- [x] Tabela de produtos por compras:
- purchase_id;
- product_id;
- quantity.
<br>
 
## Aplicações utilizadas
- Postman

## Documentação
https://documenter.getpostman.com/view/24460767/2s8ZDYX27M

## Rodando o projeto
- Rode o console na pasta em que você baixou os arquivos;

- Insira o comando ``npm install``;

- Depois, o comando ``npm run dev`` para rodar no navegador.
