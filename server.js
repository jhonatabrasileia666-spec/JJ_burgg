const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CONEXÃO COM O BANCO DE DADOS
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ==========================================
// ROTAS DO SISTEMA BÁSICO (Cardápio e Pedidos)
// ==========================================
app.get('/api/teste-banco', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() AS hora');
        client.release();
        res.json({ sucesso: true, mensagem: "🔥 Banco conectado!", hora: result.rows[0].hora });
    } catch (err) { res.status(500).json({ sucesso: false, erro: err.message }); }
});

app.get('/api/setup', async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query(`CREATE TABLE IF NOT EXISTS cardapio (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, descricao TEXT, preco NUMERIC(10,2) NOT NULL, tipo VARCHAR(50) DEFAULT 'lanche');`);
        await client.query(`CREATE TABLE IF NOT EXISTS pedidos (id SERIAL PRIMARY KEY, cliente_nome VARCHAR(100) NOT NULL, cliente_telefone VARCHAR(20), itens JSONB NOT NULL, total NUMERIC(10,2) NOT NULL, status INTEGER DEFAULT 1, endereco TEXT, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        client.release();
        res.json({ sucesso: true, mensagem: "✅ Tabelas criadas!" });
    } catch (err) { res.status(500).json({ sucesso: false, erro: err.message }); }
});

// CARDÁPIO
app.get('/api/cardapio', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cardapio ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.put('/api/cardapio/:id', async (req, res) => {
    await pool.query('UPDATE cardapio SET preco = $1 WHERE id = $2', [req.body.preco, req.params.id]);
    res.json({ sucesso: true });
});

// PEDIDOS
app.post('/api/pedidos', async (req, res) => {
    const { nome, telefone, itens, total, endereco } = req.body;
    await pool.query('INSERT INTO pedidos (cliente_nome, cliente_telefone, itens, total, endereco) VALUES ($1, $2, $3, $4, $5)', [nome, telefone, JSON.stringify(itens), total, endereco]);
    res.json({ sucesso: true });
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE status < 4 ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.put('/api/pedidos/:id/status', async (req, res) => {
    await pool.query('UPDATE pedidos SET status = $1 WHERE id = $2', [req.body.status, req.params.id]);
    res.json({ sucesso: true });
});

// ==========================================
// NOVAS ROTAS DE CONTABILIDADE 📊
// ==========================================
app.get('/api/financeiro', async (req, res) => {
    try {
        const client = await pool.connect();
        
        // Cria a gaveta de gastos automaticamente sem você precisar fazer nada
        await client.query(`CREATE TABLE IF NOT EXISTS gastos (id SERIAL PRIMARY KEY, descricao VARCHAR(255), valor NUMERIC(10,2), criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        
        // Puxa todos os pedidos vendidos e os gastos
        const pedidos = await client.query('SELECT total, criado_em FROM pedidos');
        const gastos = await client.query('SELECT * FROM gastos ORDER BY id DESC');
        
        client.release();
        res.json({ pedidos: pedidos.rows, gastos: gastos.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar dados financeiros" });
    }
});

app.post('/api/gastos', async (req, res) => {
    try {
        const { descricao, valor } = req.body;
        await pool.query('INSERT INTO gastos (descricao, valor) VALUES ($1, $2)', [descricao, valor]);
        res.json({ sucesso: true });
    } catch (err) { res.status(500).json({ erro: "Erro ao salvar gasto" }); }
});

app.delete('/api/gastos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM gastos WHERE id = $1', [req.params.id]);
        res.json({ sucesso: true });
    } catch (err) { res.status(500).json({ erro: "Erro ao apagar gasto" }); }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
