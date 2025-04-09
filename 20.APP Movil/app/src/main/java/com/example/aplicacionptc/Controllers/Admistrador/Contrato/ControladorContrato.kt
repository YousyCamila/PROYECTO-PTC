package com.example.aplicacionptc.Controllers.Admistrador.Contrato

import retrofit2.Call
import retrofit2.http.*
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato

interface ControladorContrato {

    @POST("contratos")
    fun crearContrato(@Body contrato: Contrato): Call<Contrato>

    @GET("contratos")
    fun listarContratos(): Call<List<Contrato>>

    @GET("contratos/{id}")
    fun buscarContratoPorId(@Path("id") id: String): Call<Contrato>

    @PUT("contratos/{id}")
    fun actualizarContrato(@Path("id") id: String, @Body contrato: Contrato): Call<Contrato>

    @PUT("contratos/{id}/desactivar")
    fun desactivarContrato(@Path("id") id: String): Call<Void>

    @GET("contratos/detective/{id}")
    fun listarContratosPorDetective(@Path("id") id: String): Call<List<Contrato>>
}