import { GetCliente } from "./getCliente.js";

export class GetClienteController {
  async handle(request, response) {
    try {
      const { clienteId } = request.params; // Assumindo que o ID do cliente é passado na URL
      const getCliente = new GetCliente();
      const cliente = await getCliente.execute(clienteId);
      
      if (!cliente) {
        return response.status(404).json({ message: "Cliente não encontrado" });
      }

      return response.status(200).json(cliente);
    } catch (error) {
      return response.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
