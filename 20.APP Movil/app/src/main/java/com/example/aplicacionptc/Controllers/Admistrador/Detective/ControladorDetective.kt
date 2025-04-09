package com.example.aplicacionptc.Controllers.Admistrador.Detective
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ControladorDetective {
        @GET("detectives")
        fun obtenerDetectives(): Call<List<Detectives>>

    @GET("detectives/{id}")
    fun buscarDetectivePorId(@Path("id") id: String): Call<Detectives>

    @POST("detectives")
    fun crearDetective(@Body detective: Detectives): Call<Detectives>


    @PUT("detectives/{id}")
    fun actualizarDetective(@Path("id") id: String, @Body detective: Detectives): Call<Detectives>

    @PATCH("detectives/{id}")
    fun desactivarDetectives(@Path("id") id: String): Call<Void>

}