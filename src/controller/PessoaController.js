import Pessoa from "../models/Pessoa.js";

async function createPessoa(req, res) {
  try {
    const { nome, cpf, email, amigos } = req.body;
    const novaPessoa = new Pessoa({ nome, cpf, email, amigos });
    await novaPessoa.save();

    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { createPessoa };