require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'alexsandro31',
    password: process.env.DB_PASSWORD || 'curape123',
    database: process.env.DB_NAME || 'curape',
    port: process.env.DB_PORT || 3306
});

connection.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

module.exports = connection;
