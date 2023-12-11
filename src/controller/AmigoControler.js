import Pessoa from '../models/Pessoa.js';
import AppError from '../errors/AppError.js'; 
import { deleteCache } from '../utils/redisUtils.js';
import { prismaClient } from '../prisma/client.js';

class VincularAmigoController {
  async handle(req, res) {
    try {
      const { emailCliente, nomeAmigo, cpfAmigo, emailAmigo } = req.body;

      // Buscar cliente pelo e-mail
      const cliente = await Pessoa.findOne({ email: emailCliente });
      if (!cliente) {
        throw new AppError("Cliente não encontrado.", 404);
      }
      const codigoCliente = await prismaClient.cliente.findUnique({
        where: { email: emailCliente }
      });

      // Buscar amigo pelo e-mail
      let amigo = await Pessoa.findOne({ email: emailAmigo });
      if (!amigo) {
        // Criar um novo documento para o amigo, caso não exista
        amigo = new Pessoa({ nome: nomeAmigo, cpf: cpfAmigo, email: emailAmigo, amigos: [] });
        await amigo.save();
      }

      // Verificar se já são amigos
      if (cliente.amigos.includes(amigo._id)) {
        throw new AppError("Já são amigos.", 400);
      }

      // Adicionar o amigo à lista de amigos do cliente
      cliente.amigos.push(amigo._id);
      await cliente.save();

      // Remover o cache do cliente
      await deleteCache(`ComprasCliente${codigoCliente.id}`);


      res.status(200).json({ message: `Amigo vinculado com sucesso!`  });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

export default new VincularAmigoController();
