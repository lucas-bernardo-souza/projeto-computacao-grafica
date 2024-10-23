import {desenharLinhaEquacaoReta, desenharLinhaParametrica, desenharLinhaBresenham} from './retas.js'
import {desenharCirculoEquacao, desenharCircunfereciaParametrica, desenharCircunferencia} from './circunferencia.js'
// Array usado para armazenar as coordenadas iniciais e finais
let coordenadas = [];
let ctx;

function iniciarCanvas(canvas){
    ctx = canvas.getContext('2d');
    // Desenha uma imagem no canva para iniciar
    ctx.fillStyle = 'white';
    // Desenha um retângulo do tamanho do canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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

function finalizarDesenho(event, botaoSelecionado){
    coordenadas.push(event.offsetX);
    coordenadas.push(event.offsetY);
    if(botaoSelecionado == 2){
        desenharLinhaEquacaoReta(coordenadas);
    } else if (botaoSelecionado == 3){
        desenharLinhaParametrica(coordenadas);
    } else if(botaoSelecionado == 4){
        desenharLinhaBresenham(coordenadas);
    } else if(botaoSelecionado == 5){
        desenharCirculoEquacao(coordenadas);
    } else if(botaoSelecionado == 6){
        desenharCircunfereciaParametrica(coordenadas);
    } else if(botaoSelecionado == 7){
        desenharCircunferencia(coordenadas);
    }
}

export {iniciarCanvas, mudarCorPixel, iniciarDesenho, finalizarDesenho};