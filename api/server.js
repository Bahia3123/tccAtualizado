const express = require("express");
const cors = require("cors");
const db = require("./database");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'pdfs');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
  let originalName = file.originalname || 'prescricao.pdf';

  // Se quiser pegar o nome do paciente de req.body:
  if (req.body.patientName) {
    // Remove acentos, espaços e caracteres especiais
    const cleanName = req.body.patientName
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "");

    originalName = `${cleanName}.pdf`;
  }

  cb(null, originalName);
}
})
// DECLARAÇÃO DO upload
const upload = multer({ storage });

// ✅ AGORA você pode usar upload aqui:
app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Arquivo não enviado" });
  return res.json({
    filename: req.file.filename,
    patientName: req.body.patientName,
    filePath: `/pdfs/${req.file.filename}`
  });
});

app.get('/pdfs', (req, res) => {
  const pdfDir = path.join(__dirname, 'pdfs');

  if (!fs.existsSync(pdfDir)) {
    return res.json([]);
  }

  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório de PDFs:', err);
      return res.status(500).json({ error: 'Erro ao listar os PDFs.' });
    }

    const list = files
      .filter(file => file.endsWith('.pdf'))
      .map(file => ({
        filename: file,
        patientName: decodeURIComponent(file.split('-').slice(1).join('-').replace('.pdf', '')),
        url: `/pdfs/${file}`
      }));

    res.json(list);
  });
});


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

    // Rota GET para listar os pacientes
app.get('/PacienteList', (req, res) => {
  const query = 'SELECT * FROM paciente';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pacientes:', err);
      return res.status(500).json({ success: false, error: 'Erro ao buscar pacientes no banco de dados.' });
    }

    res.status(200).json(results); // Envia a lista de pacientes como JSON
  });
});

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));



app.get("/PodologoDados", async (req, res) => {
  try {
    db.query("SELECT nome, ncc, consultorio, telefone, email FROM registro_podologo LIMIT 1", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar dados" });
      }
      res.json(results[0]);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});





// Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
