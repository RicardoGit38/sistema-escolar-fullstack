package com.ricardo.escuela_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.escuela_backend.model.Nota;
import com.ricardo.escuela_backend.repository.NotaRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/notas") //localhost:8080/notas
public class NotaController {
    
    @Autowired
    private NotaRepository notaRepository;

    @GetMapping //listar todas las notas
    public List<Nota> listarNotas(){
        return notaRepository.findAll();
    }
    @PostMapping
    public Nota guardarNota(@RequestBody Nota nota){
     //Spring Boot es inteligente: Si le mandas el ID del alumno y del curso,
     // él hace la conexión automática.
        return notaRepository.save(nota);
    }
    // ... tus otros métodos ...

    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        notaRepository.deleteById(id);
    }


    @GetMapping("/{id}")
    public Nota obtenerNota(@PathVariable Long id) {
        return notaRepository.findById(id).orElse(null);
    }
    @PutMapping("/{id}")    
    public Nota actualizarNota(@PathVariable Long id, @RequestBody Nota nota) {
        nota.setId(id);
        return notaRepository.save(nota);
    }

}