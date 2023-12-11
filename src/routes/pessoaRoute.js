import { Router } from "express";
import { createPessoa } from "../controller/PessoaController.js";

const PessoaRouter = Router();

PessoaRouter.post("/", createPessoa);

export { PessoaRouter };