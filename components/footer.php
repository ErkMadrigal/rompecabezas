<!-- Bootstrap Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
</script>
<script src="js/app.js"></script>
<?php if( isset( $scripts ) ) : ?>
<?php foreach( $scripts as $script ) : ?>
<script src="<?=$script;?>"></script>
<?php endforeach;?>
<?php endif;?>

</body>

</html>