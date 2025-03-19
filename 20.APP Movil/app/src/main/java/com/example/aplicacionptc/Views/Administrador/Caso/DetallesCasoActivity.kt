package com.example.aplicacionptc.Views.Administrador.Caso

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.R


class DetallesCasoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalles_caso)

        val txtDetalles = findViewById<TextView>(R.id.txtDetallesCaso)
        val casoId = intent.getIntExtra("CASO_ID", -1)

        if (casoId != -1) {
            txtDetalles.text = "Detalles del Caso con ID: $casoId"
        } else {
            txtDetalles.text = "Error: Caso no encontrado"
        }
    }
}
