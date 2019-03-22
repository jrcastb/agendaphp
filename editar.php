<?php include_once 'includes/layout/header.php';
include_once 'includes/funciones/funciones.php'; ?>
<?php $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);//convierte el id en un entero ?>

<?php if (!$id) {
    die("No es valido el ID");
} ?>

<?php 
    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc();
?>
<div class="contenedor-barra">
    <div class="contenedor barra">
        <a class = "btn volver" href="index.php">Volver</a>
        <h1>Edición de contacto </h1>
    </div>
</div>
<div class="bg-primario contenedor sombra">
    <form action="#" id="contacto"><!--El action va vacio porque todas las inserciones a la base de datos serán por medio de AJAX-->
    <legend>Edite el contacto <span>Todos los campos son obligatorios</span></legend>
    
    <?php include_once 'includes/layout/formulario.php' ?>
    </form>
</div>
<?php include_once 'includes/layout/footer.php' ?>