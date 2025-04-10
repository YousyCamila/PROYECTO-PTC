package com.example.aplicacionptc.Views.Detective

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ServiceDetective
import com.example.aplicacionptc.Models.Administrador.Caso.CasoResumen
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.Models.Administrador.Contrato.ContratoResumen
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.aplicacionptc.R
import com.google.gson.Gson
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.net.URLEncoder

class HomeDetectiveActivity : AppCompatActivity() {

    private lateinit var nombreTextView: TextView
    private lateinit var emailTextView: TextView
    private lateinit var rolTextView: TextView
    private lateinit var idTextView: TextView
    private lateinit var casosLayout: LinearLayout
    private lateinit var contratosLayout: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_detective)

        // Inicialización de vistas
        nombreTextView = findViewById(R.id.nombreTextView)
        emailTextView = findViewById(R.id.emailTextView)
        rolTextView = findViewById(R.id.rolTextView)
        idTextView = findViewById(R.id.idTextView)
        casosLayout = findViewById(R.id.casosLayout)
        contratosLayout = findViewById(R.id.contratosLayout)

        val prefs = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        val userEmail = prefs.getString("userEmail", null) // Si no hay correo, será null

        // Verifica si el correo está disponible
        if (userEmail != null) {
            val correoCodificado = URLEncoder.encode(userEmail, "UTF-8")

            // Realiza la llamada a la API usando Retrofit
            val call = Retrofit.detectiveInstance.obtenerDetectives()
            call.enqueue(object : Callback<List<Detectives>> {
                override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                    if (response.isSuccessful) {
                        val lista = response.body()
                        val detective = lista?.find { it.correo.equals(userEmail, ignoreCase = true) }

                        if (detective != null) {
                            mostrarInformacion(detective)
                            mostrarCasos(detective.casos ?: emptyList())
                            mostrarContratos(detective.contratos ?: emptyList())
                        } else {
                            Toast.makeText(this@HomeDetectiveActivity, "Detective no encontrado", Toast.LENGTH_SHORT)
                                .show()
                        }
                    } else {
                        Log.e("HOME_DETECTIVE", "Error al obtener lista de detectives. Código: ${response.code()}")
                    }
                }

                override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                    Toast.makeText(this@HomeDetectiveActivity, "Fallo de red: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

    // Obtener el detective por correo
    private fun obtenerDetectivePorCorreo(correo: String) {
        Log.d("HOME_DETECTIVE", "Llamando a la API para obtener detective con correo: $correo")
        val call = Retrofit.detectiveInstance.buscarDetectivePorCorreo(correo)

        call.enqueue(object : Callback<Detectives> {
            override fun onResponse(call: Call<Detectives>, response: Response<Detectives>) {
                if (response.isSuccessful) {
                    val detective = response.body()
                    Log.d("HOME_DETECTIVE", "Detective encontrado: ${detective?.nombres} ${detective?.apellidos}")
                    detective?.let {
                        mostrarInformacion(it)
                        mostrarCasos(it.casos ?: emptyList())
                        mostrarContratos(it.contratos ?: emptyList())
                    }
                } else {
                    Toast.makeText(this@HomeDetectiveActivity, "Error: Detective no encontrado", Toast.LENGTH_SHORT)
                        .show()
                    Log.e("HOME_DETECTIVE", "Error al obtener detective. Código: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<Detectives>, t: Throwable) {
                Toast.makeText(this@HomeDetectiveActivity, "Fallo de red: ${t.message}", Toast.LENGTH_SHORT).show()
                Log.e("HOME_DETECTIVE", "Fallo de conexión: ${t.message}")
            }
        })
    }



    // Mostrar los datos del detective en la UI
    private fun mostrarInformacion(detective: Detectives) {
        val nombreCompleto = "${detective.nombres} ${detective.apellidos}"
        nombreTextView.text = nombreCompleto
        emailTextView.text = detective.correo
        rolTextView.text = "Detective"
        idTextView.text = "ID: ${detective.id}"
        Log.d("HOME_DETECTIVE", "Mostrando info: $nombreCompleto - ${detective.correo}")
    }

    // Mostrar los casos asociados al detective
    private fun mostrarCasos(casos: List<CasoResumen>) {
        Log.d("HOME_DETECTIVE", "Casos recibidos: ${casos.size}")
        casosLayout.removeAllViews()

        if (casos.isEmpty()) {
            val texto = TextView(this).apply {
                text = "No hay casos registrados."
                textSize = 16f
                setPadding(16, 16, 16, 16)
            }
            casosLayout.addView(texto)
        } else {
            val serviceDetective = ServiceDetective()

            for (casoResumen in casos) {
                val idCaso = casoResumen.id ?: continue

                serviceDetective.obtenerCasoYCliente(idCaso) { casoCompleto, clienteNombre ->
                    if (casoCompleto != null && clienteNombre != null) {
                        val textoFinal = """
                        Nombre del caso: ${casoCompleto.nombreCaso}
                        Cliente: $clienteNombre
                        Estado: ${if (casoCompleto.activo == true) "Activo" else "Inactivo"}
                    """.trimIndent()

                        val casoView = TextView(this).apply {
                            text = textoFinal
                            textSize = 16f
                            setPadding(16, 16, 16, 24)
                            setOnClickListener {
                                val intent = Intent(this@HomeDetectiveActivity, DetalleCasoActivity::class.java)
                                intent.putExtra("casoJson", Gson().toJson(casoCompleto))
                                intent.putExtra("clienteNombre", clienteNombre)
                                startActivity(intent)
                            }
                        }


                        runOnUiThread {
                            casosLayout.addView(casoView)
                        }
                    } else {
                        Log.e("HOME_DETECTIVE", "No se pudo cargar el caso o cliente.")
                    }
                }
            }
        }
    }


    @SuppressLint("SetTextI18n")
    private fun mostrarContratos(contratos: List<ContratoResumen>) {
        contratosLayout.removeAllViews()

        if (contratos.isEmpty()) {
            val texto = TextView(this).apply {
                text = "No hay contratos registrados."
                textSize = 16f
                setPadding(16, 16, 16, 16)
            }
            contratosLayout.addView(texto)
        } else {
            for (contrato in contratos) {
                val contratoView = TextView(this).apply {
                    text = """
                    • Servicio: ${contrato.descripcionServicio ?: "Servicio no especificado"}
                    ID: ${contrato.id ?: "ID no disponible"}
                """.trimIndent()
                    textSize = 16f
                    setPadding(8, 8, 8, 16)
                }
                contratosLayout.addView(contratoView)
            }
        }
    }
}