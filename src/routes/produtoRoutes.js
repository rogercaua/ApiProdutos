import express from "express";
import ProdutoController from "../controller/produtoController.js";

const router = express.Router();

router
  .get('/api/produtos',ProdutoController.listarProdutos)
  .get('/api/produtos/procurar',ProdutoController.procurarProduto)
  .post('/api/produto',ProdutoController.criarProduto)
  .put('/api/produto/:id',ProdutoController.atualizarProduto)
  .delete('/api/produto/:id',ProdutoController.deletarProduto);

export default router;