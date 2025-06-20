<?php $links = ['https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css', './css/style_4x4.css']; ?>
<?php include "./components/nav.php"?>

<main class="">
    <div class="text-center mt-5">&nbsp;</div>
    <div class="d-grid gap-2 col-11 mx-auto">
        <h1 class="text-center mt-5 mb-3 gradient-text">Comencemos</h1>
        <strong class="text-center text-white mb-4">Resuelve el rompecabezas para desbloquear
            el siguiente nivel</strong>
    </div>
    <div class="d-grid gap-2 col-11 mx-auto">
        <div class="card glass-card">
            <div class="card-body text-center">
                <div id="timer" class="d-none">Tiempo: 00:00</div>
                <div id="puzzle-container"></div>
                <p id="message"></p>
            </div>
        </div>
    </div>


    <small class="text-center text-white d-block mt-5 mb-3">
        La promoción estará vigente desde el 15 de junio hasta el 25 de julio, únicamente en México.
        Copyright© 1995-2025 Samsung. Todos los derechos reservados.
    </small>
</main>
<?php  $scripts = ['https://cdn.jsdelivr.net/npm/sweetalert2@11', './js/4x4.js']?>
<?php include "./components/footer.php"?>