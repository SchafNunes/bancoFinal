// import { request, response } from "express";
import { CreateCompras } from "./CreateCompras.js";

export class CreateComprasController {
  async handle(request, response) {
    try {
      const { produto, valor, data, id_cliente } = request.body;
      const createCompras = new CreateCompras();
      const compras = await createCompras.execute({ produto, valor, data: new Date(data), id_cliente });
      return response.status(201).send({
        type: "success",
        message: "Compra criado com sucesso",
        data: compras
    });
    } catch (error) {
      return response.status(error.statusCode || 500).json({ error: error.message });
    }
  }
  
}