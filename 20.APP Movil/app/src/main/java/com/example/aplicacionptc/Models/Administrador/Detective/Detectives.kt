package com.example.ptc_app.Models.Administrador.Detective

import Persona.Personas
import com.example.aplicacionptc.Models.Administrador.Caso.CasoResumen
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.gson.annotations.SerializedName

data class Detectives(
    @SerializedName("_id") val id: String? = null,
    val tipoDocumento: String,
    val numeroDocumento: String,
    val nombres: String,
    val apellidos: String,
    val correo: String,
    val fechaNacimiento: String,
    val activo: Boolean,
    val especialidad: List<String>,  // Este es un campo nuevo para la especialidad
    //val casos: List<Caso>? = null,
    val casos: List<CasoResumen>? = null,
// Relación con los casos
    //val historialCasos: List<HistorialCaso>, // Relación con el historial de casos
    //val registroCaso: List<RegistroCaso>, // Relación con el registro de casos
    val contratos: List<Contrato> ? = null// Relación con los contratos
)
