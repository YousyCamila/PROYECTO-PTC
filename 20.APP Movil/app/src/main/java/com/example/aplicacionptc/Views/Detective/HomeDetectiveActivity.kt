package com.example.aplicacionptc.Views.Detective

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
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
    private lateinit var casosLayout: RecyclerView
    private lateinit var contratosLayout: RecyclerView

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
            for (caso in casos) {
                Log.d("HOME_DETECTIVE", "Caso: $caso")

                val nombreCaso = caso.nombre ?: "Sin nombre"
                val estado = caso.estado ?: "Activo"
                val idCaso = caso.id ?: "Sin ID"

                val casoView = TextView(this).apply {
                    text = """
                    Nombre del caso: $nombreCaso
                    ID del caso: $idCaso
                    Estado: $estado
                """.trimIndent()
                    textSize = 16f
                    setPadding(16, 16, 16, 24)
                }

                casosLayout.addView(casoView)
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