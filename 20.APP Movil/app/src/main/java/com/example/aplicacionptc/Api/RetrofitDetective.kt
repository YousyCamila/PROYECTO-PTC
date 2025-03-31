package com.example.aplicacionptc.Api

import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective

object RetrofitDetective {
    private const val BASE_URL = "http://10.0.2.2:3000/api/"

    val instance: ControladorDetective by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ControladorDetective::class.java)
    }
}