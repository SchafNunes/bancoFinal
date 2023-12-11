import { Router } from "express";
import { getComprasCliente } from "../controller/RedisController.js";

const RedisRouter = Router();

RedisRouter.get("/:idCliente", getComprasCliente);

export { RedisRouter };