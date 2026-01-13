package com.ricardo.escuela_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardo.escuela_backend.model.Asistencia;

public interface AsistenciaRepository  extends JpaRepository<Asistencia, Long> {
    
    // Aquí puedes agregar métodos personalizados de consulta si es necesario
    
}
