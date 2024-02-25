import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { load } from 'cheerio';

import fetchData from './services/axios';

const app = express();

app.get('/search', async (request, response) => {
  try {
    const { key } = request.query;

    const content = await fetchData(`https://www.amazon.com.br/s?k=${key}`);
    const $ = load(content);

    let results = [];

    $('div.s-result-item').each((index, element) => {
      const title = $(element).find('h2').text();
      const image = $(element).find('img.s-image').attr('src');
      const stars = $(element).find('span.a-icon-alt').text();

      results.push({
        title,
        image,
        stars,
      });

    });

    const filteredResults = results.filter(element => element.title !== '');

    return response.json(filteredResults);
  } catch (error) {
      console.error('Error:', error);

      return response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(cors);

export { app };
