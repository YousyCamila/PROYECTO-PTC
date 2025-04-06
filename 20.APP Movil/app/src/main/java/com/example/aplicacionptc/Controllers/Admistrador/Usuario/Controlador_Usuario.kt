package com.example.aplicacionptc.Controllers.Admistrador.Usuario

import com.example.aplicacionptc.Models.Administrador.Usuario.AuthResponse
import com.example.aplicacionptc.Models.Administrador.Usuario.RegisterResponse
import com.example.aplicacionptc.Models.Administrador.Usuario.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface AuthService {

    @POST("usuario/register") // Asegúrate de que esta sea la ruta correcta
    fun registerUser(@Body user: User): Call<RegisterResponse>

    @POST("usuario/login") // Asegúrate de que coincide con la ruta en el backend
    fun login(@Body request: User): Call<AuthResponse>

    @GET("usuario/logout")
    fun logout(): Call<Void>

    @GET("auth/refreshToken")
    fun refreshToken(): Call<AuthResponse>
}