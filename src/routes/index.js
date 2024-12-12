import express from 'express';
import produtos from './produtoRoutes.js';

const routes = (app) => {
  app.use(
    express.json(),
    produtos
  )
}

export default routes;