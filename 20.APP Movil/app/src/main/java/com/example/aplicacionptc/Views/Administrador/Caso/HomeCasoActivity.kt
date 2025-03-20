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

        val listaCasos = findViewById<ListView>(R.id.listaCasos)
        val botonCrearCaso = findViewById<Button>(R.id.btnCrearCaso)
        val botonVolver = findViewById<ImageButton>(R.id.btnVolver)

        // Obtener casos y asignar información de cliente y detective
        val casos: MutableList<Caso> = CasoService().listarCasos().toMutableList()

        // Adaptador personalizado
        val adapter = CasosAdapter(this, casos)
        listaCasos.adapter = adapter

        botonCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        botonVolver.setOnClickListener {
            finish()
        }
    }
}
