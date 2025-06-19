let btnFinal = document.getElementById("btnFinal");

btnFinal.onclick = () => { 
    localStorage.removeItem('respuesta_id');
    localStorage.removeItem('client_id');
}