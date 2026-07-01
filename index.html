<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <meta name="theme-color" content="#ffffff">
    <title>Monte seu Hambúrguer Premium</title>
    
    <style>
        :root { color-scheme: light; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }

        body {
            background-color: #ffffff !important;
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E") !important;
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh; padding: 15px; overflow-x: hidden;
        }

        .construtor-container { text-align: center; width: 100%; max-width: 450px; }

        h1 {
            font-size: 26px; font-weight: 900; margin-bottom: 15px; text-transform: uppercase;
            background: linear-gradient(135deg, #d35400, #ff6b00);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: 2px 3px 6px rgba(211, 84, 0, 0.15);
        }

        .hamburguer {
            display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;
            padding: 50px 15px 65px 15px; background-color: #f4d03f !important; 
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23f4d03f'/%3E%3C/svg%3E") !important;
            border-radius: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); position: relative; 
        }

        .logo-botton {
            position: absolute; top: 15px; left: 15px; width: 65px; height: 65px;
            border-radius: 50%; object-fit: cover; background-color: #ffffff; 
            border: 3px solid #ff6b00; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); z-index: 100;
            transition: transform 0.3s ease;
        }
        .logo-botton:active { transform: scale(1.1) rotate(-8deg); }

        .container-preco {
            position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%);
            background-image: linear-gradient(135deg, #2c3e50, #1a252f) !important;
            color: #ffffff !important; -webkit-text-fill-color: #ffffff !important;
            font-size: 16px; font-weight: bold; padding: 8px 22px;
            border-radius: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); white-space: nowrap; z-index: 90;
        }

        #preco-total { color: #f4d03f !important; -webkit-text-fill-color: #f4d03f !important; font-size: 18px; margin-left: 5px; }

        .camada-ingrediente { width: 260px; height: 38px; display: flex; justify-content: center; align-items: center; position: relative; transition: height 0.4s ease, opacity 0.35s ease, transform 0.45s ease; }
        .topo-container { height: auto; margin-bottom: -12px; z-index: 12; }
        .base-container { height: auto; margin-top: -12px; z-index: 1; }
        .camada-pepino { z-index: 8; } .camada-mussarela { z-index: 7; } .camada-alface { z-index: 6; } .camada-bacon { z-index: 5; } .camada-carne { z-index: 4; }
        
        .ingrediente-img { width: 100%; height: auto; display: block; }
        .escondido { height: 0 !important; opacity: 0 !important; transform: translateX(-150%) !important; pointer-events: none; }
        .saindo-direita { height: 0 !important; opacity: 0 !important; transform: translateX(150%) !important; pointer-events: none; }

        .paineis-botoes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; }
        button { background-color: #e74c3c !important; color: white !important; -webkit-text-fill-color: white !important; border: none; padding: 10px 4px; font-size: 12px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: 0.2s; }
        button.adicionar { background-color: #c0392b !important; }

        .btn-finalizar { width: 100%; background-image: linear-gradient(135deg, #27ae60, #2ecc71) !important; color: white !important; padding: 14px; font-size: 16px; border-radius: 8px; text-transform: uppercase; font-weight: bold; border: none; }

        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:none; justify-content:center; align-items:center; z-index: 1000; padding:15px; }
        .modal-overlay.ativo { display: flex; }
        .modal-card { background-color: #ffffff !important; width:100%; max-width:400px; padding:20px; border-radius:15px; text-align:left; }
        .modal-card h2 { font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #f4d03f; padding-bottom: 5px; color: #333 !important; -webkit-text-fill-color: #333 !important; }
        .campo-grupo { margin-bottom: 12px; }
        .campo-grupo label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 4px; color: #555 !important; -webkit-text-fill-color: #555 !important; }
        input, select { width:100%; padding:10px; margin:5px 0; border:1px solid #ccc; border-radius:5px; outline:none; background: #fff !important; color: #000 !important; -webkit-text-fill-color: #000 !important; }
        
        .btn-enviar-whats { width: 100%; background-color: #25d366 !important; color: white !important; padding: 12px; font-size: 15px; border-radius: 6px; margin-top: 10px; border:none; font-weight:bold; }
        .btn-fechar { background-color: #95a5a6 !important; width: 100%; margin-top: 8px; padding: 10px; border:none; font-weight:bold; border-radius: 6px; color:white !important; }
    </style>
</head>
<body>

    <main class="construtor-container">
        <h1>Monte seu Hambúrguer</h1>
        <div class="hamburguer">
            <img src="logo.png" alt="Logo Hamburgueria" class="logo-botton">
            <div class="camada-ingrediente topo-container"><img class="ingrediente-img" src="pao_topo.png"></div>
            <div id="container-pepino" class="camada-ingrediente camada-pepino"><img class="ingrediente-img" src="pepino.png"></div>
            <div id="container-mussarela" class="camada-ingrediente camada-mussarela"><img class="ingrediente-img" src="queijo.png"></div>
            <div id="container-alface" class="camada-ingrediente camada-alface"><img class="ingrediente-img" src="alface.png"></div>
            <div id="container-bacon" class="camada-ingrediente camada-bacon"><img class="ingrediente-img" src="bacon.png"></div>
            <div id="container-carne" class="camada-ingrediente camada-carne"><img class="ingrediente-img" src="carne.png"></div>
            <div class="camada-ingrediente base-container"><img class="ingrediente-img" src="pao_base.png"></div>
            <div class="container-preco">Total: <span id="preco-total">R$ 25,50</span></div>
        </div>

        <div class="paineis-botoes">
            <button id="btn-pepino" onclick="alternarIngrediente('pepino', 'Pepino', 1.50)">Remover Pepino (R$ 1,50)</button>
            <button id="btn-mussarela" onclick="alternarIngrediente('mussarela', 'Mussarela', 3.00)">Remover Mussarela (R$ 3,00)</button>
            <button id="btn-bacon" onclick="alternarIngrediente('bacon', 'Bacon', 4.00)">Remover Bacon (R$ 4,00)</button>
            <button id="btn-carne" onclick="alternarIngrediente('carne', 'Carne', 6.00)">Remover Carne (R$ 6,00)</button>
            <button id="btn-alface" onclick="alternarIngrediente('alface', 'Alface', 1.00)" style="grid-column: span 2;">Remover Alface (R$ 1,00)</button>
        </div>

        <button class="btn-finalizar" onclick="abrirModal()">FINALIZAR PEDIDO ➔</button>
    </main>

    <div id="modalPedido" class="modal-overlay">
        <div class="modal-card">
            <h2>Dados do seu Pedido</h2>
            <div class="campo-grupo"><label>Seu Nome:</label><input type="text" id="txt-nome" placeholder="Digite seu nome completo"></div>
            <div class="campo-grupo">
                <label>Como deseja receber?</label>
                <select id="select-entrega" onchange="mudarOpcaoEntrega()">
                    <option value="Entrega">Delivery (Entrega em Casa)</option>
                    <option value="Retirada">Retirar na Hamburgueria</option>
                </select>
            </div>
            <div class="campo-grupo" id="box-endereco"><label>Endereço de Entrega:</label><input type="text" id="txt-endereco" placeholder="Rua, número e bairro"></div>
            <button class="btn-enviar-whats" onclick="enviarPedidoWhatsApp()">Enviar Pedido no WhatsApp 💬</button>
            <button class="btn-fechar" onclick="fecharModal()">Voltar e Modificar lanche</button>
        </div>
    </div>

    <script>
        let valorTotal = 25.50;
        let ingredientesAtivos = { pepino: true, mussarela: true, bacon: true, carne: true, alface: true };

        function abrirModal() { document.getElementById('modalPedido').classList.add('ativo'); }
        function fecharModal() { document.getElementById('modalPedido').classList.remove('ativo'); }

        function mudarOpcaoEntrega() {
            const tipo = document.getElementById('select-entrega').value;
            document.getElementById('box-endereco').style.display = (tipo === 'Retirada') ? 'none' : 'block';
        }

        function alternarIngrediente(idCamada, nomeExibicao, precoIngrediente) {
            const container = document.getElementById(`container-${idCamada}`);
            const botao = document.getElementById(`btn-${idCamada}`);
            const precoExibicao = document.getElementById('preco-total');

            if (container.classList.contains('escondido') || container.classList.contains('saindo-direita')) {
                container.classList.remove('escondido', 'saindo-direita');
                botao.textContent = `Remover ${nomeExibicao} (R$ ${precoIngrediente.toFixed(2).replace('.', ',')})`;
                botao.classList.remove('adicionar');
                valorTotal += precoIngrediente;
                ingredientesAtivos[idCamada] = true;
            } else {
                container.classList.add('saindo-direita');
                botao.textContent = `Adicionar ${nomeExibicao} (R$ ${precoIngrediente.toFixed(2).replace('.', ',')})`;
                botao.classList.add('adicionar');
                valorTotal -= precoIngrediente;
                ingredientesAtivos[idCamada] = false;
                setTimeout(() => {
                    if (container.classList.contains('saindo-direita')) {
                        container.classList.remove('saindo-direita');
                        container.classList.add('escondido');
                    }
                }, 450);
            }
            precoExibicao.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        }

        function enviarPedidoWhatsApp() {
            const nome = document.getElementById('txt-nome').value.trim();
            const tipoEntrega = document.getElementById('select-entrega').value;
            const endereco = document.getElementById('txt-endereco').value.trim();
            
            if (!nome) { alert('Por favor, informe seu nome antes de prosseguir.'); return; }
            if (tipoEntrega === 'Entrega' && !endereco) { alert('Por favor, preencha o endereço para a entrega.'); return; }

            let listaIngredientes = [];
            if (ingredientesAtivos.carne) listaIngredientes.push(" - Blend Bovino (Carne)");
            if (ingredientesAtivos.bacon) listaIngredientes.push(" - Bacon Crocante");
            if (ingredientesAtivos.mussarela) listaIngredientes.push(" - Queijo Mussarela");
            if (ingredientesAtivos.pepino) listaIngredientes.push(" - Pepino");
            if (ingredientesAtivos.alface) listaIngredientes.push(" - Alface Fresco");

            if(listaIngredientes.length === 0) { listaIngredientes.push(" - Apenas o Pão (Lanche Vazio)"); }

            let textoWhats = `*🍔 NOVO PEDIDO - MONTE SEU HAMBÚRGUER* \n\n*Cliente:* ${nome}\n*Método:* ${tipoEntrega}\n`;
            if(tipoEntrega === 'Entrega') { textoWhats += `*Endereço:* ${endereco}\n`; }
            
            textoWhats += `\n*🧾 COMPOSIÇÃO DO BURGER:* \n - Pão Coroa (Topo)\n`;
            listaIngredientes.forEach(item => { textoWhats += `${item}\n`; });
            textoWhats += ` - Pão Base\n\n`;

            let taxaEntrega = tipoEntrega === 'Entrega' ? 5.00 : 0.00;
            let totalFinal = valorTotal + taxaEntrega;

            textoWhats += `Subtotal Lanche: R$ ${valorTotal.toFixed(2).replace('.', ',')}\n`;
            if(taxaEntrega > 0) { textoWhats += `Taxa de Entrega: R$ ${taxaEntrega.toFixed(2).replace('.', ',')}\n`; }
            textoWhats += `*TOTAL DO PEDIDO:* R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

            const meuNumeroWhastapp = "5568992365649"; 
            window.location.href = `https://wa.me/${meuNumeroWhastapp}?text=${encodeURIComponent(textoWhats)}`;
        }
    </script>
</body>
</html>
