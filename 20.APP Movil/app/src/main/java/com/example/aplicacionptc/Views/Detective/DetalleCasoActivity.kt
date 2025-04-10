package com.example.aplicacionptc.Views.Detective

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.R
import com.google.gson.Gson

class DetalleCasoActivity : AppCompatActivity() {

    private lateinit var nombreCasoText: TextView
    private lateinit var descripcionText: TextView
    private lateinit var estadoText: TextView
    private lateinit var clienteText: TextView
    private lateinit var btnVerEvidencias: Button
    private lateinit var btnVerRegistro: Button

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_caso_detalles)

        nombreCasoText = findViewById(R.id.nombreCasoText)
        descripcionText = findViewById(R.id.descripcionText)
        estadoText = findViewById(R.id.estadoText)
        clienteText = findViewById(R.id.clienteText)
        btnVerEvidencias = findViewById(R.id.btnVerEvidencias)
        btnVerRegistro = findViewById(R.id.btnVerRegistro)

        val jsonCaso = intent.getStringExtra("casoJson")
        val clienteNombre = intent.getStringExtra("clienteNombre")

        val caso = Gson().fromJson(jsonCaso, Caso::class.java)

        nombreCasoText.text = "Nombre: ${caso.nombreCaso}"
        estadoText.text = "Estado: ${if (caso.activo == true) "Activo" else "Inactivo"}"
        clienteText.text = "Cliente: $clienteNombre"

        btnVerEvidencias.setOnClickListener {
            // Aquí puedes iniciar una actividad para ver evidencias
        }

        btnVerRegistro.setOnClickListener {
            // Aquí puedes iniciar una actividad para ver el registro del caso
        }
    }
}
