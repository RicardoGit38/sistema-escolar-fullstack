package com.ricardo.escuela_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardo.escuela_backend.model.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    
// Aquí puedes definir métodos de consulta personalizados si es necesario

}
