import { prismaClient } from "../../../../prisma/client.js";
import AppError from "../../../../errors/AppError.js";

export class CreateCliente {
  async execute({ nome, email, cpf, endereco, cidade, uf }) {
    try {
      const clienteAlreadyExists = await prismaClient.cliente.findUnique({
        where: { email },
      });

      if (clienteAlreadyExists) {
        throw new AppError("Cliente already exists");
      }

      const cliente = await prismaClient.cliente.create({
        data: { nome, email, cpf, endereco, cidade, uf },
      });

      return cliente;
    } catch (error) {
      // Aqui você pode tratar o erro ou lançar um AppError personalizado
      throw new AppError(error.message, error.statusCode || 500);
    }
  }
}
