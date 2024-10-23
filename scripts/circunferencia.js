import { mudarCorPixel } from "./canvas.js";

function raio(x0, y0, x1, y1){
    // Distância euclidiana
    let r = Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0)));
    r = r / Math.sqrt(2);
    return r;
}

function pintarPixelsCirc(xc, yc, x, y) {
    mudarCorPixel(xc + x, yc + y, 255, 0, 0, 255); // Quadrante 1
    mudarCorPixel(xc - x, yc + y, 255, 0, 0, 255); // Quadrante 2
    mudarCorPixel(xc + x, yc - y, 255, 0, 0, 255); // Quadrante 3
    mudarCorPixel(xc - x, yc - y, 255, 0, 0, 255); // Quadrante 4
    mudarCorPixel(xc + y, yc + x, 255, 0, 0, 255); // Quadrante 5
    mudarCorPixel(xc - y, yc + x, 255, 0, 0, 255); // Quadrante 6
    mudarCorPixel(xc + y, yc - x, 255, 0, 0, 255); // Quadrante 7
    mudarCorPixel(xc - y, yc - x, 255, 0, 0, 255); // Quadrante 8
}

function desenharCirculoEquacao(coordenadas){
    let xCentro, yCentro, x1, y1, r, y= 0;
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    // xCentro e yCentro é o ponto central da circunferência
    yCentro = coordenadas.pop();
    xCentro = coordenadas.pop();
    r = raio(xCentro, yCentro, x1, y1);
    
    for(let x = r; x > y; x--){
        y = Math.sqrt(r * r - x * x);
        pintarPixelsCirc(xCentro, yCentro, x, y);
    }
}

function desenharCircunfereciaParametrica(coordenadas){
    let xCentro, yCentro, x1, y1, r, y, x = 0;
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    yCentro = coordenadas.pop();
    xCentro = coordenadas.pop();
    r = raio(xCentro, yCentro, x1, y1);
    
    // Percorrendo a circunferência de 0 até pi/4 (0,79) o resto da circunferência será espelhado, assim como na equação
    for(let a = 0; a < 0.79; a += 0.1){
        x = r * Math.cos(a);
        y = r * Math.sin(a);
        pintarPixelsCirc(xCentro, yCentro, x, y);
    }
}

function desenharCircunferencia(coordenadas){
    let xCentro, yCentro, x1, y1, r, y, x, cos1, sen1 = 0;
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    yCentro = coordenadas.pop();
    xCentro = coordenadas.pop();
    
    r = raio(xCentro, yCentro, x1, y1);

    cos1 = Math.cos(Math.PI / 180);
    sen1 = Math.sin(Math.PI / 180);
    x = r;
    y = 0;
    for(let i = 0; i < 360; i++){
        const xn = x * cos1 - y * sen1;
        const yn = x * sen1 + y * cos1;
        x = xn;
        y = yn;
    
        mudarCorPixel(Math.round(xCentro+x), Math.round(yCentro+y), 255, 0, 0, 255);
    }

}

function desenharCircunferenciaBresenham(coordenadas){
    let xCentro, yCentro, x1, y1, r = 0;
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    // xCentro e yCentro é o ponto central da circunferência
    yCentro = coordenadas.pop();
    xCentro = coordenadas.pop();
    r = raio(xCentro, yCentro, x1, y1);

    // Parâmetros do algoritmo de Bresenham
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;

    pintarPixelsCirc(xCentro, yCentro, x, y);

    while(y >= x){
        x++;

        if(d > 0){
            y--;
            d = d + 4 * (x - y) + 10;
        } else {
            d = d + 4 * x + 6;
        }

        pintarPixelsCirc(xCentro, yCentro, x, y);
    }

}

export{desenharCirculoEquacao, desenharCircunfereciaParametrica, desenharCircunferencia, desenharCircunferenciaBresenham};