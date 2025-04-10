package com.example.aplicacionptc.Views.Detective

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.R
import com.google.gson.Gson

class DetallesContratoActivity : AppCompatActivity() {

    private lateinit var detallesTextView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalles_contrato)

        detallesTextView = findViewById(R.id.detallesContratoTextView)

        val contratoJson = intent.getStringExtra("contrato")
        val contrato = Gson().fromJson(contratoJson, Contrato::class.java)

        detallesTextView.text = """
            Servicio: ${contrato.descripcionServicio}
            Fecha inicio: ${contrato.fechaInicio}
            Fecha cierre: ${contrato.fechaCierre}
            Cliente: ${contrato.nombreCliente ?: "N/A"}
            Detective: ${contrato.nombreDetective ?: "N/A"}
            Tarifa: ${contrato.tarifa}
            Clausulas: ${contrato.clausulas ?: "No especificadas"}
            Estado: ${if (contrato.estado) "Activo" else "Inactivo"}
        """.trimIndent()
    }
}
