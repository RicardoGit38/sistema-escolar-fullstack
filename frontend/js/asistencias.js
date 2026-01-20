// Define your constants here
const API_URL_ASISTENCIAS = 'http://localhost:9090/asistencias';
const API_URL_ALUMNOS = 'http://localhost:9090/alumnos';

let idEditar = null; //variable para almacenar el ID del registro que se está editando

//1. Cargar alumnos en el select
// Función para cargar los alumnos desde el servidor y llenar el select
async function cargarAlumnos() {
    const response = await fetch(API_URL_ALUMNOS);
    const alumnos = await response.json();
    const selectAlumno = document.getElementById('alumnoSelect');

    selectAlumno.innerHTML = '<option value="">Seleccione un alumno</option>';
    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.id;
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumno.appendChild(option);
    });
}

//2. Cargar Tabla de Asistencias
async function cargarAsistencias() {
    try {
        // Obtener las asistencias desde el servidor
        const res = await fetch(API_URL_ASISTENCIAS);
        const asistencias = await res.json();

        // Limpiar la tabla antes de agregar las asistencias
        const tabla = document.getElementById('tablaAsistencias');
        tabla.innerHTML = '';

        // Agregar cada asistencia a la tabla
        asistencias.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>${item.fecha}</td>
            <td>${item.alumno.nombre} ${item.alumno.apellido}</td>
            <td>${item.estado}</td>
            <td>
            <button class="btn-accion btn-editar" onclick="llenarFormulario(${item.id})">✏️</button>
                <button class="btn-accion btn-eliminar" onclick="eliminarAsistencia(${item.id})">🗑️</button> 
            </td> 

        `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error cargando asistencias:', error);
    }
}
// 3. Función para llenar el formulario con los datos de la asistencia a editar
async function llenarFormulario(id) {
    // Obtener la asistencia desde el servidor
    const res = await fetch(`${API_URL_ASISTENCIAS}/${id}`);
    const asistencia = await res.json();

    // Llenar el formulario con los datos de la asistencia
    document.getElementById("alumnoSelect").value = asistencia.alumno.id;
    document.getElementById("fecha").value = asistencia.fecha;
    document.getElementById("estado").value = asistencia.estado;

    // Cambiar a modo edición
    idEditar = id;
    const boton = document.querySelector("#asistenciaForm button");
    boton.textContent = "Actualizar Asistencia";
    boton.style.backgroundColor = "#ffc107"; // Amarillo
}

// 4. Manejar el envío del formulario para crear o editar una asistencia
document.getElementById("asistenciaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevaAsistencia = {
        alumno: { id: document.getElementById("alumnoSelect").value },
        fecha: document.getElementById("fecha").value,
        estado: document.getElementById("estado").value
    };

    try {
        let respuesta;

        if (idEditar === null) {
            // CREAR
            respuesta = await fetch(API_URL_ASISTENCIAS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaAsistencia)
            });
        } else {
            // EDITAR
            respuesta = await fetch(`${API_URL_ASISTENCIAS}/${idEditar}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaAsistencia)
            });

            // Resetear modo edición
            idEditar = null;
            const boton = document.querySelector("#asistenciaForm button");
            boton.textContent = "Guardar Asistencia";
            boton.style.backgroundColor = ""; 
        }

        if (respuesta.ok) {
            cargarAsistencias();
            // Opcional: limpiar formulario
            document.getElementById("fecha").value = "";
            document.getElementById("alumnoSelect").value = "";
        }
    } catch (error) { console.error(error); }
});

// 4. Eliminar
async function eliminarAsistencia(id) {
    if(confirm("¿Borrar?")) {
        // Eliminar la asistencia del servidor
        await fetch(`${API_URL_ASISTENCIAS}/${id}`, { method: "DELETE" });
        cargarAsistencias();
    }
}

cargarAlumnos(); // Cargar los alumnos en el select al iniciar
cargarAsistencias(); // Cargar las asistencias al iniciar la página