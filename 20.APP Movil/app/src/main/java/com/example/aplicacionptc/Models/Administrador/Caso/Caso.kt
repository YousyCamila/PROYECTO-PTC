package com.example.ptc_app.Models.Administrador.Caso

import java.util.UUID

data class Caso(
    val _id: String = UUID.randomUUID().toString(), // Genera un ID único automáticamente
    var nombreCaso: String,
    val idCliente: String,
    val idDetective: String? = null, // Opcional
    val evidencias: List<String> = emptyList(), // Lista vacía por defecto
    val registroCasos: List<String> = emptyList(), // Lista vacía por defecto
    val contratos: List<String> = emptyList(), // Lista vacía por defecto
    val activo: Boolean = true // Activo por defecto
)
