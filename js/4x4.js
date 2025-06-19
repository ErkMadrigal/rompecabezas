const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const timerElement = document.getElementById("timer");
let hasWon = false;
let startTime;
let timerInterval;
const url = 'http://localhost/puzzle/api/'; // URL de ejemplo para enviar el formulario


const size = 4;
const total = size * size;
let positions = Array.from({ length: total }, (_, i) => i).sort(() => Math.random() - 0.5);

// Función para formatear el tiempo en minutos:segundos
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Iniciar el temporizador
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = `Tiempo: ${formatTime(elapsedSeconds)}`;
    }, 1000);
}

// Detener el temporizador
function stopTimer() {
    clearInterval(timerInterval);
}

function createPiece(pos) {
    const div = document.createElement("div");
    div.className = "piece";
    div.dataset.pos = pos;

    const col = pos % size;
    const row = Math.floor(pos / size);

    div.style.backgroundPosition = `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`;
    return div;
}

function render() {
    container.innerHTML = "";
    positions.forEach(pos => {
        container.appendChild(createPiece(pos));
    });
    addDragEvents();
}

(() => { 
    if (localStorage.getItem('client_id') === null || localStorage.getItem('respuesta_id') === null) { 
        window.location.href = 'registro';
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            opcion: 'getEtapa',
            idCliente: localStorage.getItem('client_id'),
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    })
        .then(data => {
        
        link(data.data.etapa);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        // Toast.fire({
        //     icon: "error",
        //     title: "Ocurrió un error al enviar los datos"
        // });
    });
})();

const link = (etapa) => {
    switch (etapa) {
        case 0:
            // Si la etapa es 0, redirigir a la página de inicio
            if (localStorage.getItem('client_id') === null || localStorage.getItem('respuesta_id') === null) { 
                window.location.href = 'index';
            } 
            break;
        case 1:
            // Si la etapa es 1, redirigir a la página del primer nivel
            window.location.href = 'second';
            break;
        case 2:
            // Si la etapa es 2, iniciar el juego del segundo nivel
            window.location.href = 'final';
            break;
        default:
            console.error('Etapa no reconocida:', data.etapa);
    }
}


function swap(i, j) {
    [positions[i], positions[j]] = [positions[j], positions[i]];
    render();
    checkWin();
}

function checkWin() {
    const isCorrect = positions.every((val, idx) => val === idx);
    if (isCorrect && !hasWon) {
        stopTimer();
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        // message.textContent = "🎉 ¡Puzzle completado!";
        // formatTime(elapsedSeconds)
       
        
        Swal.fire({
            icon: "success",
            title: "Felicidades 🎉",
            text: "¡has completado el primer nivel del juego!",
            confirmButtonText: "Continuar"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        opcion: 'asignarRespuesta',
                        respuesta: formatTime(elapsedSeconds),
                        idCliente: localStorage.getItem('client_id'),
                        idRespuesta: localStorage.getItem('respuesta_id'),
                        tipoRespuesta: 1
                    })
                })
                .then(response => {
                    if (response.ok) {
                        // Redirige a la siguiente página si todo va bien
                        window.location.href = 'second';
                    } else {
                        throw new Error('Error en la respuesta del servidor');
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    Toast.fire({
                        icon: "error",
                        title: "Ocurrió un error al enviar los datos"
                    });
                });
            }
        });
        hasWon = true;
    } else if (!isCorrect) {
        message.textContent = "";
        hasWon = false;
    }
}

function addDragEvents() {
    const pieces = Array.from(container.children);

    pieces.forEach((piece, index) => {
        let dragged = null;
        let startX, startY;

        const start = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;

            dragged = piece.cloneNode(true);
            dragged.classList.add("dragged");

            dragged.style.backgroundPosition = piece.style.backgroundPosition;
            dragged.style.left = `${touch.clientX - piece.offsetWidth / 2}px`;
            dragged.style.top = `${touch.clientY - piece.offsetHeight / 2}px`;
            document.body.appendChild(dragged);

            document.addEventListener("mousemove", move);
            document.addEventListener("touchmove", move, { passive: false });
            document.addEventListener("mouseup", end);
            document.addEventListener("touchend", end);
        };

        const move = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            if (dragged) {
                dragged.style.left = `${touch.clientX - dragged.offsetWidth / 2}px`;
                dragged.style.top = `${touch.clientY - dragged.offsetHeight / 2}px`;
            }
        };

        const end = (e) => {
            e.preventDefault();
            const touch = e.changedTouches ? e.changedTouches[0] : e;

            const endX = touch.clientX;
            const endY = touch.clientY;
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 30) {
                const target = document.elementFromPoint(endX, endY);
                if (target && target.classList.contains("piece")) {
                    const targetIndex = pieces.indexOf(target);
                    if (targetIndex !== -1 && index !== targetIndex) {
                        swap(index, targetIndex);
                    }
                }
            }

            if (dragged) {
                dragged.remove();
                dragged = null;
            }

            document.removeEventListener("mousemove", move);
            document.removeEventListener("touchmove", move);
            document.removeEventListener("mouseup", end);
            document.removeEventListener("touchend", end);
        };

        piece.addEventListener("mousedown", start);
        piece.addEventListener("touchstart", start, { passive: false });
    });
}

// Iniciar el juego
render();
startTimer();