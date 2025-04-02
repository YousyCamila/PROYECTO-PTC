package com.example.aplicacionptc.Controllers.Admistrador.Cliente


import com.example.ptc_app.Models.Administrador.Caso.Caso
import retrofit2.Call
import retrofit2.http.*

interface ControladorCaso {

    @GET("casos")
    fun obtenerCasos(): Call<List<Caso>>

    @GET("casos/{id}")
    fun buscarCasoPorId(@Path("id") id: String): Call<Caso>

    @POST("casos")
    fun crearCaso(@Body caso: Caso): Call<Caso>

    @PUT("casos/{id}")
    fun actualizarCaso(@Path("id") id: String, @Body caso: Caso): Call<Caso>

    @PATCH("casos/{id}")
    fun desactivarCaso(@Path("id") id: String): Call<Void>
}