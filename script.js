import {iniciarCanvas, iniciarDesenho, finalizarDesenho} from './scripts/canvas.js'

const canvas = document.getElementById("canvas");
iniciarCanvas(canvas);

// Seleciona todos os botões com a classe 'botao'
const botoes = document.querySelectorAll('.botao');
const botaoApagar = document.getElementById('apagar-botao');
let botaoSelecionado;

// Adiciona evento de clique a todos os botões
botoes.forEach(function(botao) {
    botao.addEventListener('click', function() {
        // Remove a classe 'selecionado' de todos os botões
        
        botoes.forEach(function(b) {
            b.classList.remove('selecionado');
        });
        
        // Adiciona a classe 'selecionado' apenas ao botão clicado
        this.classList.add('selecionado');
        atualizaBotao(this);
    });
});

function atualizaBotao(botao){
    botaoSelecionado = botao.id;
    // Abre a aplicação de conversor de cores
    if(botaoSelecionado == 1)
        window.open('conversor/index.html', '_blank');
}
// Adicionando função a um botão usando Arrow Function
botaoApagar.addEventListener('click', () => {
    iniciarCanvas(canvas);
})

canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mouseup', function(event){
    finalizarDesenho(event, botaoSelecionado);
});

