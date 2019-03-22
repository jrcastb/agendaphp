<?php include 'includes/funciones/funciones.php'; ?>
<?php include_once 'includes/layout/header.php'; ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos </h1>
</div>

<div class="bg-primario contenedor sombra">
    <form action="#" id="contacto"><!--El action va vacio porque todas las inserciones a la base de datos serán por medio de AJAX-->
    <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
    
    <?php include_once 'includes/layout/formulario.php'; ?>
    </form>
</div><!--.bg-primario .contenedor-->

<div class="bg-secundario contenedor sombra contactos">

    <div class="contenedor-contactos">
    <h2>Contactos</h2>

        <input type="text" name="buscar" id="buscar" class ="buscador sombra" placeholder = "Buscar contactos">
        <p class="total-contactos"><span>2</span> Contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $contactos = obtenerContactos();
                        if ($contactos->num_rows): 
                            foreach ($contactos as $contacto): ?>
                            <tr>
                                
                                <td><?php echo $contacto['nombre'];  ?> </td>
                                <td><?php echo $contacto['empresa']; ?></td>
                                <td><?php echo $contacto['telefono']; ?></td>
                                <td><a class = "btn-editar btn" href="editar.php?id=<?php echo $contacto['id']; ?>"><i class="far fa-edit"></i></a>
                                <!--data-#id es una propiedad creada -->
                                <button data-id="<?php echo $contacto['id']; ?>" type = "button" class = "btn-borrar btn"><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                    
                        <?php   endforeach; 
                        endif; ?> 
                    
                    
                </tbody>
            </table>    
        </div>
    </div>

</div><!--.bg-secundario .contenedor .contactos-->

<?php include_once 'includes/layout/footer.php' ?>