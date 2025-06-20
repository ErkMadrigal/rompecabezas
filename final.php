<?php $links = ['https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css']; ?>

<?php include "./components/nav.php"?>

<main class="mx-auto">
    <div class="text-center mt-5">&nbsp;</div>
    <div class="d-grid gap-2 col-8 mx-auto">
        <h1 class="text-center mt-5 mb-3 gradient-text">¡Gracias por participar!</h1>
        <strong class="text-center text-white mb-4">¡Tu tiempo fue de <b id="tiempo"></b>!
            Pronto sabrás si eres uno de los 3
            ganadores del nuevo Galaxy.</strong>
    </div>
    <div class="mb-3 mt-5 text-center">
        <button class="btn-final mt-5 mb-5" id="btnFinal">
            Conoce más
        </button>
    </div>

    <small class="text-center text-white d-block mt-5 mb-3">
        La promoción estará vigente desde el 15 de junio hasta el 25 de julio, únicamente en México.
        Copyright© 1995-2025 Samsung. Todos los derechos reservados.
    </small>
</main>
<?php $scripts = ['https://cdn.jsdelivr.net/npm/sweetalert2@11',"js/final.js"]; ?>
<?php include "./components/footer.php"?>