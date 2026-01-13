package com.ricardo.escuela_backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ricardo.escuela_backend.model.Alumno;
import com.ricardo.escuela_backend.repository.AlumnoRepository;

@Service // importante para que Spring lo reconozca como un servicio
public class AlumnoService {
   
    @Autowired //Inyección automática del repositorio
    private AlumnoRepository alumnoRepository;

    // ya no necesitamos list de alumnos aquí
    // Método para obtener todos los alumnos
    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll(); //metodo magico de JpaRepositor
    }
     //Guarda el alumno en la base de datos
    public Alumno guardar(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }
    //Devuelve el alumno o null si no existe
    public Alumno obtenerAlumnoPorId(Long id) {
        return alumnoRepository.findById(id).orElse(null); 
    }
    public boolean eliminarAlumno(Long id) {
        // Verificamos si el alumno existe antes de eliminar
        if (alumnoRepository.existsById(id)) {
            alumnoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    //// Si tenías un método actualizar, sería similar a guardar (save actualiza si el ID existe)
  // Método para actualizar un alumno
    public Alumno actualizarAlumno(Long id, Alumno alumnoDetalles) {
        // 1. Buscamos al alumno en la base de datos
        Alumno alumnoExistente = alumnoRepository.findById(id).orElse(null);

        if (alumnoExistente != null) {
            // 2. Si existe, actualizamos sus campos con los datos nuevos
            alumnoExistente.setNombre(alumnoDetalles.getNombre());
            alumnoExistente.setApellido(alumnoDetalles.getApellido()); // Asumiendo que tienes apellido
           
            // No tocamos el ID, ese no se debe cambiar

            // 3. Guardamos los cambios (el método .save actúa como UPDATE si el ID ya existe)
            return alumnoRepository.save(alumnoExistente);
        } else {
            // Si no existe, retornamos null
            return null;
        }
    }
}
