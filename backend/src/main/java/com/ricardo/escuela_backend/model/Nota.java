package com.ricardo.escuela_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notas")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Long id;

    //Relacion 1: muchas notas a 1 alumno
    @ManyToOne
    @JoinColumn(name = "alumno_id") //clave foranea hacia alumno
    private Alumno alumno;

    //relacion 2: muchas notas a 1 curso
    @ManyToOne
    @JoinColumn (name = "curso_id") //clave foranea hacia curso
    private Curso curso;
    private Double valor; //ejemplo: 18.5

    //constructores
    public Nota() {
    }
    //constructor con parametros
    public Nota(Alumno alumno, Curso curso, Double valor) {
        this.alumno = alumno;
        this.curso = curso;
        this.valor = valor;
    }   
    //getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }


}