
import { mongoose } from 'mongoose';

const PessoaSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa' }]
});

const Pessoa = mongoose.model('Pessoa', PessoaSchema);

export default Pessoa;
