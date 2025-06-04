const mysql = require('mysql2/promise');

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'alexsandro31',
    password: 'curape123', // insira a senha do seu MySQL aqui
    multipleStatements: true,
  });

  const sql = `
    CREATE DATABASE IF NOT EXISTS curape;
    USE curape;

    CREATE TABLE IF NOT EXISTS registro_podologo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      ncc VARCHAR(100) UNIQUE,
      consultorio VARCHAR(100),
      telefone VARCHAR(20),
      email VARCHAR(100),
      tipo_acesso ENUM('admin', 'comum') DEFAULT 'comum',
      data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS paciente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      cpf_rg VARCHAR(14) UNIQUE,
      doenca_cronica  TEXT,
      data_nascimento DATE,
      medicamento TEXT,
      alergia TEXT,
      queixa_principal TEXT,
      telefone VARCHAR(20),
      email VARCHAR(150),
      endereco TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS atendimento (
      id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
      id_paciente INT,
      data_atendimento DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      queixas TEXT,
      FOREIGN KEY (id_paciente) REFERENCES paciente(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS receitas (
      id_receitas INT AUTO_INCREMENT PRIMARY KEY,
      id_paciente INT,
      id_atendimento INT,
      FOREIGN KEY (id_paciente) REFERENCES paciente(id) ON DELETE CASCADE,
      FOREIGN KEY (id_atendimento) REFERENCES atendimento(id_atendimento) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS medicamentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_receitas INT,
      nome_medicamento VARCHAR(100),
      dosagem VARCHAR(50),
      FOREIGN KEY (id_receitas) REFERENCES receitas(id_receitas) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS historico_paciente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_paciente INT NOT NULL,
      data_evento DATETIME DEFAULT CURRENT_TIMESTAMP,
      descricao TEXT NOT NULL,
      registrado_por VARCHAR(100),
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (id_paciente) REFERENCES paciente(id) ON DELETE CASCADE
    );
  `;

  await connection.query(sql);
  console.log('✅ Banco de dados "curape" e tabelas criadas com sucesso!');
  await connection.end();
}

initDatabase().catch(err => {
  console.error('❌ Erro ao criar o banco de dados:', err);
});
