package com.example.aplicacionptc.Models.Administrador.Usuario


data class AuthResponse(
    val accessToken: String?,
    val message: String?,
    val userId: String?,
    val role: String?
)
