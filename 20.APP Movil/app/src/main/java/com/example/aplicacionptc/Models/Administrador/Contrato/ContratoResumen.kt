package com.example.aplicacionptc.Models.Administrador.Contrato

import com.google.gson.annotations.SerializedName

data class ContratoResumen(
    @SerializedName("id") val id: String? = null,
    val descripcionServicio: String? = null
)

