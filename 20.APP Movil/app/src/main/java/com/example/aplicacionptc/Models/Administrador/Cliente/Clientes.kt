package com.example.ptc_app.Models.Administrador.Cliente

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.gson.annotations.SerializedName


data class Clientes(
    @SerializedName("_id") val id: String? = null,
    val tipoDocumento: String,
    val numeroDocumento: String,
    val nombres: String,
    val apellidos: String,
    val correo: String,
    val fechaNacimiento: String,
    var activo: Boolean
)



