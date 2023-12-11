// import { request, response } from "express";
import { CreateCliente } from "./CreateCliente.js";

export class CreateClienteController {
  async handle(request, response) {
    try {
      const { nome, email, cpf, endereco, cidade, uf } = request.body;
      const createCliente = new CreateCliente();
      const cliente = await createCliente.execute({ nome, email, cpf, endereco, cidade, uf });
      return response.status(201).send({
        type: "success",
        message: "Cliente criado com sucesso",
        data: cliente
    });
    } catch (error) {
      return response.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  
}