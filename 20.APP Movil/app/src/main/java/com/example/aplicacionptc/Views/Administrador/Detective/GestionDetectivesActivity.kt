package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetectiv
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.FloatingActionButton

class GestionDetectivesActivity : AppCompatActivity() {

    private lateinit var controladorDetective: ControladorDetectiv
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearDetective: FloatingActionButton
    private lateinit var adapter: DetectivesAdapter

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_gestion_detectives)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val btnVolverHome = findViewById<MaterialButton>(R.id.btnVolverHome)
        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        // Inicializamos el controlador
        controladorDetective = ControladorDetectiv()

        recyclerView = findViewById(R.id.recyclerDetectives)
        btnCrearDetective = findViewById(R.id.btnCrearDetective)

        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = DetectivesAdapter(
            Detectives.detectives,
            onEditar = { position -> editarDetective(position) },
            onEliminar = { position -> eliminarDetective(position) },
            onDetalles = { position -> verDetallesDetective(position) }
        )
        recyclerView.adapter = adapter

        // Botón para ir a crear un nuevo detective
        btnCrearDetective.setOnClickListener {
            val intent = Intent(this, CrearDetectivesActivity::class.java)
            startActivity(intent)
        }
    }

    private fun actualizarLista() {
        adapter.notifyDataSetChanged()
    }

    private fun editarDetective(posicion: Int) {
        val detective = Detectives.detectives[posicion]

        val intent = Intent(this, EditarDetectivesActivity::class.java)
        intent.putExtra("posicion", posicion)
        intent.putExtra("nombre", detective.nombre)
        intent.putExtra("celular", detective.celular)
        intent.putExtra("direccion", detective.direccion)
        intent.putExtra("correo", detective.correo)
        startActivity(intent)
    }

    private fun eliminarDetective(posicion: Int) {
        val detective = Detectives.detectives[posicion]
        val idDetective = detective.id

        controladorDetective.eliminar(idDetective)

        Detectives.detectives.removeAt(posicion)

        adapter.notifyItemRemoved(posicion)

        Toast.makeText(this, "Detective eliminado", Toast.LENGTH_SHORT).show()
    }

    private fun verDetallesDetective(posicion: Int) {
        val detective = Detectives.detectives[posicion]

        val mensaje = """
        Nombre: ${detective.nombre}
        ID: ${detective.id}
        Teléfono: ${detective.celular}
        Dirección: ${detective.direccion}
        Correo: ${detective.correo}
    """.trimIndent()

        AlertDialog.Builder(this)
            .setTitle("Detalles del Detective")
            .setMessage(mensaje)
            .setPositiveButton("Cerrar") { dialog, _ -> dialog.dismiss() }
            .show()
    }

    override fun onResume() {
        super.onResume()
        actualizarLista()
    }
}