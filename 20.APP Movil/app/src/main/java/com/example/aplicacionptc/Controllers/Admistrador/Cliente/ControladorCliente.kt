package com.example.aplicacionptc.Controllers.Admistrador.Cliente


import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import retrofit2.Call
import retrofit2.http.*

interface ControladorCliente {
    @GET("clientes")
    fun obtenerClientes(): Call<List<Clientes>>

    @GET("clientes/{id}")
    fun buscarClientePorId(@Path("id") id: String): Call<Clientes>

    @POST("clientes")
    fun crearCliente(@Body cliente: Clientes): Call<Clientes>

    @PUT("clientes/{id}")
    fun actualizarCliente(@Path("id") id: String, @Body cliente: Clientes): Call<Clientes>

    @PATCH("clientes/{id}")
    fun desactivarCliente(@Path("id") id: String): Call<Void>
}

