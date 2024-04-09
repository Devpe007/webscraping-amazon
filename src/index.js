import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { load } from 'cheerio';

import fetchData from './services/axios';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Requisição para buscar os produtos da primeira página de pesquisa da Amazon.
app.get('/search', async (request, response) => {
  try {
    // Pega o parametro como valor chave da pesquisa.
    const { key } = request.query;

    // Faz a requisição na página de pesquisa e carrega ela dentro do cheerio.
    const content = await fetchData(`https://www.amazon.com.br/s?k=${key}`);
    const $ = load(content);

    // A array que armazenará os produtos buscados na página;
    let results = [];

    // Aqui entramos dentro da pagina e selecionamos uma div pai, a partir dela selecionamos os elementos filhos.
    // Como o nome do produto (title).
    // A imagem do produto (image).
    // E a quantidade de estrelas (stars).
    $('div.s-result-item').each(async (index, element) => {
      const title = $(element).find('h2').text();
      const image = $(element).find('img.s-image').attr('src');
      const stars = $(element).find('span.a-icon-alt').text();
      const link = `https://www.amazon.com.br${$(element).find('a.a-link-normal').attr('href')}`;

      results.push({
        title,
        image,
        stars,
        link,
      });

    });

    // Um filtro para certificar que retornara apenas os objetos que realmente são os produtos.
    // Excluindo os objetos que vierem sem nome.
    const filteredResults = results.filter(element => element.title !== '');

    return response.json(filteredResults);
  } catch (error) {
    console.error('Error:', error);

    return response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(cors);

export { app };
