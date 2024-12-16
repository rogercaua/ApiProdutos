import Produto from '../models/produto.js';

class ProdutoController {

  static async buscarProdutoPorId(req, res) {
    const { id } = req.params;
  
    try {
      const produto = await Produto.findById(id);
  
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res.status(200).json(produto);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar produto por ID', error: err });
    }
  }
   
  static async listarProdutos(req, res) {
    try {
      const produtoQuery = await Produto.find();
      res
        .status(200)
        .json(produtoQuery);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Erro ao listar produtos', error: err });
    }
  }

  static async procurarProduto(req, res) {
    const { nome, descricao } = req.query;

    try {
      const criteriosDeBusca = {};
      if (nome) criteriosDeBusca.nome = { $regex: nome, $options: 'i' };
      if (descricao)
        criteriosDeBusca.descricao = { $regex: descricao, $options: 'i' };

      const produtos = await Produto.find(criteriosDeBusca);
      if (produtos.length === 0) {
        return res
          .status(404)
          .json({ mensagem: 'Nenhum produto encontrado' });
      }
      res
        .status(200)
        .json(produtos);
    } catch (err) {
      res
        .status(500)
        .json({ mensagem: 'Erro ao procurar produto', error: err });
    }
  }

  static async criarProduto(req, res) {
    const { nome, descricao, quantidade, foto } = req.body;

    try {
      if (!nome || !descricao || !quantidade || !foto) {
        return res.status(400).json({ message: 'Os campos "nome","descricao","quantidade" são obrigatórios' });
      } 

      const novoProduto = new Produto({ nome, descricao, quantidade, foto });
      const produtoSalvo = await novoProduto.save();

      res
        .status(201)
        .json(produtoSalvo);
    } catch(err) {
      res
      .status(500)
      .json({ mensagem: 'Erro ao criar produto', error: err });
    }
  }

  static async atualizarProduto(req, res) {
    const { nome, descricao, quantidade, foto } = req.body;
    const { id } = req.params;

    try {
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        id,
        { nome, descricao, quantidade, foto },
        { new: true }
      );

      if (!produtoAtualizado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      res
        .status(200)
        .json(produtoAtualizado);
    } catch (err) {
      res
        .status(500)
       .json({ message:'Erro ao atualizar produto', error: err });
    }
  }

  static async deletarProduto(req, res) {
    const { id } = req.params; 

    try {
      const produtoDeletado = await Produto.findByIdAndDelete(id);

      if (!produtoDeletado) {
        return res
         .status(404)
         .json({ message: 'Produto não encontrado' });
      }

      res
        .status(200)
        .json({ message: 'Produto deletado com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar o produto', error: err });
    }
  }
}

export default ProdutoController;
