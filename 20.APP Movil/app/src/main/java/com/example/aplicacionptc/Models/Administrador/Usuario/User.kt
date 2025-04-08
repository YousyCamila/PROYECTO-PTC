package com.example.aplicacionptc.Models.Administrador.Usuario



data class User(
    val id: String? = null,
    val username: String,
    val email: String,
    val password: String,
    val role: String // ✅ Se debe especificar que es un String
)
