package com.ricardo.escuela_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity //indica que esta clase es una entidad JPA y se mapeará a una tabla de base de datos
@Table(name = "alumnos") // <--- Agrégalo aquí para que sea plural
public class Alumno {
    // 1. Datos privados (Regla de oro)
    @Id //indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //genera un valor unico automaticamente
    private Long id;
    private String nombre;
    private String apellido;
    private int edad;
    private String email;

    // 2. Constructor
    public Alumno(Long id, String nombre, String apellido, int edad, String email) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Constructor vacío requerido por JPA
    public Alumno() {}

    // 3. GETTERS (¡Vitales! Sin esto, Spring devuelve datos vacíos)
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public int getEdad() {
        return edad;
    }
    // 4. SETTERS (Si quieres permitir modificaciones)
    public void setId(Long id) {
        this.id = id;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public void setEdad(int edad) {
        this.edad = edad;
    }
    
}
