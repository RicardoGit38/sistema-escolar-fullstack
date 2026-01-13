// Asegúrate de que este puerto (9090) sea el mismo que sale en tu consola de Java
// cuando corres el backend
const API_URL = "http://localhost:9090/alumnos";

// Función para cargar y mostrar los alumnos
async function cargarAlumnos() {
    try {
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
                <td>${alumno.edad}</td>  <td>${alumno.email}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarAlumno(${alumno.id})">🗑️</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error cargando alumnos:", error);
    }
}

document.getElementById("alumnoForm").addEventListener("submit", async (evento) => {
    evento.preventDefault(); 

    const nuevoAlumno = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        // AQUÍ ESTÁ LA MEJORA: Usamos parseInt para asegurar que sea un número
        edad: parseInt(document.getElementById("edad").value), 
        email: document.getElementById("email").value
    };

    try {
        // ... (el resto del código sigue igual)
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoAlumno)
        });

        if (respuesta.ok) {
            document.getElementById("alumnoForm").reset();
            cargarAlumnos();
        } else {
            alert("Error al guardar");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// ... (El código de eliminar se mantiene igual) ...
async function eliminarAlumno(id) {
    if (confirm("¿Borrar alumno?")) {
    // Llamada DELETE al backend
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarAlumnos();
    }
}
// Cargar los alumnos al iniciar la página
cargarAlumnos();