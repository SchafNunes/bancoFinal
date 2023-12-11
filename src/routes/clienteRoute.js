import { Router } from "express";
import { CreateClienteController } from "../modules/cliente/useCases/createCliente/CreateClienteController.js";
import { GetClienteController } from "../modules/cliente/useCases/getCliente/GetClienteController.js";

const getClienteController = new GetClienteController();
const createClienteController = new CreateClienteController();


const clienteRoutes = Router();

clienteRoutes.post("/", createClienteController.handle);
clienteRoutes.get("/:clienteId", getClienteController.handle);


export { clienteRoutes };