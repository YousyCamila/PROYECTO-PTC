package com.example.aplicacionptc.Models.Administrador.Contrato

data class Contrato(
    val _id: String? = null,
    var descripcionServicio: String,
    val fechaInicio: String,
    var fechaCierre: String,
    var clausulas: String? = null,
    var tarifa: String,
    var estado: Boolean = true,
    val idCliente: String?,
    var nombreCliente: String? = null,
    val idDetective: String? = null,
    val nombreDetective: String? = null,
    val historial: List<HistorialDesactivacion>? = null
)

