package com.example.aplicacionptc.Views.Administrador.Cliente

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.aplicacionptc.Api.RetrofitClient
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import retrofit2.Call
import android.util.Log
import retrofit2.Callback
import retrofit2.Response

class ClientesViewModel : ViewModel() {
    private val _clientes = MutableLiveData<List<Clientes>>()
    val clientes: LiveData<List<Clientes>> get() = _clientes

    fun obtenerClientes() {
        Log.d("ClientesViewModel", "Iniciando petición para obtener clientes...")

        RetrofitClient.instance.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful) {
                    _clientes.value = response.body() ?: emptyList()
                    println("Clientes obtenidos: ${_clientes.value}")
                } else {
                    println("Error en la respuesta: ${response.errorBody()}")
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                println("Error al obtener clientes: ${t.message}")
            }
        })
    }
}



