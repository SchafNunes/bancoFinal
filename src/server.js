import express from "express";
import {routes} from "./routes/index.js";
import "express-async-errors";
import "./models/Pessoa.js"



const app = express();

app.use(express.json());

app.use(routes);

app.use((err, request, response, next) => {
  if(err instanceof appError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `internal server error ${err.message}`
  });
});

app.listen(3333, () => console.log("Server is running in port 3333 🚀"));