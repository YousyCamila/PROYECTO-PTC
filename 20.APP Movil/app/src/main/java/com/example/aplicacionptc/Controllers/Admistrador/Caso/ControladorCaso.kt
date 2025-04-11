package com.example.aplicacionptc.Controllers.Admistrador.Caso

import com.example.aplicacionptc.Models.Administrador.Caso.CasoRequest
import com.example.ptc_app.Models.Administrador.Caso.Caso
import retrofit2.Call
import retrofit2.http.*

interface ControladorCaso {

    @GET("caso")
    fun obtenerCasos(): Call<List<Caso>>

    @GET("caso/{id}")
    fun buscarCasoPorId(@Path("id") id: String): Call<Caso>

    @POST("caso")
    fun crearCaso(@Body caso: CasoRequest): Call<Caso>

    @PUT("caso/{id}")
    fun actualizarCaso(@Path("id") id: String, @Body caso: Caso): Call<Caso>

    @PATCH("caso/{id}")
    fun desactivarCaso(@Path("id") id: String): Call<Void>
}