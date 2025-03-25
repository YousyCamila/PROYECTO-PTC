package com.example.aplicacionptc.Api

import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:3000/api/"



    val instance: ControladorCliente by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ControladorCliente::class.java)
    }
}
