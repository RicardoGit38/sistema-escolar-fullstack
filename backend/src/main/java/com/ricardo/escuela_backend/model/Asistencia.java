package com.ricardo.escuela_backend.model;

import java.time.LocalDate;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "asistencias")
public class Asistencia {
    

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación: Muchas asistencias pertenecen a UN alumno
    @ManyToOne
    @JoinColumn(name = "alumno_id")
    private Long alumnoId;

    // Fecha de la asistencia
    private LocalDate fecha; //ejemplo: 2023-10-05
    
    private String estado; // "Presente", "Tarde" o "Ausente"

    //constructores, getters y setters  
    public Asistencia() {
    }
    public Asistencia(Long id, Long alumnoId, LocalDate fecha, String estado) {
        this.id = id;
        this.alumnoId = alumnoId;
        this.fecha = fecha;
        this.estado = estado;
    }
    //getters y setters
    public Long getId() {
        return id;
    }   
    public void setId(Long id) {
        this.id = id;
    }
    public Long getAlumnoId() {
        return alumnoId;
    }
    public void setAlumnoId(Long alumnoId) {
        this.alumnoId = alumnoId;
    }   
    public LocalDate getFecha() {
        return fecha;
    }   
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }   
    public String getEstado() {
        return estado;
    }   
    public void setEstado(String estado) {
        this.estado = estado;
    }


}
