import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  quantidade: { type: Number, required: true },
  foto: { type: String, required: true },
}, {
    timestamps: true,
});
const produtos = mongoose.model('produtos', produtoSchema);

export default produtos;
