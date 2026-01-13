
// Asegúrate de que este puerto (9090) sea el mismo que sale
//  en tu consola de Java cuando corres el backend
const API_URL_NOTAS = "http://localhost:9090/notas";
const API_URL_ALUMNOS = "http://localhost:9090/alumnos";
const API_URL_CURSOS = "http://localhost:9090/cursos";

// cargar selecciones de alumnos y cursos
async function cargarOpciones() {
    try {
        const [respuestaAlumnos, respuestaCursos] = await Promise.all([
            fetch(API_URL_ALUMNOS),
            fetch(API_URL_CURSOS)
        ]);
        const alumnos = await respuestaAlumnos.json();
        const cursos = await respuestaCursos.json();

        //llenar select alumnos
        const selectAlumno = document.getElementById("alumnoSelect");
        alumnos.forEach(a => {
            const opcion = document.createElement("option");
            opcion.value = a.id;
            opcion.textContent = `${a.nombre} ${a.apellido}`;
            selectAlumno.appendChild(opcion);
        });

        //llenar select cursos
        const selectCurso = document.getElementById("cursoSelect");
        cursos.forEach(c => {
            const opcion = document.createElement("option");
            opcion.value = c.id;
            opcion.textContent = c.nombre;
            selectCurso.appendChild(opcion);
        });
    } catch (error) {
        console.error("Error cargando opciones:", error);
    }
}
// 2. CARGAR TABLA DE NOTAS
async function cargarnotas() {
    try {
        const respuesta = await fetch(API_URL_NOTAS);
        listaNotas = await respuesta.json(); // Guardamos en la variable global
        
        const tablaBody = document.getElementById("tablaNotas");
        tablaBody.innerHTML = ""; 

        listaNotas.forEach(nota => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nota.id}</td>
                <td>${nota.alumno.nombre} ${nota.alumno.apellido}</td>
                <td>${nota.curso.nombre}</td>
                <td><b>${nota.valor}</b></td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarNota(${nota.id})">🗑️</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error cargando notas:", error);
    }
}


//3. cargar y mostrar notas
document.getElementById("notaForm").addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const idAlumno = document.getElementById("alumnoSelect").value;
    const idCurso = document.getElementById("cursoSelect").value;
    const valorNota = parseFloat(document.getElementById("valor").value);

    //Estructura JPA debemos enviar  objetos anidados con el id
    const nuevaNota = {
        alumno: { id: parseInt(idAlumno) },
        curso: { id: parseInt(idCurso) },
        valor: parseFloat(valorNota)
    };
    try {
        const respuesta = await fetch(API_URL_NOTAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaNota)
        });
        if (respuesta.ok) {
            cargarnotas();
            document.getElementById("valor").value = "";//reset valor
        } else {
            alert("Error al guardar la nota");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

//4. eliminar nota (opcional)
async function eliminarNota(id) {
    if (confirm("¿Borrar nota?")) {
       try {
            await fetch(`${API_URL_NOTAS}/${id}`, { method: "DELETE" });
            cargarnotas();
       } catch (error) {
            console.error("Error eliminando nota:", error);
       }
    }
}
// 5. CALCULAR PROMEDIOS POR CURSO (Lógica Matemática)
    function calcularPromedios() {
        const notasPorCurso = {};

        listaNotas.forEach(nota => {
            const nombreCurso = nota.curso.nombre;
            if (!notasPorCurso[nombreCurso]) {
                notasPorCurso[nombreCurso] = [];
            }
            notasPorCurso[nombreCurso].push(nota.valor);
        });

        //crear mensaje de alertas
        let mensaje = "Promedios por Curso:\n";
        for (const curso in notasPorCurso) {
            const notas = notasPorCurso[curso];
            const suma = notas.reduce((a, b) => a + b, 0);
            const promedio = (suma / notas.length).toFixed(2); //redondear a 2 decimales
            mensaje += `${curso}: ${promedio}\n`;

        }
        alert(mensaje);
    }
//iniciar carga de opciones al cargar la página
cargarOpciones();
cargarnotas();
