import { mudarCorPixel } from "./canvas.js";

function desenharLinhaEquacaoReta(coordenadas){
    // Desenhando linhas que vão da esquerda para direita e são mais horizontais que verticaiss
    let x, y, x1, y1, x2, y2 = 0;
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

function desenharLinhaParametrica(coordenadas){
    let y, x, x1, y1, x2, y2 = 0;
    y2 = coordenadas.pop();
    x2 = coordenadas.pop();
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();

    for(let t = 0; t <= 1; t += 0.01){
        x = x1 + (x2 - x1) * t;
        y = y1 + (y2 - y1) * t;
        mudarCorPixel(x, y, 255, 0, 0, 255);
    }
}

function desenharLinhaBresenham(coordenadas){
    let x0, y0, x1, y1, dx, dy = 0; 
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    y0 = coordenadas.pop();
    x0 = coordenadas.pop();
    dx = Math.abs(x1 - x0);
    dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    
    while(true){
        mudarCorPixel(x0, y0, 255, 0, 0, 255);

        if((x0 === x1) && (y0 === y1)) break;
        let e2 = 2 * err;
        if(e2 > -dy){
            err -= dy;
            x0 += sx;
        }
        if(e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    for(let x = x0; x < x1; x++){
        let y = y0;
        mudarCorPixel(x, y, 255, 0, 0, 255);
        let e2 = 2 * err;
        if(e2 > -dy){
            err -= dy;
            x += sx;
        }
        if(e2 < dx){
            err += dx;
            y += sy;
        }
    }
}

export {desenharLinhaEquacaoReta, desenharLinhaParametrica, desenharLinhaBresenham};