//sintaxis reciente
const formularioContactos = document.querySelector('#contacto'),
listadoContactos = document.querySelector('#listado-contactos tbody');
inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    //cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);

    //Listener para eliminar el boton
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }
    //listener para input buscador
    inputBuscador.addEventListener('input', buscarContactos);

    numeroContactos();

}

function leerFormulario(e) {
    e.preventDefault();//es recomendable siempre que se realice una operacion con javascript o ajax
    //leer los datos de los inputs

    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value;//captura el valor del input nombre
        accion = document.querySelector('#accion').value;

    if (nombre == '' || empresa == '' || telefono == '') {
        //dos parametros : texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        
    }else{
        //pasa la validación, crear llamado ajax
        const infoContacto = new FormData();//forma para leer datos de un formulario
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
        //console.log(...infoContacto);//con los ... puedo acceder a los valores almacenados en el objeto FormData()
        
        if (accion === 'crear') {
            //crearemos un nuevo contacto 
            insertarDB(infoContacto);
        }else{
            //editar el contacto
            //leer el id 
            const idRegistro = document.querySelector("#id").value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}  
    //funcion de insercion a la base de datos via AJAX

function insertarDB(datos) {
    //llamado AJAX

    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexión 
    xhr.open('POST','includes/modelos/modelo-contactos.php', true);
    //pasar los datos
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));//JSON.parse lo convierte en un objeto

            //leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            
            //inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');
            //inserta los elementos de la tabla accediendo a ellos y utilizando el metodo de concatenacion templateString
            nuevoContacto.innerHTML = `<td>${respuesta.datos.nombre}</td>
            <td>${respuesta.datos.empresa}</td>
            <td>${respuesta.datos.telefono}</td>
            `;

            //crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //crear el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('far', 'fa-edit');

            //crear el enlace para el boton editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('far', 'fa-trash-alt');

            //crear el enlace para el boton editar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            //btnEditar.href = `editar.php?id=${respuestas.datos.id_insertado}`;
            btnEliminar.classList.add('btn', 'btn-borrar');
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            
            //agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);
            //agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //agregarlo con los contactos 
            listadoContactos.appendChild(nuevoContacto);

            //resetear el form 
            document.querySelector('form').reset();//

            //mostrar la notificacion
            mostrarNotificacion('Contacto agregado correctamente', 'correcto');
            
            numeroContactos();
        } 
    }
    //enviar los datos
    xhr.send(datos);//datos post
}

//funcion para editar y actualizar el registro del contacto
function actualizarRegistro(datos) {
    //crear el objeto
    xhr = new XMLHttpRequest();

    //abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);
    //leer la respuesta
    xhr.onload = function(){
        if (this.status == 200) {
            const respuesta = JSON.parse(xhr.responseText);
        
            if (respuesta.respuesta === 'correcto') {
                mostrarNotificacion('Contacto editado correctamente', 'correcto');
            } else {
                mostrarNotificacion('Hubo un error','error');
            }
            //despues de 3 segundos redireccionar al index
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);

        }
    }

    //enviar la petición

    xhr.send(datos);
}

function eliminarContacto(e) {
    //console.log(e.target.parentElement.classList.contains('btn-borrar'));//te reporta a que elemento diste click y realizando traversing de DOM con parentElemento nos vamos del hijo hacia el padre
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        const id = e.target.parentElement.getAttribute('data-id');//retorna el id el contacto asociado
        
        //preguntar al usuario si está seguro
        const confirmacion = confirm('¿Estás seguro(a)?');
       
        if (confirmacion) {
            //llamado de ajax
            
            //crear el objeto
            xhr = new XMLHttpRequest();
            //abrir la conexion
            xhr.open('GET',`includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);//se utiliza get porque vamos a extraer datos
            //leer la respuesta
            xhr.onload = function () {
                if(this.status === 200){
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta === 'correcto') {
                        //eliminar registro del DOM

                        
                        e.target.parentElement.parentElement.parentElement.remove();
                        //mostrar notificacion
                        mostrarNotificacion('Contacto eliminado', 'correcto')
                        numeroContactos();
                    } else {
                        mostrarNotificacion('Hubo un error', 'error')
                    }
                }
            }
            //enviar la respuesta
            xhr.send();
        }
        
        //console.log(id);
    }
}
//notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //ocultar y mostrar la notificacion
    setTimeout(() =>{
        notificacion.classList.add('visible');//agrega una clase
        setTimeout(() => {
            notificacion.classList.remove('visible');//remueve la clase
            setTimeout(() =>{
                notificacion.remove();
            },500);
                
        }, 3000);
    }, 100);
}

//funcion para buscar contactos
function buscarContactos(e) {
    //console.log(e.target.value);//captura el valor del imput al escribir
    const expresion = new RegExp(e.target.value, "i");//la i es para que ignore si es mayuscula o minuscula la busqueda
        registros = document.querySelectorAll('tbody tr');

        registros.forEach(registro => {
            registro.style.display = 'none';

            //console.log(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) !=-1);//muestra los nodos asociados al registro con el 1 filta los nombres
            if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) !=-1) {//replace(/\s/g, " ") para reconocer el espacio y reemplazarlo 
                registro.style.display = 'table-row';
                
            }
            numeroContactos();//es necesario llamar la función por fuera del if
            //para que actualice directamente el numero de contactos en el span
        });
}

//funcion para contar y mostrar el numero de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
         contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
         if(contacto.style.display === '' || contacto.style.display === 'table-row'){
              total++;
         }
    });

    // console.log(total);
    contenedorNumero.textContent = total;
}