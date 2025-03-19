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

        // Obtener casos y asignar información de cliente y detective
        val casos = CasoService().listarCasos()?.map { caso ->
            val cliente = Clientes.clientes.find { it.id == caso.idCliente }
            val detective = Detectives.detectives.find { it.id == caso.idDetective }
            CasoInfo(
                id = caso.id.toString(),
                nombre = caso.nombreCaso,
                cliente = cliente?.nombre ?: "Desconocido",
                detective = detective?.nombre ?: "Desconocido"
            )
        } ?: listOf()

        // Adaptador personalizado con los botones de "Ver Detalles" y "Desactivar"
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

// Clase para manejar la información del caso
data class CasoInfo(val id: String, val nombre: String, val cliente: String, val detective: String)


