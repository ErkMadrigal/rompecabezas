const container = document.getElementById("puzzle-container");
        const message = document.getElementById("message");
        const timerElement = document.getElementById("timer");
        let hasWon = false;
        let startTime;
        let timerInterval;

        const size = 6; // Cambiado a 6x6
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
                message.textContent = "🎉 ¡Puzzle completado!";
                setTimeout(() => {
                    alert(`¡Felicidades! Has completado el puzzle correctamente.\nTiempo: ${formatTime(elapsedSeconds)}`);
                }, 300);
                 window.location.href = `final`;

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