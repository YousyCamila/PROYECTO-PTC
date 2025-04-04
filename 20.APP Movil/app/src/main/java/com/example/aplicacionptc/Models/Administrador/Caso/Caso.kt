package com.example.ptc_app.Models.Administrador.Caso

import com.google.gson.annotations.SerializedName

data class Caso(
    @SerializedName("_id") val id: String? = null,
    var nombreCaso: String,
    @SerializedName("idCliente")val idCliente: String,
    @SerializedName ("idDetective")val idDetective: String,
    val evidencias: List<String> = emptyList(),
    val registroCasos: List<String> = emptyList(),
    val contratos: List<String> = emptyList(),
    val activo: Boolean = true
)