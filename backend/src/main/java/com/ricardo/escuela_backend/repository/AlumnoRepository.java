package com.ricardo.escuela_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardo.escuela_backend.model.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    // Aquí puedes agregar métodos personalizados si los necesitas
    
}
