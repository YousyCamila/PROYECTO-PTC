package com.example.aplicacionptc.Views.Administrador.Caso

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.R
import android.content.Intent
import android.widget.Button
import android.widget.ListView
import android.widget.ImageButton
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.aplicacionptc.Controllers.Admistrador.Caso.CasoService
import com.example.ptc_app.Models.Administrador.Caso.Caso


class HomeCasoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_caso)

        val listViewCasos = findViewById<ListView>(R.id.listViewCasos)
        val botonCrearCaso = findViewById<Button>(R.id.btnCrearCaso)
        val botonVolver = findViewById<ImageButton>(R.id.btnVolver)

        val casos: MutableList<Caso> = CasoService().listarCasos()?.toMutableList() ?: mutableListOf()
        // Asignar el adaptador al ListView
        val adapter = CasosAdapter(this, casos)
        listViewCasos.adapter = adapter

        // Botón para crear un nuevo caso
        botonCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        // Botón para volver
        botonVolver.setOnClickListener {
            finish()
        }
    }
}
