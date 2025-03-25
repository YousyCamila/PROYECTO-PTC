package com.example.aplicacionptc.Controllers.Admistrador.Cliente


import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import retrofit2.Call
import retrofit2.http.*

interface ControladorCliente {
    @GET("clientes") // Ruta para obtener todos los clientes
    fun obtenerClientes(): Call<List<Clientes>>

    @GET("clientes/{id}") // Ruta para buscar cliente por ID
    fun buscarClientePorId(@Path("id") id: String): Call<Clientes>

    @POST("clientes") // Ruta para crear cliente
    fun crearCliente(@Body cliente: Clientes): Call<Clientes>

    @PUT("clientes/{id}") // Ruta para actualizar cliente
    fun actualizarCliente(@Path("id") id: String, @Body cliente: Clientes): Call<Clientes>

    @PATCH("clientes/{id}") // Ruta para desactivar cliente
    fun desactivarCliente(@Path("id") id: String): Call<Void>
}

