let ruletaGirando = false;
let anguloFinal = 0;

document.getElementById('girar').addEventListener('click', function() {
    if (!ruletaGirando) {
        ruletaGirando = true;
        const ruleta = document.getElementById('ruleta');
        const angulo = Math.floor(Math.random() * 360) + 3600; // Gira al menos 10 vueltas
        ruleta.style.transition = 'transform 5s cubic-bezier(0.1, 0.57, 0.1, 1)';
        ruleta.style.transform = `rotate(${angulo}deg)`;
        anguloFinal = angulo % 360; // Calcula el ángulo final

        ruleta.addEventListener('transitionend', function() {
            ruletaGirando = false;
            determinarSector(anguloFinal);
        }, { once: true });
    }
});

document.getElementById('detener').addEventListener('click', function() {
    if (ruletaGirando) {
        const ruleta = document.getElementById('ruleta');
        const computedStyle = window.getComputedStyle(ruleta);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        const currentRotation = Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI);
        anguloFinal = currentRotation % 360; // Calcula el ángulo actual

        if (anguloFinal < 0) {
            anguloFinal += 360;
        }

        ruleta.style.transition = 'none';
        ruleta.style.transform = `rotate(${anguloFinal}deg)`;
        ruletaGirando = false;
        determinarSector(anguloFinal);
    }
});

document.getElementById('reiniciar').addEventListener('click', function() {
    const ruleta = document.getElementById('ruleta');
    ruleta.style.transition = 'none';
    ruleta.style.transform = 'rotate(0deg)';
    document.getElementById('resultado').textContent = '';
    ruletaGirando = false;
});

function determinarSector(angulo) {
    let sectorSeleccionado;
    const ajusteAngulo = (angulo + 180) % 360; // Ajusta el ángulo para que la flecha apunte correctamente desde abajo

    // Determina el sector según el ángulo ajustado
    if (ajusteAngulo >= 0 && ajusteAngulo < 60) {
        sectorSeleccionado = 1;
    } else if (ajusteAngulo >= 60 && ajusteAngulo < 120) {
        sectorSeleccionado = 2;
    } else if (ajusteAngulo >= 120 && ajusteAngulo < 180) {
        sectorSeleccionado = 3;
    } else if (ajusteAngulo >= 180 && ajusteAngulo < 240) {
        sectorSeleccionado = 4;
    } else if (ajusteAngulo >= 240 && ajusteAngulo < 300) {
        sectorSeleccionado = 5;
    } else if (ajusteAngulo >= 300 && ajusteAngulo < 360) {
        sectorSeleccionado = 6;
    }

    // Muestra el resultado
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Resultado: Sector ${sectorSeleccionado}`;
}

