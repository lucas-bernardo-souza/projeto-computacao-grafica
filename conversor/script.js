const hslParaRgbButton = document.getElementById("hsl-rgb");
const rgbParaHslButton = document.getElementById("rgb-hsl");

hslParaRgbButton.addEventListener("click", converterHslParaRgb);
rgbParaHslButton.addEventListener("click", converterRgbParaHsl);

function converterRgbParaHsl(){
    let hsl;
    let rgb;

    rgb = capturarEntradaRGB();

    hsl = rgbParaHsl(rgb[0], rgb[1], rgb[2]);

    mostrarResultadoHSL(hsl[0], hsl[1], hsl[2]);

    alteraCor(rgb[0], rgb[1], rgb[2]);

    //addColor();
}

function converterHslParaRgb(){
    let hsl;
    let rgb;

    hsl = capturarEntradaHSL();
    
    rgb = hslParaRgb(hsl[0], hsl[1], hsl[2]);

    mostrarResultadoRGB(rgb[0], rgb[1], rgb[2]);

    alteraCor(rgb[0], rgb[1], rgb[2]);
}

/*
function addColor(){
    const colorInput = document.createElement('div');
    const label = document.createElement('label');
    const br = document.createElement('br');
    colorInput.type = 'color';
    let rgb =  entradasRgb[entradasRgb.length - 1];
    label.innerText = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    colorInput.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    colorInput.id = 'cor-1';
    document.getElementById('cor').appendChild(colorInput);
    document.getElementById('cor').appendChild(label);
    document.getElementById('cor').appendChild(br);
}

*/

function capturarEntradaHSL(){
    hue = document.getElementById("h").value;
    saturation = document.getElementById("s").value;
    lightnes = document.getElementById("l").value;
    // retorna um array
    return [hue, saturation, lightnes];
}

function capturarEntradaRGB(){
    r = document.getElementById("r").value;
    g = document.getElementById("g").value;
    b = document.getElementById("b").value;
    return [r, g, b];
}

function mostrarResultadoRGB(r, g, b){
    
    document.getElementById("r").value = r;
    document.getElementById("g").value = g;
    document.getElementById("b").value = b;
    return;
}

function mostrarResultadoHSL(h, s, l){
    document.getElementById("h").value = h;
    document.getElementById("s").value = s;
    document.getElementById("l").value = l;
    return;
}

function alteraCor(r, g, b){
    let fundo = document.querySelector("body");
    fundo.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function hslParaRgb(hue,saturation,lightness){

    // Normalização da saturação e luminosidade
    hue /= 239;
    hue *= 360;
    saturation /= 240;
    lightness /= 240;

    // Cálculo da cor intermediária
    // chroma determina a intensidade da cor
    let chroma = (1 - Math.abs(2 * lightness -1)) * saturation;
    // x é uma cor intermediária
    let x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
    // m é o ajuste de luminosidade
    let m = lightness - chroma / 2;

    let r = 0, g = 0, b = 0;

    if(0 <= hue && hue < 60){
        r = chroma; g = x; b = 0;
    } else if(60 <= hue && hue < 120){
        r = x; g = chroma; b = 0;
    } else if(120 <= hue && hue < 180){
        r = 0; g = chroma; b = x;
    } else if (180 <= hue && hue < 240){
        r = 0; g = x; b = chroma;
    } else if(240 <= hue && hue < 300){
        r = x; g = 0; b = chroma;
    } else if(300 <= hue && hue < 360){
        r = chroma; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    
    // Retorna um array
    return [r, g, b];
}

function rgbParaHsl(red, green, blue){
    red /= 255;
    green /= 255;
    blue /= 255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);
    let delta = max - min;

    // Calculo da luminosidade
    let lightnes = (max + min) / 2

    let hue = 0;
    let saturation = 0;

    // Calculo da Saturação
    if (delta !== 0) {
        saturation = lightnes > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    }

    // Cálculo da Matiz
    if (delta !== 0) {
        if (max === red) {
            hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
        } else if (max === green) {
            hue = ((blue - red) / delta + 2) * 60;
        } else if (max === blue) {
            hue = ((red - green) / delta + 4) * 60;
        }
    }

    hue = Math.round(hue / 360 * 239);
    saturation = Math.round(saturation * 240);
    lightnes = Math.round(lightnes * 240);

    return [hue, saturation, lightnes];
}