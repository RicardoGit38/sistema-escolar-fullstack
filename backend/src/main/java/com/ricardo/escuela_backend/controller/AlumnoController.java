package com.ricardo.escuela_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.escuela_backend.model.Alumno;
import com.ricardo.escuela_backend.services.AlumnoService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/alumnos")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public List<Alumno> obtenerTodos() {
        return alumnoService.obtenerTodos();
    }

    @PostMapping
    public String guardar(@RequestBody Alumno alumno) {
        alumnoService.guardar(alumno);
        return "Alumno " + alumno.getNombre() + " guardado correctamente";
    }

    @PutMapping("/{id}")
    public String actualizar(@PathVariable Long id, @RequestBody Alumno alumnoDetalles) {
        Alumno alumnoActualizado = alumnoService.actualizarAlumno(id, alumnoDetalles);
        if (alumnoActualizado != null) {
            return "El alumno con ID " + id + " fue actualizado correctamente.";
        } else {
            return "No se encontró el alumno con ID " + id + " para actualizar.";
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAlumno(@PathVariable Long id) {
        boolean eliminado = alumnoService.eliminarAlumno(id);
        if (eliminado) {
            return ResponseEntity.ok("Alumno con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar : ID " + id + " no existe.");
        }
    }
}
