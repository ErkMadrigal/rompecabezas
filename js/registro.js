document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el formulario
    const form = document.querySelector('.needs-validation');
    const url = 'http://promosamsung.mx/api/'; // URL de ejemplo para enviar el formulario
    // Escuchar el evento submit
    form.addEventListener('submit', function(event) {
        // Prevenir el envío por defecto
        event.preventDefault();
        event.stopPropagation();
        
        // Validar campos
        const nameValid = validateName();
        const emailValid = validateEmail();
        const terminosValid = validateCheckbox('terminosCheck');
        const avisoValid = validateCheckbox('avisoCheck');
        
        // Si todo es válido, enviar el formulario
        if (nameValid && emailValid && terminosValid && avisoValid) {
            // Aquí puedes agregar el código para enviar el formulario
            fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    opcion: 'usuarios',
                    nombre: nameValid,
                    email: emailValid,
                    terminos: terminosValid,
                    aviso: avisoValid
                })
              })
             .then(response => {
                if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                        
                    }
              })
              .then(data => {
                //   console.log('Éxito:', data);
                  Toast.fire({
                    icon: "success",
                    title: data.mensaje
                  });
                  localStorage.setItem('respuesta_id', data.last_insert_id_respuesta);
                  localStorage.setItem('client_id', data.last_insert_id_client);
                  setInterval(() => {
                    window.location.href = 'instrucciones';
                  }, 3000); // Redirigir después de 3 segundos
              })
              .catch(error => {
                  console.error('Error en la solicitud:', error);
                  Toast.fire({
                    icon: "error",
                    title: error
                });
              });
            // form.submit(); // Descomenta esta línea para enviar realmente el formulario
        }
        
        // Agregar clase de validación
        form.classList.add('was-validated');
    });
    
    (() => { 
        if (localStorage.getItem('client_id') === null || localStorage.getItem('respuesta_id') === null) { 
            return 0;
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
            // console.log('Etapa obtenida:', data.data.etapa);    
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
                if (localStorage.getItem('client_id') !== null || localStorage.getItem('respuesta_id') !== null) {
                    window.location.href = 'instrucciones';
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
    
    // Función para validar el nombre
    function validateName() {
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
            return false;
        } else {
            nameInput.classList.add('is-valid');
            nameInput.classList.remove('is-invalid');
            return nameInput.value.trim();
        }
    }
    
    // Función para validar el email
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            return false;
        } else {
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
            return emailInput.value.trim();
        }
    }
    
    // Función para validar las casillas de verificación
    function validateCheckbox(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        const isValid = checkbox.checked;
        
        if (!isValid) {
            checkbox.classList.add('is-invalid');
            checkbox.classList.remove('is-valid');
            // También puedes mostrar el feedback aquí si lo prefieres
            return false;
        } else {
            checkbox.classList.add('is-valid');
            checkbox.classList.remove('is-invalid');
            return true;
        }
    }
    

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

    // Validación en tiempo real (opcional)
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('terminosCheck').addEventListener('change', function() {
        validateCheckbox('terminosCheck');
    });
    document.getElementById('avisoCheck').addEventListener('change', function() {
        validateCheckbox('avisoCheck');
    });

    const bt = document.querySelector('.bt');
    const msg = document.querySelector('.msg');
    
    bt.addEventListener('touchstart', function() {
        // Reinicia la animación
        msg.style.animation = 'none';
        void msg.offsetWidth; // Truco para reiniciar la animación
        msg.style.animation = 'msgRun 2s forwards';
    });

        // Solo para móviles (opcional)
    if ('ontouchstart' in window) {
        document.querySelectorAll('.bt').forEach(bt => {
            bt.addEventListener('touchstart', function() {
                const msg = this.querySelector('.msg');
                msg.style.animation = 'none';
                void msg.offsetWidth;
                msg.style.animation = 'msgRun 2s forwards';
            });
        });
    }
});