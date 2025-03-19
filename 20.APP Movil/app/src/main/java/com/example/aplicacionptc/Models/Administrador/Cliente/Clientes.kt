package com.example.ptc_app.Models.Administrador.Cliente

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Caso.Caso


class Clientes(
    id: String,
    nombre: String,
    celular: String,
    direccion: String,
    correo: String
) : Personas(id, nombre, celular, direccion, correo) {


     val casos = mutableListOf<Caso>()


    fun datosCliente() {
        println("Id: $id")
        println("Cliente: $nombre")
        println("Celular: $celular")
        println("Dirección: $direccion")
        println("Correo: $correo")
    }


    fun agregarCaso(caso: Caso) {
        casos.add(caso)
    }


    fun obtenerCasos(): List<Caso> = casos


    companion object {
        val clientes = mutableListOf(
            Clientes("1", "Danna Camila", "321269946", "Crr 17H BIS", "dcami@gmail.com"),
            Clientes("2", "Oriana Guerra", "321264566", "Crr 18H BIS", "ori@gmail.com"),
            Clientes("3", "Martin Emilio", "311600120", "Crr 25H BIS", "martin@gmail.com")
        )

    }
}
