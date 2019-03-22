<div class="campos"><!--contenedor para flexbox-->
        <div class="campo">
        
        
        <label for="nombre">Nombre: </label>
        <input type="text" name="nombre" id="nombre" placeholder ="Nombre Contacto" value = "<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] : ''; ?>" ><!--un if en una sola linea: si existe $contacto['nombre'] muestralo, en caso contrario no muestres nada -->
        
        </div>
        <div class="campo">
        
        
        <label for="empresa">Empresa: </label>
        <input type="text" name="empresa" id="empresa" placeholder ="Nombre Empresa" value = "<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : ''; ?>">
        
        </div>
        <div class="campo">
        
        
        <label for="telefono">Telefono: </label>
        <input type="tel" name="telefono" id="telefono" placeholder ="Teléfono" value = "<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : ''; ?>">
        
        
        
    </div><!--.campos-->

    </div>
        <div class="enviar campo">
        <?php $textoBtn =  (isset($contacto['nombre'])) ? "Guardar" : "Añadir";
        $accion = (isset($contacto['nombre'])) ? "editar" : "crear"; 
        ?>
            <input type="hidden" value = "<?php echo $accion; ?>" id = "accion" >
            <?php 
            if (isset($contacto['id'])) {?>
                 <input type="hidden" value = "<?php echo $contacto['id']; ?>" id = "id" >
            <?php } ?> 
            <input type="submit" value="<?php echo $textoBtn; ?>">
        </div>