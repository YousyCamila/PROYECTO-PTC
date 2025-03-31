package com.example.ptc_app.Models.Administrador.Detective

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.gson.annotations.SerializedName

data class Detectives(
    @SerializedName("_id") val id: String,
    val tipoDocumento: String,
    val numeroDocumento: String,
    val nombres: String,
    val apellidos: String,
    val correo: String,
    val fechaNacimiento: String,
    val activo: Boolean
)
