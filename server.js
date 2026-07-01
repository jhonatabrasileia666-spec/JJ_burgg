const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CONEXÃO COM O BANCO DE DADOS POSTGRESQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ==========================================
// ROTAS DE CONFIGURAÇÃO (Já usamos)
// ==========================================
app.get('/api/teste-banco', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() AS hora_atual');
        client.release();
        res.json({ sucesso: true, mensagem: "🔥 Banco conectado!", hora: result.rows[0].hora_atual });
    } catch (err) {
        res.status(500).json({ sucesso: false, erro: err.message });
    }
});

app.get('/api/setup', async (req, res) => {
    try {
        const client = await pool.connect();
        await client.query(`CREATE TABLE IF NOT EXISTS cardapio (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, descricao TEXT, preco NUMERIC(10,2) NOT NULL, tipo VARCHAR(50) DEFAULT 'lanche');`);
        await client.query(`CREATE TABLE IF NOT EXISTS pedidos (id SERIAL PRIMARY KEY, cliente_nome VARCHAR(100) NOT NULL, cliente_telefone VARCHAR(20), itens JSONB NOT NULL, total NUMERIC(10,2) NOT NULL, status INTEGER DEFAULT 1, endereco TEXT, criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
        const checkCardapio = await client.query('SELECT COUNT(*) FROM cardapio');
        if (parseInt(checkCardapio.rows[0].count) === 0) {
            await client.query(`INSERT INTO cardapio (nome, descricao, preco, tipo) VALUES ('Classic Burger', 'Pão macio, blend bovino de 160g, queijo mussarela derretido e alface fresca.', 22.00, 'lanche'), ('Bacon Master', 'A escolha dos fortes: Pão, blend 160g, queijo mussarela e muito bacon premium.', 27.00, 'lanche'), ('O Monstrão', 'Para quem quer tudo! Blend de carne, bacon, queijo, pepino e alface.', 32.50, 'lanche'), ('Coca-Cola (Lata)', 'Estupidamente gelada.', 6.00, 'bebida')`);
        }
        client.release();
        res.json({ sucesso: true, mensagem: "✅ Tabelas criadas!" });
    } catch (err) {
        res.status(500).json({ sucesso: false, erro: err.message });
    }
});

// ==========================================
// NOVAS ROTAS DO SISTEMA (A MÁGICA ACONTECE AQUI)
// ==========================================

// 1. Rota para o site puxar o cardápio
app.get('/api/cardapio', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cardapio ORDER BY id ASC');
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar cardápio" });
    }
});

// 2. Rota para o site enviar o pedido do cliente para o banco
app.post('/api/pedidos', async (req, res) => {
    try {
        const { nome, telefone, itens, total, endereco } = req.body;
        const client = await pool.connect();
        const result = await client.query(`
            INSERT INTO pedidos (cliente_nome, cliente_telefone, itens, total, endereco)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `, [nome, telefone, JSON.stringify(itens), total, endereco]);
        client.release();
        res.json({ sucesso: true, id_pedido: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao salvar pedido" });
    }
});

// 3. Rota para o Painel do Dono puxar os pedidos
app.get('/api/pedidos', async (req, res) => {
    try {
        const client = await pool.connect();
        // Puxa pedidos que não foram cancelados ou finalizados (status menor que 4)
        const result = await client.query('SELECT * FROM pedidos WHERE status < 4 ORDER BY id DESC');
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar pedidos" });
    }
});

// 4. Rota para o Painel do Dono atualizar o status do pedido
app.put('/api/pedidos/:id/status', async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const client = await pool.connect();
        await client.query('UPDATE pedidos SET status = $1 WHERE id = $2', [status, id]);
        client.release();
        res.json({ sucesso: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar status" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
