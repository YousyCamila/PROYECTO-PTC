package com.example.aplicacionptc.Views.Administrador.Caso

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionCasosActivity : AppCompatActivity() {

    private val controladorCaso = Retrofit.casoInstance
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearCaso: FloatingActionButton
    private lateinit var adapter: CasosAdapter
    private var listaCasos = mutableListOf<Caso>()
    private lateinit var etBuscarCaso: EditText
    private lateinit var btnBuscarCaso: Button
    private var listaCasosOriginal = mutableListOf<Caso>()

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gestion_casos)

        // Inicialización de las vistas
        etBuscarCaso = findViewById(R.id.etBuscarCaso)
        btnBuscarCaso = findViewById(R.id.btnBuscarCaso)
        recyclerView = findViewById(R.id.recyclerCasos)
        btnCrearCaso = findViewById(R.id.btnCrearCaso)

        // Configuración del RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = CasosAdapter(
            listaCasos,
            onEditar = { caso -> editarCaso(caso) },
            onEliminar = { caso, position -> eliminarCaso(caso, position) },
            onDetalles = { caso -> verDetallesCaso(caso) }
        )
        recyclerView.adapter = adapter

        // Acción de buscar por texto en tiempo real
        etBuscarCaso.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                filtrarCasos(s.toString().trim())
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        // Acción al hacer clic en el botón de búsqueda
        btnBuscarCaso.setOnClickListener {
            filtrarCasos(etBuscarCaso.text.toString().trim())
        }

        // Acción al hacer clic en el botón de volver
        val btnVolverHome = findViewById<MaterialButton>(R.id.btnVolverHome)
        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        // Acción para crear un nuevo caso
        btnCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        // Obtener los casos desde la API
        obtenerCasos()
    }

    private fun obtenerCasos() {
        controladorCaso.obtenerCasos().enqueue(object : Callback<List<Caso>> {
            override fun onResponse(call: Call<List<Caso>>, response: Response<List<Caso>>) {
                if (response.isSuccessful) {
                    listaCasos.clear()
                    response.body()?.let {
                        listaCasos.addAll(it)
                        listaCasosOriginal.clear()
                        listaCasosOriginal.addAll(it) // Guardamos la lista original
                    }
                    adapter.notifyDataSetChanged()
                } else {
                    Toast.makeText(this@GestionCasosActivity, "Error al obtener casos", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Caso>>, t: Throwable) {
                Toast.makeText(this@GestionCasosActivity, "Fallo en la conexión: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun filtrarCasos(textoBuscar: String) {
        val casosFiltrados = if (textoBuscar.isEmpty()) {
            listaCasosOriginal // Restauramos la lista original
        } else {
            listaCasosOriginal.filter {
                it.nombreCaso.contains(textoBuscar, ignoreCase = true)
            }
        }
        actualizarLista(casosFiltrados)
    }

    private fun actualizarLista(casos: List<Caso>) {
        listaCasos.clear()
        listaCasos.addAll(casos)
        adapter.notifyDataSetChanged()
    }

    private fun editarCaso(caso: Caso) {
        val intent = Intent(this, EditarCasoActivity::class.java).apply {
            putExtra("id", caso._id)
            putExtra("nombre", caso.nombreCaso)
        }
        startActivity(intent)
    }

    private fun eliminarCaso(caso: Caso, posicion: Int) {
        val idCaso = caso._id
        if (idCaso != null) {
            controladorCaso.desactivarCaso(idCaso).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        listaCasos.removeAt(posicion)
                        adapter.notifyItemRemoved(posicion)
                        Toast.makeText(this@GestionCasosActivity, "Caso desactivado", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this@GestionCasosActivity, "Error al desactivar caso", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    Toast.makeText(this@GestionCasosActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        } else {
            Toast.makeText(this@GestionCasosActivity, "ID de caso es nulo", Toast.LENGTH_SHORT).show()
        }
    }

    private fun verDetallesCaso(caso: Caso) {
        val mensaje = """
            Nombre: ${caso.nombreCaso}
            ID: ${caso._id}
        """.trimIndent()

        AlertDialog.Builder(this)
            .setTitle("Detalles del Caso")
            .setMessage(mensaje)
            .setPositiveButton("Cerrar") { dialog, _ -> dialog.dismiss() }
            .show()
    }

    override fun onResume() {
        super.onResume()
        obtenerCasos()
    }
}
