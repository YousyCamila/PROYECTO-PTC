package com.example.aplicacionptc.Api

import com.example.aplicacionptc.Controllers.Admistrador.Caso.ControladorCaso
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ControladorContrato
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.Controllers.Admistrador.Usuario.AuthService
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object Retrofit {
    private const val BASE_URL = "http://10.0.2.2:3000/api/"


    private val retrofit: Retrofit  by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val authService: AuthService by lazy {
        retrofit.create(AuthService::class.java)
    }

     val clienteInstance: ControladorCliente by lazy {
         retrofit.create(ControladorCliente::class.java)
     }
    val detectiveInstance: ControladorDetective by lazy {
        retrofit.create(ControladorDetective::class.java)
    }
    val casoInstance: ControladorCaso by lazy {
        retrofit.create(ControladorCaso::class.java)
    }

    val contratoInstance: ControladorContrato by lazy {
        retrofit.create(ControladorContrato::class.java)
    }
}
