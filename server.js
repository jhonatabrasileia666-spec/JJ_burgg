const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function arrumarBanco() {
    try {
        const client = await pool.connect();
        await client.query(`CREATE TABLE IF NOT EXISTS cardapio (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, descricao TEXT, preco NUMERIC(10,2) NOT NULL, tipo VARCHAR(50) DEFAULT 'lanche');`);
        await client.query(`CREATE TABLE IF NOT EXISTS pedidos (id SERIAL PRIMARY KEY, cliente_nome VARCHAR(100) NOT NULL, itens JSONB NOT NULL, total NUMERIC(10,2) NOT NULL, status INTEGER DEFAULT 1, endereco TEXT, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        await client.query(`CREATE TABLE IF NOT EXISTS gastos (id SERIAL PRIMARY KEY, descricao VARCHAR(255), valor NUMERIC(10,2), criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        await client.query(`CREATE TABLE IF NOT EXISTS ingredientes (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, imagem TEXT);`);
        
        // MÁGICA DE PROTEÇÃO: Transforma a coluna "imagem" em formato de Texto Longo para guardar a foto eternamente no Banco de Dados
        try { await client.query(`ALTER TABLE ingredientes ALTER COLUMN imagem TYPE TEXT;`); } catch(e) {}
        try { await client.query(`ALTER TABLE ingredientes ADD COLUMN preco NUMERIC(10,2) DEFAULT 0;`); } catch(e) {}
        try { await client.query(`ALTER TABLE ingredientes ADD COLUMN ordem INTEGER DEFAULT 5;`); } catch(e) {}
        try { await client.query(`ALTER TABLE pedidos ADD COLUMN cliente_telefone VARCHAR(20);`); } catch(e) {}
        try { await client.query(`ALTER TABLE cardapio ADD COLUMN composicao JSONB;`); } catch(e) {}
        
        client.release();
    } catch (error) { console.error("Erro ao arrumar banco:", error); }
}
arrumarBanco();

app.get('/api/ingredientes', async (req, res) => {
    try { const result = await pool.query('SELECT * FROM ingredientes ORDER BY id ASC'); res.json(result.rows); } catch (err) {}
});

app.post('/api/ingredientes', async (req, res) => {
    try {
        const { nome, imagem } = req.body;
        // A imagem agora é um texto codificado guardado com segurança
        try {
            await pool.query('INSERT INTO ingredientes (nome, imagem, preco, ordem) VALUES ($1, $2, 0, 5)', [nome, imagem]);
        } catch(e1) {
            await pool.query('INSERT INTO ingredientes (nome, imagem) VALUES ($1, $2)', [nome, imagem]);
        }
        res.json({ sucesso: true });
    } catch (err) {
        res.status(500).json({ sucesso: false, erro: err.message });
    }
});

// === ROTAS DO CARDÁPIO ===
app.get('/api/cardapio', async (req, res) => {
    try { const result = await pool.query('SELECT * FROM cardapio ORDER BY id ASC'); res.json(result.rows); } catch (err) {}
});
app.post('/api/cardapio', async (req, res) => {
    try {
        const { nome, descricao, preco, tipo, composicao } = req.body;
        await pool.query('INSERT INTO cardapio (nome, descricao, preco, tipo, composicao) VALUES ($1, $2, $3, $4, $5)', [nome, descricao, preco, tipo, JSON.stringify(composicao)]);
        res.json({ sucesso: true });
    } catch (err) { res.status(500).json({ erro: "Erro ao criar lanche" }); }
});
app.put('/api/cardapio/:id', async (req, res) => {
    try { await pool.query('UPDATE cardapio SET preco = $1 WHERE id = $2', [req.body.preco, req.params.id]); res.json({ sucesso: true }); } catch (err) {}
});
app.delete('/api/cardapio/:id', async (req, res) => {
    try { await pool.query('DELETE FROM cardapio WHERE id = $1', [req.params.id]); res.json({ sucesso: true }); } catch (err) {}
});

// === ROTAS DE PEDIDOS E FINANÇAS ===
app.post('/api/pedidos', async (req, res) => {
    try {
        const { nome, telefone, itens, total, endereco } = req.body;
        const result = await pool.query('INSERT INTO pedidos (cliente_nome, cliente_telefone, itens, total, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING id', [nome, telefone || 'Não informado', JSON.stringify(itens), total, endereco]);
        res.json({ sucesso: true, id_pedido: result.rows[0].id });
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});
app.get('/api/pedidos', async (req, res) => {
    try { const result = await pool.query('SELECT * FROM pedidos WHERE status < 4 ORDER BY id DESC'); res.json(result.rows); } catch (err) {}
});
app.put('/api/pedidos/:id/status', async (req, res) => {
    try { await pool.query('UPDATE pedidos SET status = $1 WHERE id = $2', [req.body.status, req.params.id]); res.json({ sucesso: true }); } catch (err) {}
});
app.get('/api/financeiro', async (req, res) => {
    try {
        const pedidos = await pool.query('SELECT total, criado_em FROM pedidos');
        const gastos = await pool.query('SELECT * FROM gastos ORDER BY id DESC');
        res.json({ pedidos: pedidos.rows, gastos: gastos.rows });
    } catch (err) {}
});
app.post('/api/gastos', async (req, res) => {
    try { await pool.query('INSERT INTO gastos (descricao, valor) VALUES ($1, $2)', [req.body.descricao, req.body.valor]); res.json({ sucesso: true }); } catch (err) {}
});
app.delete('/api/gastos/:id', async (req, res) => {
    try { await pool.query('DELETE FROM gastos WHERE id = $1', [req.params.id]); res.json({ sucesso: true }); } catch (err) {}
});

app.listen(port, () => { console.log(`🚀 Servidor rodando`); });
