const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/CadastroPodologo", (req, res) => {
  const { nome, ncc, consultorio, telefone, email } = req.body;

  const query = `INSERT INTO podologos (nome, ncc, consultorio, telefone, email) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nome, ncc, consultorio, telefone, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao cadastrar podologo!");
    }
    res.status(201).send("Cadastro realizado com sucesso");
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
