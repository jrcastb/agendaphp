<?php 
function obtenerContactos(){
    include 'db.php';
    try {
        return $conn ->query("SELECT id, nombre, empresa, telefono FROM contactos");
    } catch (Throwable $th) {
        echo "En la juega, error" . $th->getMessage() . "<br>" ;
        return false;
    }
}
?>

<?php 
//obtener un contacto tomando su id

function obtenerContacto($id){
    include 'db.php';
    try {
        return $conn ->query("SELECT id, nombre, empresa, telefono FROM contactos WHERE id = $id ");
    } catch (Throwable $th) {
        echo "En la juega, error" . $th->getMessage() . "<br>" ;
        return false;
    }
}

?>