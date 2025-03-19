package com.example.aplicacionptc.Views.Administrador.Caso

import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Controllers.Admistrador.Caso.BaseDatosTemporal
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives

class DetallesCasoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalles_caso)

        val textViewIdCaso = findViewById<TextView>(R.id.txtNombreCaso)
        val textViewCliente = findViewById<TextView>(R.id.txtCliente)
        val textViewDetective = findViewById<TextView>(R.id.txtDetective)
        val textViewEstado = findViewById<TextView>(R.id.txtEstado)
        val btnVolver = findViewById<ImageButton>(R.id.btnVolverDetalles)

        // Obtener el ID del caso desde el intent
        val idCaso = intent.getStringExtra("id_caso")

        if (idCaso.isNullOrEmpty()) {
            Toast.makeText(this, "ID de caso no válido", Toast.LENGTH_SHORT).show()
            finish() // Cierra la actividad si no hay ID válido
            return
        }

        // Buscar el caso en la base de datos temporal
        val caso = BaseDatosTemporal.casos.find { it.id == idCaso }

        if (caso != null) {
            val cliente = Clientes.clientes.find { it.id == caso.idCliente }
            val detective = Detectives.detectives.find { it.id == caso.idDetective }

            textViewIdCaso.text = "Caso: ${caso.nombreCaso}"
            textViewCliente.text = "Cliente: ${cliente?.nombre ?: "Desconocido"}"
            textViewDetective.text = "Detective: ${detective?.nombre ?: "Desconocido"}"
            textViewEstado.text = "Estado: ${if (caso.activo) "Activo" else "Inactivo"}"
        } else {
            textViewIdCaso.text = "Caso no encontrado"
        }

        // Acción del botón de volver
        btnVolver.setOnClickListener {
            finish() // Cierra la actividad y vuelve a la anterior
        }
    }
}
