package com.example.aplicacionptc.Models.Administrador.Caso

data class CasoRequest(

    val nombreCaso: String,
    val idCliente: String,
    val idDetective: String,
    val activo: Boolean
)