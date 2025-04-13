const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para cadastrar podólogo
app.post("/CadastroPodologo", (req, res) => {
  const { nome, ncc, consultorio, telefone, email } = req.body;

  const query = `INSERT INTO doutores (nome, ncc, consultorio, telefone, email) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nome, ncc, consultorio, telefone, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao cadastrar podólogo!");
    }
    res.status(201).send("Cadastro realizado com sucesso");
  });
});

// Rota para cadastrar paciente
app.post("/paciente", (req, res) => {
  const { nome, cpf, dataNascimento } = req.body;

  const sql = 'INSERT INTO pacientes (nome, cpf, data_nascimento) VALUES (?, ?, ?)';
  db.query(sql, [nome, cpf, dataNascimento], (err, result) => {
    if (err) {
      console.error('Erro ao inserir paciente:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }

    res.status(201).json({ message: 'Paciente cadastrado com sucesso!' });
  });
});

//loginPodologo
app.post('/LoginPodologo', (req, res) => {
  const { email, ncc } = req.body;
  const sql = 'SELECT * FROM doutores WHERE email = ? AND ncc = ?';

  db.query(sql, [email, ncc], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        nome: results[0].nome
      });
    } else {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
    }
  });
});



// Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
