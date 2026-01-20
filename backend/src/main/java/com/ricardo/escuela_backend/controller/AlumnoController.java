package com.ricardo.escuela_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.escuela_backend.model.Alumno;
import com.ricardo.escuela_backend.repository.AlumnoRepository;
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

    private final AlumnoRepository alumnoRepository;

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService, AlumnoRepository alumnoRepository) {
        this.alumnoService = alumnoService;
        this.alumnoRepository = alumnoRepository;
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

    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAlumno(@PathVariable Long id) {
        boolean eliminado = alumnoService.eliminarAlumno(id);
        if (eliminado) {
            return ResponseEntity.ok("Alumno con ID " + id + " eliminado correctamente.");
        } else {
            return ResponseEntity.status(404).body("No se pudo eliminar : ID " + id + " no existe.");
        }
    }


//buscar un alumno por id para actualizar 
// 1. PARA BUSCAR (GET) - Este déjalo como está
    @GetMapping("/{id}")
    public Alumno obtenerAlumno(@PathVariable Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    // 2. PARA ACTUALIZAR (PUT) - CORRIGE ESTA LÍNEA
    @PutMapping("/{id}")  // <--- Cambia @GetMapping por @PutMapping
    public Alumno actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumno) {
        alumno.setId(id);
        return alumnoRepository.save(alumno);
    }
}