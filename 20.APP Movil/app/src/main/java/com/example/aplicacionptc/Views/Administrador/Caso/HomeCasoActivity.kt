package com.example.aplicacionptc.Views.Administrador.Caso

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.R
import android.content.Intent
import android.widget.Button
import android.widget.ListView
import android.widget.ImageButton
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.Controllers.Admistrador.Caso.CasoService

class HomeCasoActivity : AppCompatActivity() {
    private lateinit var adapter: CasosAdapter
    private lateinit var casos: MutableList<Caso>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_caso)

        val listViewCasos = findViewById<ListView>(R.id.listViewCasos)
        val botonCrearCaso = findViewById<Button>(R.id.btnCrearCaso)
        val botonVolver = findViewById<ImageButton>(R.id.btnVolver)

        casos = CasoService().listarCasos()?.toMutableList() ?: mutableListOf()
        adapter = CasosAdapter(this, casos)
        listViewCasos.adapter = adapter

        botonCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        botonVolver.setOnClickListener {
            finish()
        }
    }

    override fun onResume() {
        super.onResume()
        refrescarListaCasos()
    }

    private fun refrescarListaCasos() {
        casos.clear()
        casos.addAll(CasoService().listarCasos()?.toMutableList() ?: mutableListOf())
        adapter.notifyDataSetChanged()
    }
}
