package com.ricardo.escuela_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.escuela_backend.model.Asistencia;
import com.ricardo.escuela_backend.repository.AsistenciaRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/asistencias") 
public class AsistenciaController {
    
    @Autowired //inyección de dependencia
    private AsistenciaRepository asistenciaRepository;

    @GetMapping
    public List<Asistencia> listarAsistencias() {
        return asistenciaRepository.findAll();
    }

    @PostMapping 
    public Asistencia crearAsistencia(@RequestBody Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }
    
    @DeleteMapping("/{id}")
    public void eliminarAsistencia(@PathVariable Long id) {
        asistenciaRepository.deleteById(id);
    }

}
