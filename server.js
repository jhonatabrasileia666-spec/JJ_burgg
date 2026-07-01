const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurações de segurança e leitura de dados
app.use(cors());
app.use(express.json());

// Diz ao servidor para exibir o seu site que está na pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// CONEXÃO COM O BANCO DE DADOS POSTGRESQL
// ==========================================
// O Railway injeta a variável DATABASE_URL automaticamente de forma segura
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para conexões em nuvem
    }
});

// Rota de Teste para ver se o Banco está vivo
app.get('/api/teste-banco', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() AS hora_atual');
        client.release();
        res.json({ 
            sucesso: true, 
            mensagem: "🔥 O Banco PostgreSQL está conectado perfeitamente!", 
            hora_banco: result.rows[0].hora_atual 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            sucesso: false, 
            erro: "Falha ao conectar no banco de dados.",
            detalhe: err.message
        });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor da JJ Burguer rodando na porta ${port}`);
});
