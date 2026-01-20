// Apuntamos al endpoint de CURSOS
const API_URL = "http://localhost:9090/cursos";
let idEditar = null;

// Función para cargar y mostrar los cursos
async function cargarCursos() {
    try {
        // Obtener los cursos desde el servidor
        const respuesta = await fetch(API_URL);
        const cursos = await respuesta.json();
        
        // Limpiar la tabla antes de agregar los cursos
        const tablaBody = document.getElementById("tablaCursos");
        tablaBody.innerHTML = ""; 

        // Agregar cada curso a la tabla
        cursos.forEach(curso => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${curso.id}</td>
                <td>${curso.nombre}</td>
                <td>
                  <button class="btn-accion btn-editar" onclick="llenarFormulario(${curso.id})">✏️</button>
                <button class="btn-accion btn-eliminar" onclick="eliminarCurso(${curso.id})">🗑️</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error cargando cursos:", error);
    }
}
    //3. FUNCIÓN NUEVA: Llenar el formulario para editar
async function llenarFormulario(id) {
    // Buscamos los datos del curso en el backend
    const respuesta = await fetch(`${API_URL}/${id}`);
    const curso = await respuesta.json();

    //rellenamos los campos( solo hay uno) 
    document.getElementById("nombre").value = curso.nombre;

    // Cambiamos el estado a "Modo Edición"
    idEditar = id;

    // Cambiamos el texto del botón visualmente
    idEditar = id;
    const boton = document.querySelector("#cursoForm button");
    boton.textContent = "Actualizar Curso";
    boton.style.backgroundColor = "#ffc107"; // Amarillo
}

// 4. Manejar el envío del formulario para agregar un nuevo curso
document.getElementById("cursoForm").addEventListener("submit", async (evento) => {
    evento.preventDefault(); 

    const datosCurso = {
        nombre: document.getElementById("nombre").value
    };

    try {
        let respuesta;

        if (idEditar === null) {
            // CREAR (POST)
            respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCurso)
            });
        } else {
            // EDITAR (PUT)
            respuesta = await fetch(`${API_URL}/${idEditar}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCurso)
            });

            // Limpiar modo edición
            idEditar = null;
            const boton = document.querySelector("#cursoForm button");
            boton.textContent = "Guardar Curso";
            boton.style.backgroundColor = ""; 
        }

        if (respuesta.ok) {
            document.getElementById("cursoForm").reset();
            cargarCursos();
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
 // Función para eliminar un curso
async function eliminarCurso(id) {
    if (confirm("¿Borrar curso?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarCursos();
    }
}
// Cargar los cursos al iniciar la página
cargarCursos();