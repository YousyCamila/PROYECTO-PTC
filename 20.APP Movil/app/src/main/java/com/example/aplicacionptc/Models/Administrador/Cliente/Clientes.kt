package com.example.ptc_app.Models.Administrador.Cliente

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Caso.Caso


data class Clientes(
    val id: String,
    val tipoDocumento: String,
    val numeroDocumento: String,
    val nombres: String,
    val apellidos: String,
    val correo: String,
    val fechaNacimiento: String,
    val activo: Boolean
)

     val casos = mutableListOf<Caso>()



