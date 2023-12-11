import { Router } from "express";
import { CreateComprasController } from "../modules/cliente/useCases/createCompras/CreateComprasController.js";

const createComprasController = new CreateComprasController();

const comprasRoutes = Router();

comprasRoutes.post("/", createComprasController.handle);

export { comprasRoutes };