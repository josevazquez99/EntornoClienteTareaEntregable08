// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
// creamos un array para almacenar los cursos
let articulosCarrito = [];

// Eventos
cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas cosas al Carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar cosas del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciamos el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reseteamos el array
        limpiarHTML(); // Eliminamos todo el HTML
    });
}

// Funcion para agregar cosas
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Funcion para eliminar cosas del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminamos del array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Iteramos sobre el carrito y mostrar su HTML
    }
}

// Leemos el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
    // Creamos un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisamos si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

// Mostramos el carrito de compras en el HTML
function carritoHTML() {

    // Limpiamos el HTML
    limpiarHTML();

    // Recorremos el carrito
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
