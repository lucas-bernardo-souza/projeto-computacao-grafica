// Seleciona todos os botões com a classe 'botao'
const botoes = document.querySelectorAll('.botao');
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
}

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
// Array usado para armazenar as coordenadas iniciais e finais
let coordenadas = [];

// Desenha uma imagem no canva para iniciar
ctx.fillStyle = 'white';
// Desenha um retângulo do tamanho do canvas
ctx.fillRect(0, 0, canvas.width, canvas.height);

function mudarCorPixel(x, y, r, g, b, a){
    // criar uma imagem de 1x1 pixel
    const pixel = ctx.createImageData(1,1);

    // modificar a cor do pixel que será passada como parâmetro
    pixel.data[0] = r; // red
    pixel.data[1] = g; // green
    pixel.data[2] = b; // blue
    pixel.data[3] = a; // Alpha (0 é transparente, 255 é opaco)

    // colocar o pixel no canvas nas coordenadas (x,y)
    ctx.putImageData(pixel, x, y);
}

function iniciarDesenho(event){
    coordenadas.push(event.offsetX);
    coordenadas.push(event.offsetY);
    return;
}

function finalizarDesenho(event){
    coordenadas.push(event.offsetX);
    coordenadas.push(event.offsetY);
    if(botaoSelecionado == 2){
        desenharLinhaEquacaoReta();
    } else if (botaoSelecionado == 3){
        desenharLinhaEquacaoParametrica();
    } else if(botaoSelecionado == 4){

    }
}

function desenharLinhaEquacaoReta(){
    // Desenhando linhas que vão da esquerda para direita e são mais horizontais que verticaiss
    let y, x1, y1, x2, y2 = 0;
    y2 = coordenadas.pop();
    x2 = coordenadas.pop();
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    let m = (y2-y1)/(x2-x1);
    let deltaY, deltaX = 0;
    if(y1 > y2){
        deltaY = y1 - y2;
    } else {
        deltaY = y2 - y1;
    }
    if(x1 > x2){
        deltaX = x1 - x2;
    } else {
        deltaX = x2 - x1;
    }
    //console.log('x1: ' + x1 + ' x2: ' + x2);
    if (deltaX > deltaY && x1 < x2){
        for(let x = x1; x <= x2; x++){
                y = m * (x - x1) + y1;
                mudarCorPixel(x, y, 255, 0, 0, 255);
            }
    } else if(deltaY > deltaX && y1 < y2){
        // incrementa Y (começa em Y1 e vai até Y2)
        for(let y = y1; y <= y2; y++){
            // incrementa Y e calcula X
            x = (y - y1) / m + x1;
            mudarCorPixel(x, y, 0, 0, 255, 255);
        }
    } else if(deltaY > deltaX && y2 < y1) {
        // decrementa Y (começa em Y2 e vai até Y1)
        for(let y = y2; y <= y1; y++){
            // decrementa Y e calcula X
            x = (y - y1) / m + x1;
            mudarCorPixel(x, y, 252, 186, 3, 255);
        }
    } else if(deltaX > deltaY && x2 < x1) {
        // decrementando X (começa em X2 e vai até X1)
        for(let x = x2; x <= x1; x++){
            // decrementa X e calcula Y
            y = m * (x - x1) + y1;
            mudarCorPixel(x, y, 0, 255, 0, 255);
        }
    }
}

canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mouseup', finalizarDesenho);

