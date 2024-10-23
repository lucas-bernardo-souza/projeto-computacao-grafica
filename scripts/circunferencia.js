import { mudarCorPixel } from "./canvas.js";

function raio(x0, y0, x1, y1){
    // Distância euclidiana
    let r = Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0)));
    r = r / Math.sqrt(2);
    return r;
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
        mudarCorPixel(xCentro+x, yCentro+y, 255, 0, 0, 255);
        mudarCorPixel(xCentro+y, yCentro+x, 255, 0, 0, 255);
        mudarCorPixel(xCentro-y, yCentro+x, 255, 0, 0, 255);
        mudarCorPixel(xCentro-x, yCentro+y, 255, 0, 0, 255);
        mudarCorPixel(xCentro-x, yCentro-y, 255, 0, 0, 255);
        mudarCorPixel(xCentro-y, yCentro-x, 255, 0, 0, 255);
        mudarCorPixel(xCentro+y, yCentro-x, 255, 0, 0, 255);
        mudarCorPixel(xCentro+x, yCentro-y, 255, 0, 0, 255);
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
        mudarCorPixel(xCentro+x, yCentro+y, 255, 0, 0, 255);
        mudarCorPixel(xCentro+y, yCentro+x, 255, 0, 0, 255);
        mudarCorPixel(xCentro-y, yCentro+x, 255, 0, 0, 255);
        mudarCorPixel(xCentro-x, yCentro+y, 255, 0, 0, 255);
        mudarCorPixel(xCentro-x, yCentro-y, 255, 0, 0, 255);
        mudarCorPixel(xCentro-y, yCentro-x, 255, 0, 0, 255);
        mudarCorPixel(xCentro+y, yCentro-x, 255, 0, 0, 255);
        mudarCorPixel(xCentro+x, yCentro-y, 255, 0, 0, 255);
    }
}

function desenharCircunferencia(coordenadas){
    let xCentro, yCentro, x1, y1, r, y, x, xn, cos1, sen1 = 0;
    y1 = coordenadas.pop();
    x1 = coordenadas.pop();
    yCentro = coordenadas.pop();
    xCentro = coordenadas.pop();
    
    r = raio(xCentro, yCentro, x1, y1);

    cos1 = Math.cos(1);
    sen1 = Math.sin(1);
    x = r;
    console.log(x);
    for(let i = 0; i < 360; i++){
        xn = x * cos1 - y * sen1;
        y = x * sen1 + y * cos1;
        x = xn;
        
        mudarCorPixel(xCentro+x, yCentro+y, 255, 0, 0, 255);
    }

}

export{desenharCirculoEquacao, desenharCircunfereciaParametrica, desenharCircunferencia};