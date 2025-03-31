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
import com.example.aplicacionptc.Api.RetrofitDetective
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionDetectivesActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearDetective: FloatingActionButton
    private lateinit var adapter: DetectivesAdapter
    private var listaDetectives: MutableList<Detectives> = mutableListOf()

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

        recyclerView = findViewById(R.id.recyclerDetectives)
        btnCrearDetective = findViewById(R.id.btnCrearDetective)

        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = DetectivesAdapter(
            listaDetectives,
            onEditar = { position -> editarDetective(position) },
            onEliminar = { position -> eliminarDetective(position) },
            onDetalles = { position -> verDetallesDetective(position) }
        )
        recyclerView.adapter = adapter

        btnCrearDetective.setOnClickListener {
            val intent = Intent(this, CrearDetectivesActivity::class.java)
            startActivity(intent)
        }

        cargarDetectives()
    }

    private fun cargarDetectives() {
        RetrofitDetective.instance.obtenerDetectives().enqueue(object : Callback<List<Detectives>> {
            override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                if (response.isSuccessful) {
                    listaDetectives.clear()
                    listaDetectives.addAll(response.body() ?: emptyList())
                    adapter.notifyDataSetChanged()
                } else {
                    Toast.makeText(this@GestionDetectivesActivity, "Error al obtener detectives", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                Toast.makeText(this@GestionDetectivesActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun editarDetective(posicion: Int) {
        val detective = listaDetectives[posicion]
        val intent = Intent(this, EditarDetectivesActivity::class.java).apply {
            putExtra("id", detective.id)
            putExtra("nombres", detective.nombres)
            putExtra("correo", detective.correo)
        }
        startActivity(intent)
    }

    private fun eliminarDetective(posicion: Int) {
        val detective = listaDetectives[posicion]

        // Verificar si el id es nulo antes de intentar hacer la llamada
        val idDetective = detective.id
        if (idDetective != null) {
            RetrofitDetective.instance.desactivarDetectives(idDetective).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        listaDetectives.removeAt(posicion)
                        adapter.notifyItemRemoved(posicion)
                        Toast.makeText(this@GestionDetectivesActivity, "Detective desactivado", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this@GestionDetectivesActivity, "Error al desactivar detective", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    Toast.makeText(this@GestionDetectivesActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        } else {
            Toast.makeText(this@GestionDetectivesActivity, "ID de detective es nulo", Toast.LENGTH_SHORT).show()
        }
    }

    private fun verDetallesDetective(posicion: Int) {
        val detective = listaDetectives[posicion]
        val mensaje = """
            Nombre: ${detective.nombres}
            ID: ${detective.id}
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
        cargarDetectives()
    }
}
