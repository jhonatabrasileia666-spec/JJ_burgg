function alternarIngrediente(nomeIngrediente) {
    // Pega o elemento visual do ingrediente e o botão correspondente
    const camada = document.getElementById(`camada-${nomeIngrediente}`);
    const botao = document.getElementById(`btn-${nomeIngrediente}`);

    // CORRIGIDO: Sem o espaço em branco no nome da variável
    const nomeFormatado = nomeIngrediente.charAt(0).toUpperCase() + nomeIngrediente.slice(1);

    // Se o ingrediente estiver visível, esconde. Se estiver escondido, mostra.
    if (camada.classList.contains('escondido')) {
        camada.classList.remove('escondido');
        botao.textContent = `Remover ${nomeFormatado}`;
        botao.classList.remove('adicionar');
    } else {
        camada.classList.add('escondido');
        botao.textContent = `Adicionar ${nomeFormatado}`;
        botao.classList.add('adicionar');
    }
}
