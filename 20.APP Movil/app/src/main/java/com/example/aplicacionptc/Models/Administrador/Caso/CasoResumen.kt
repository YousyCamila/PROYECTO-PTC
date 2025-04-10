package com.example.aplicacionptc.Models.Administrador.Caso

import com.google.gson.annotations.SerializedName

data class CasoResumen(
    @SerializedName("id") val id: String? = null,
    val nombre: String? = null,
    val descripcion: String? = null,
    val estado: String? = null
)
