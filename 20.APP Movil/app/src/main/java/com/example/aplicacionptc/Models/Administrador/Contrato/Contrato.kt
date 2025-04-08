package com.example.aplicacionptc.Models.Administrador.Contrato

data class Contrato(
    val _id: String? = null,
    val descripcionServicio: String,
    val fechaInicio: String,
    val fechaCierre: String,
    val clausulas: String? = null,
    val tarifa: String,
    val estado: Boolean = true,
    val idCliente: String,
    val nombreCliente: String? = null,
    val idDetective: String? = null,
    val nombreDetective: String? = null,
    val historial: List<HistorialDesactivacion>? = null
)


