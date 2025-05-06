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

  const query = `INSERT INTO registro_podologo (nome, ncc, consultorio, telefone, email) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [nome, ncc, consultorio, telefone, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao cadastrar podólogo!");
    }
    res.status(201).send("Cadastro realizado com sucesso");
  });
});

// Rota para cadastrar paciente
app.post("/Paciente", (req, res) => {
  const { nome, cpf_rg, data_nascimento, queixa_principal, doenca_cronica, alergia, medicamento, telefone, email } = req.body;

  const query = `INSERT INTO paciente (nome, cpf_rg, data_nascimento, queixa_principal, doenca_cronica, alergia, medicamento, telefone, email) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, cpf_rg, data_nascimento, queixa_principal, doenca_cronica, alergia, medicamento, telefone, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar paciente');
    }
    res.status(200).send('Paciente adicionado com sucesso');
  });
});

//loginPodologo
app.post('/LoginPodologo', (req, res) => {
  const { email, ncc } = req.body;
  const sql = 'SELECT * FROM registro_podologo WHERE email = ? AND ncc = ?';

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

    app.post('/LoginPaciente', (req, res) => {
      const { email, ncc } = req.body;
      const sql = 'SELECT * FROM paciente WHERE email = ? AND cpf_rg = ? AND data_nascimento = ?';
    
      db.query(sql, [email, ncc, data_nascimento], (err, results) => {
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
