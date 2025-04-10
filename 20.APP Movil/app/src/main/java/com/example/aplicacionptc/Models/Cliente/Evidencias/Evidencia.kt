package com.example.aplicacionptc.Models.Cliente.Evidencias

data class Evidencia(
    val _id: String? = null,
    val fechaEvidencia: String,
    val descripcion: String,
    val idCasos: String,
    val tipoEvidencia: List<String>,
    val archivo: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)
