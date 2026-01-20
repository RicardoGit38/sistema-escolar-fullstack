package com.ricardo.escuela_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ricardo.escuela_backend.repository.CursoRepository;
import com.ricardo.escuela_backend.model.Curso;

@Service
public class CursoService {
    
    // Implementa la lógica del servicio para Curso aquí
    @Autowired
    private CursoRepository cursoRepository;

    //listar todos los cursos
    public List<Curso> obtenerTodos() {
        return cursoRepository.findAll();
    }
    //guardar un curso
    public Curso guardar(Curso curso) {
        return cursoRepository.save(curso);
    }
    //eliminar un curso por id
    public void eliminarCurso(Long id) {
        cursoRepository.deleteById(id);
    }

   
    
}
