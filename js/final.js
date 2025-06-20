let btnFinal = document.getElementById("btnFinal");
const url = 'http://localhost/puzzle/api/'; // URL de ejemplo para enviar el formulario
let tiempo = document.getElementById("tiempo");

btnFinal.onclick = () => { 
    fin();

    localStorage.removeItem('respuesta_id');
    localStorage.removeItem('client_id');
    let timerInterval;
    Swal.fire({
        title: "¡Felicidades!",
        html: "has completado el juego <br> Reiniciando datos para un nuevo inicio <b></b>.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            // window.location.href = 'index';
            window.parent.location.href = 'https://www.samsung.com/mx/'

        }
    });
}

(() => { 
    if (localStorage.getItem('client_id') === null || localStorage.getItem('respuesta_id') === null) { 
        window.location.href = 'index';
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            opcion: 'gettiempo',
            idCliente: localStorage.getItem('client_id'),
            idRespuesta: localStorage.getItem('respuesta_id'),
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
        const total = sumarTiemposEnMinutosYSegundos(data.data.respuesta1, data.data.respuesta2);
        tiempo.textContent = `${total}`;
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        // Toast.fire({
        //     icon: "error",
        //     title: "Ocurrió un error al enviar los datos"
        // });
    });
})();

const sumarTiemposEnMinutosYSegundos = (tiempo1, tiempo2) => {
    const [m1, s1] = tiempo1.split(':').map(Number);
    const [m2, s2] = tiempo2.split(':').map(Number);

    let minutos = m1 + m2;
    let segundos = s1 + s2;

    if (segundos >= 60) {
        minutos += Math.floor(segundos / 60);
        segundos = segundos % 60;
    }

    return `${minutos} min ${segundos} seg`;
}
  
const fin = () => { 
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            opcion: 'setFinalizar',
            idCliente: localStorage.getItem('client_id'),
            idRespuesta: localStorage.getItem('respuesta_id'),
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
        if (data.status === 'success') {
            console.log('Datos enviados correctamente');
        } else {
            console.error('Error al enviar los datos:', data.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}