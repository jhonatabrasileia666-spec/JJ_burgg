const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
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
        try { await client.query(`ALTER TABLE pedidos ADD COLUMN cliente_telefone VARCHAR(20);`); } catch(e) {}
        client.release();
    } catch (error) { console.error("Erro ao arrumar banco:", error); }
}
arrumarBanco();

app.get('/api/cardapio', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cardapio ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.put('/api/cardapio/:id', async (req, res) => {
    try {
        await pool.query('UPDATE cardapio SET preco = $1 WHERE id = $2', [req.body.preco, req.params.id]);
        res.json({ sucesso: true });
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.post('/api/pedidos', async (req, res) => {
    try {
        const { nome, telefone, itens, total, endereco } = req.body;
        // O SEGREDO ESTÁ AQUI: "RETURNING id" devolve a etiqueta única do pedido!
        const result = await pool.query(
            'INSERT INTO pedidos (cliente_nome, cliente_telefone, itens, total, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING id', 
            [nome, telefone || 'Não informado', JSON.stringify(itens), total, endereco]
        );
        res.json({ sucesso: true, id_pedido: result.rows[0].id });
    } catch (err) { 
        console.error(err);
        res.status(500).json({ erro: "Erro ao salvar o pedido" }); 
    }
});

app.get('/api/pedidos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE status < 4 ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.put('/api/pedidos/:id/status', async (req, res) => {
    try {
        await pool.query('UPDATE pedidos SET status = $1 WHERE id = $2', [req.body.status, req.params.id]);
        res.json({ sucesso: true });
    } catch (err) { res.status(500).json({ erro: "Erro" }); }
});

app.get('/api/financeiro', async (req, res) => {
    try {
        const pedidos = await pool.query('SELECT total, criado_em FROM pedidos');
        const gastos = await pool.query('SELECT * FROM gastos ORDER BY id DESC');
        res.json({ pedidos: pedidos.rows, gastos: gastos.rows });
    } catch (err) { res.status(500).json({ erro: "Erro ao buscar dados financeiros" }); }
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

app.listen(port, () => { console.log(`🚀 Servidor rodando na porta ${port}`); });
