package com.ricardo.escuela_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardo.escuela_backend.model.Nota;

public interface NotaRepository  extends JpaRepository<Nota, Long> {
    //aqui ocurre la magia de Spring Data JPA
}
