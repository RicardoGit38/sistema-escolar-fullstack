package com.ricardo.escuela_backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.escuela_backend.model.Curso;
import com.ricardo.escuela_backend.services.CursoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/cursos") //nueva ruta base para cursos
public class CursoController { 
    
    @Autowired //inyección de dependencia del servicio de curso
    
    private CursoService cursoService; 

    
    @GetMapping //mapeo para obtener todos los cursos
    public List<Curso> listaCursos(){
        return cursoService.obtenerTodos();
    }

    //mapeo para crear un nuevo curso
    @PostMapping
    public Curso creaCurso(@RequestBody Curso curso) {
        return cursoService.guardar(curso);
    }

    //mapeo para eliminar curso por id
    @DeleteMapping("/{id}")//
    public void eliminaCurso(@PathVariable Long id) {
        cursoService.eliminarCurso(id);
    }
    

}
