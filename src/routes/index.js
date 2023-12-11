import Router from "express";
import { clienteRoutes } from "./clienteRoute.js";
import { comprasRoutes } from "./comprasRoute.js";
import  {PessoaRouter} from  "./pessoaRoute.js";
import { vincularAmigo } from "./amigoRoute.js";
import { RedisRouter } from "./redisRoute.js";

const routes = Router();

routes.use("/cliente", clienteRoutes);
routes.use("/compras", comprasRoutes);
routes.use("/pessoa", PessoaRouter);
routes.use("/amigo", vincularAmigo);
routes.use("/redis", RedisRouter);

export { routes };