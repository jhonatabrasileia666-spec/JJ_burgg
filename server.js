const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurações de segurança
app.use(cors());
app.use(express.json());

// Diz ao servidor para exibir o seu site que está na pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// CONEXÃO COM O BANCO DE DADOS
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// 1. Rota de Teste
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

// ==========================================
// 2. NOVA ROTA: INSTALAR O BANCO DE DADOS
// ==========================================
app.get('/api/setup', async (req, res) => {
    try {
        const client = await pool.connect();
        
        // Criar a gaveta do Cardápio
        await client.query(`
            CREATE TABLE IF NOT EXISTS cardapio (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                descricao TEXT,
                preco NUMERIC(10,2) NOT NULL,
                tipo VARCHAR(50) DEFAULT 'lanche'
            );
        `);

        // Criar a gaveta de Pedidos
        await client.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id SERIAL PRIMARY KEY,
                cliente_nome VARCHAR(100) NOT NULL,
                cliente_telefone VARCHAR(20),
                itens JSONB NOT NULL,
                total NUMERIC(10,2) NOT NULL,
                status INTEGER DEFAULT 1,
                endereco TEXT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Inserir os lanches básicos se a gaveta estiver vazia
        const checkCardapio = await client.query('SELECT COUNT(*) FROM cardapio');
        if (parseInt(checkCardapio.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO cardapio (nome, descricao, preco, tipo) VALUES 
                ('Classic Burger', 'Pão macio, blend bovino de 160g, queijo mussarela derretido e alface fresca.', 22.00, 'lanche'),
                ('Bacon Master', 'A escolha dos fortes: Pão, blend 160g, queijo mussarela e muito bacon premium.', 27.00, 'lanche'),
                ('O Monstrão', 'Para quem quer tudo! Blend de carne, bacon, queijo, pepino e alface.', 32.50, 'lanche'),
                ('Coca-Cola (Lata)', 'Estupidamente gelada.', 6.00, 'bebida')
            `);
        }

        client.release();
        res.json({ sucesso: true, mensagem: "✅ Tabelas criadas e cardápio inicial salvo no banco com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ sucesso: false, erro: err.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor da JJ Burguer rodando na porta ${port}`);
});
