package com.example.aplicacionptc.Views.Administrador.Caso

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.R
import android.content.Intent
import android.widget.Button
import android.widget.ListView
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.aplicacionptc.Controllers.Admistrador.Caso.CasoService
import android.widget.ImageButton

class HomeCasoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_caso)

        val listaCasos = findViewById<ListView>(R.id.listaCasos)
        val botonCrearCaso = findViewById<Button>(R.id.btnCrearCaso)
        val botonVolver = findViewById<ImageButton>(R.id.btnVolver)

        val casos = CasoService().listarCasos()?.map { caso ->
            val cliente = Clientes.clientes.find { it.id == caso.idCliente }
            val detective = Detectives.detectives.find { it.id == caso.idDetective }
            "Caso: ${caso.nombreCaso}\nCliente: ${cliente?.nombre ?: "Desconocido"} \nDetective: ${detective?.nombre ?: "Desconocido"}"
        } ?: listOf("No hay casos disponibles")

        val adapter = android.widget.ArrayAdapter(this, android.R.layout.simple_list_item_1, casos)
        listaCasos.adapter = adapter

        listaCasos.setOnItemClickListener { _, _, position, _ ->
            val casosList = CasoService().listarCasos()
            if (position < casosList.size) {
                val intent = Intent(this, DetallesCasoActivity::class.java)
                intent.putExtra("CASO_ID", casosList[position].id)
                startActivity(intent)
            }
        }

        botonCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        botonVolver.setOnClickListener {
            finish()
        }
    }
}


