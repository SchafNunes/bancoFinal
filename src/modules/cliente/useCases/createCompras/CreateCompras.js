import { prismaClient } from "../../../../prisma/client.js";
import Pessoa from "../../../../models/Pessoa.js";
import AppError from "../../../../errors/AppError.js";

export class CreateCompras {
  async execute({ produto, valor, data, id_cliente }) {
    try {

      const cliente = await prismaClient.cliente.findUnique({
        where: { id: id_cliente }
      });

      if (!cliente) {
        throw new AppError("Cliente not exists");
      }
      // Verifica e cria/atualiza o cliente no MongoDB
      let clienteMongo = await Pessoa.findOne({ email: cliente.email });
      if (!clienteMongo) {
        clienteMongo = new Pessoa({ nome: cliente.nome, cpf: cliente.cpf, email: cliente.email, amigos: [] });
        await clienteMongo.save();
      }

      const compras = await prismaClient.compras.create({
        data: { produto, valor, data, id_cliente },
      });

      return compras;
    } catch (error) {
      // Aqui você pode tratar o erro ou lançar um AppError personalizado
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}



