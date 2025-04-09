package com.example.ptc_app.Models.Administrador.Caso

import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.gson.annotations.SerializedName

data class Caso(
    @SerializedName("_id")
    val id: String? = null,

    @SerializedName("nombreCaso")
    val nombreCaso: String,

    @SerializedName("idCliente")
    val idCliente: Clientes?,

    @SerializedName("idDetective")
    val idDetective: Detectives?, // opcional

    //@SerializedName("evidencias")
    //val evidencias: List<String>? = null, // opcional

    //@SerializedName("registroCasos")
    //val registroCasos: List<String>? = null, // opcional

    //@SerializedName("contratos")
    //val contratos: List<String>? = null, // opcional

    //@SerializedName("historial")
    //val historial: List<String>? = null, // opcional

    @SerializedName("activo")
    var activo: Boolean? = true // opcional con valor por defecto
)
