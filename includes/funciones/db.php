<?php 
//conexión a la base de datos

define('DB_USUARIO','root');
define('DB_PASSWORD','');
define('DB_HOST', 'localhost');
define('DB_NOMBRE','agendaphp');

$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NOMBRE);//solo con mysql
//en mysqli hay un quinto parametro opcional que es el puerto en el cual está corriendo la base de datos
//echo $conn->ping();//para revisar la conexión correcta de la base de datos


?>