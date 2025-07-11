<?php $links = ['https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css']; ?>
<?php include "./components/nav.php"?>

<main class="">
    <div class="text-center mt-5">&nbsp;</div>
    <div class="d-grid gap-2 col-8 mx-auto">
        <h1 class="text-center mt-5 mb-3 gradient-text">Regístrate para participar</h1>
    </div>
    <div class="d-grid gap-2 col-10 mx-auto">
        <div class="card glass-card">
            <div class="card-body">
                <form class="row g-3 needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="name" class="form-label text-white">Nombre</label>
                        <input type="text" class="form-control form-control-lg color-input" id="name" name="name"
                            required>
                        <div class="invalid-feedback">
                            Es requerido el nombre
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label text-white">Correo</label>
                        <input type="email" class="form-control form-control-lg color-input" id="email" name="email"
                            required>
                        <div class="invalid-feedback">
                            Es requerido el correo
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-sm-4">
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="terminosCheck">
                                <label class="form-check-label" for="exampleCheck1"><a
                                        href="https://www.samsung.com/mx/info/terms-and-conditions"
                                        target="_blank">Términos y
                                        condiciones</a></label>
                                <div class="invalid-feedback">
                                    Es requerido aceptar los terminos
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-4">
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="avisoCheck">
                                <label class="form-check-label" for="exampleCheck1"><a
                                        href="https://www.samsung.com/mx/info/privacy/" target="_blank">Aviso de
                                        privacidad</a></label>
                                <div class="invalid-feedback">
                                    Es requerido aceptar el aviso de privacidad
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 text-center">
                        <button class="bt" id="bt">
                            <span class="msg" id="msg"></span>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <small class="text-center text-white d-block mt-5 mb-3">
        Vigencia: Del 23 de junio (a partir de las 5:00 p.m.) al 08 de julio (hasta las 11:59 p.m.) de 2025.
    </small>
</main>
<?php $scripts = ['https://cdn.jsdelivr.net/npm/sweetalert2@11','js/registro.js'];?>
<?php include "./components/footer.php"?>