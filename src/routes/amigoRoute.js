import VincularAmigoController from "../controller/AmigoControler.js";
import { Router } from "express";

const vincularAmigo = Router();

vincularAmigo.post("/", VincularAmigoController.handle);

export { vincularAmigo };