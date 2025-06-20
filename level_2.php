<?php $links = ['https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css', './css/style_5x5.css']; ?>

<?php include "./components/nav.php"?>

<main class="">
    <div class="text-center mt-5">&nbsp;</div>
    <div class="d-grid gap-2 col-11 mx-auto">
        <h1 class="text-center mt-5 mb-3 gradient-text">Comencemos</h1>
        <strong class="text-center text-white mb-4">Resuelve el rompecabezas para ganar uno de los 3 Galaxy.</strong>
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
        Vigencia: Del 23 de junio (a partir de las 5:00 p.m.) al 08 de julio (hasta las 11:59 p.m.) de 2025.
    </small>
</main>
<?php  $scripts = ['https://cdn.jsdelivr.net/npm/sweetalert2@11', './js/5x5.js']?>
<?php include "./components/footer.php"?>