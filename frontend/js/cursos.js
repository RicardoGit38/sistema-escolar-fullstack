// Apuntamos al endpoint de CURSOS
const API_URL = "http://localhost:9090/cursos";

async function cargarCursos() {// Función para cargar y mostrar los cursos
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
                    <button class="btn-eliminar" onclick="eliminarCurso(${curso.id})">🗑️</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error cargando cursos:", error);
    }
}
// Manejar el envío del formulario para agregar un nuevo curso
document.getElementById("cursoForm").addEventListener("submit", async (evento) => {
    evento.preventDefault(); 

    const nuevoCurso = {
        nombre: document.getElementById("nombre").value
    };

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoCurso)
        });

        if (respuesta.ok) {
            document.getElementById("cursoForm").reset();
            cargarCursos();
        } else {
            alert("Error al guardar curso");
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