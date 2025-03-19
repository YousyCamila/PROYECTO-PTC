package com.example.ptc_app.Models.Administrador.Detective

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Caso.Caso

class Detectives(
    id: String,
    nombre: String,
    celular: String,
    direccion: String,
    correo: String
) : Personas(id, nombre, celular, direccion, correo) {

    val casos = mutableListOf<Caso>()

    fun datosDetective() {
        println("Id: $id")
        println("Detective: $nombre")
        println("Celular: $celular")
        println("Dirección: $direccion")
        println("Correo: $correo")
    }

    fun agregarCaso(caso: Caso) {
        casos.add(caso)
    }

    fun obtenerCasos(): List<Caso> = casos

    companion object {
        val detectives = mutableListOf(
            Detectives("1", "Ludwig Smirh", "321269946", "calle 25 s", "ludwig@gmail.com"),
            Detectives("2", "Wolfgang Steve", "321264566", "calle 60 n", "wolfgang@gmail.com"),
            Detectives("3", "Cristian Cardona", "311600120", "avenida el dorado", "cristian@gmail.com")
        )
    }
}
