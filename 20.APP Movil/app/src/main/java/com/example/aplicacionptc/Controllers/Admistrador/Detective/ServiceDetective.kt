package com.example.aplicacionptc.Controllers.Admistrador.Detective


import android.util.Log
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ServiceDetective {

    fun obtenerCasoYCliente(
        idCaso: String,
        onResult: (caso: Caso?, clienteNombre: String?) -> Unit
    ) {
        Retrofit.casoInstance.buscarCasoPorId(idCaso)
            .enqueue(object : Callback<Caso> {
                override fun onResponse(call: Call<Caso>, response: Response<Caso>) {
                    if (response.isSuccessful) {
                        val caso = response.body()
                        val clienteId = caso?.idCliente?.id

                        if (!clienteId.isNullOrEmpty()) {
                            Retrofit.clienteInstance.buscarClientePorId(clienteId)
                                .enqueue(object : Callback<Clientes> {
                                    override fun onResponse(
                                        call: Call<Clientes>,
                                        response: Response<Clientes>
                                    ) {
                                        if (response.isSuccessful) {
                                            val cliente = response.body()
                                            val nombreCompleto = "${cliente?.nombres} ${cliente?.apellidos}"
                                            onResult(caso, nombreCompleto)
                                        } else {
                                            onResult(caso, null)
                                        }
                                    }

                                    override fun onFailure(call: Call<Clientes>, t: Throwable) {
                                        Log.e("ServiceDetective", "Error cliente: ${t.message}")
                                        onResult(caso, null)
                                    }
                                })
                        } else {
                            onResult(caso, null)
                        }
                    } else {
                        onResult(null, null)
                    }
                }

                override fun onFailure(call: Call<Caso>, t: Throwable) {
                    Log.e("ServiceDetective", "Error caso: ${t.message}")
                    onResult(null, null)
                }
            })
    }

    private val contratoApi = Retrofit.contratoInstance

    fun obtenerContratoPorId(idContrato: String, callback: (Contrato?) -> Unit) {
        contratoApi.buscarContratoPorId(idContrato)
            .enqueue(object : Callback<Contrato> {
                override fun onResponse(call: Call<Contrato>, response: Response<Contrato>) {
                    if (response.isSuccessful) {
                        val contrato = response.body()
                        val idCliente = contrato?.idCliente

                        if (!idCliente.isNullOrEmpty()) {
                            Retrofit.clienteInstance.buscarClientePorId(idCliente)
                                .enqueue(object : Callback<Clientes> {
                                    override fun onResponse(
                                        call: Call<Clientes>,
                                        response: Response<Clientes>
                                    ) {
                                        if (response.isSuccessful) {
                                            val cliente = response.body()
                                            val nombreCompleto = "${cliente?.nombres} ${cliente?.apellidos}"
                                            contrato?.nombreCliente = nombreCompleto
                                            callback(contrato)
                                        } else {
                                            callback(contrato) // sin nombre
                                        }
                                    }

                                    override fun onFailure(call: Call<Clientes>, t: Throwable) {
                                        Log.e("ServiceDetective", "Error cliente en contrato: ${t.message}")
                                        callback(contrato) // sin nombre
                                    }
                                })
                        } else {
                            callback(contrato)
                        }
                    } else {
                        Log.e("ServiceDetective", "Error al obtener contrato: ${response.code()}")
                        callback(null)
                    }
                }

                override fun onFailure(call: Call<Contrato>, t: Throwable) {
                    Log.e("ServiceDetective", "Fallo en la llamada: ${t.message}")
                    callback(null)
                }
            })
    }
}
