import express from 'express';
import produtos from './produtoRoutes.js';
import helmet from 'helmet';
import cors from 'cors';

const routes = (app) => {
  app.use(express.json())
  app.use(cors())
  app.use(helmet())
  app.use(produtos)
}

export default routes;