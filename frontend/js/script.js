const API_URL = "http://localhost:9090/alumnos";
let idEditar = null; // VARIABLE CLAVE: Si es null, creamos. Si tiene número, editamos.

async function cargarAlumnos() {
    // ... (Esta parte es igual a antes, solo cambiamos el botón eliminar) ...
    const respuesta = await fetch(API_URL);
    const alumnos = await respuesta.json();
    const tablaBody = document.getElementById("tablaAlumnos");
    tablaBody.innerHTML = ""; 

    alumnos.forEach(alumno => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.email}</td>
            <td>
                <button class="btn-editar" style="background-color: #ffc107; border: none; padding: 5px;" 
                        onclick="llenarFormulario(${alumno.id})">✏️</button>
                
                <button class="btn-eliminar" style="background-color: #dc3545; color: white; border: none; padding: 5px;" 
                        onclick="eliminarAlumno(${alumno.id})">🗑️</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

// 2. FUNCIÓN NUEVA: Llenar el formulario para editar
async function llenarFormulario(id) {
    // Buscamos los datos del alumno en el backend
    const respuesta = await fetch(`${API_URL}/${id}`);
    const alumno = await respuesta.json();

    console.log("Datos que llegaron del Backend:", alumno);
    
    // Rellenamos los campos
    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("apellido").value = alumno.apellido;
    document.getElementById("edad").value = alumno.edad;
    document.getElementById("email").value = alumno.email;

    // Cambiamos el estado a "Modo Edición"
    idEditar = id;
    
    // Cambiamos el texto del botón visualmente
    const boton = document.querySelector("#alumnoForm button");
    boton.textContent = "Actualizar Alumno";
    boton.style.backgroundColor = "#ffc107"; // Amarillo
}

// 3. GUARDAR O ACTUALIZAR (Modificado)
document.getElementById("alumnoForm").addEventListener("submit", async (evento) => {
    evento.preventDefault(); 

    // Recopilar datos del formulario
    const datosAlumno = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: parseInt(document.getElementById("edad").value),
        email: document.getElementById("email").value
    };

    try {
        let respuesta;
        
        if (idEditar === null) {
            // MODO CREAR (POST)
            respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosAlumno)
            });
        } else {
            // MODO EDITAR (PUT)
            respuesta = await fetch(`${API_URL}/${idEditar}`, {
                method: "PUT", // <--- Verbo HTTP para actualizar
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosAlumno)
            });
            
            // Regresar a modo normal después de editar
            idEditar = null;
            const boton = document.querySelector("#alumnoForm button");
            boton.textContent = "Guardar Alumno";
            boton.style.backgroundColor = ""; // Volver al color original
        }

        if (respuesta.ok) {
            document.getElementById("alumnoForm").reset();
            cargarAlumnos();
            if (idEditar !== null) {
                mostrarModalExito("Datos actualizados correctamente");
            }
        }
    cargarAlumnos();
    cargarAlumnos();

    // Modal de éxito solo para actualización
    function mostrarModalExito(mensaje) {
        const modal = document.getElementById("modalExito");
        const span = document.getElementById("modalExitoMensaje");
        span.textContent = mensaje;
        modal.style.display = "flex";
    }

    document.addEventListener("DOMContentLoaded", () => {
        const btnCerrar = document.getElementById("btnCerrarModalExito");
        if (btnCerrar) {
            btnCerrar.onclick = function() {
                document.getElementById("modalExito").style.display = "none";
            };
        }
    });
    } catch (error) {
        console.error("Error:", error);
    }
});

async function eliminarAlumno(id) {
    if (confirm("¿Borrar alumno?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarAlumnos();
    }
}

cargarAlumnos();