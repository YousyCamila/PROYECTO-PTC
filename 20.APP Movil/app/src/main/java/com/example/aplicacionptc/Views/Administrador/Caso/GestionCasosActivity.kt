package com.example.aplicacionptc.Views.Administrador.Caso

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.R
import com.example.aplicacionptc.MainActivity
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionCasosActivity : AppCompatActivity() {

    private val controladorCaso = Retrofit.casoInstance
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearCaso: FloatingActionButton
    private lateinit var etBuscarCaso: EditText
    private lateinit var btnBuscarCaso: Button
    private lateinit var adapter: CasosAdapter
    val listaCasos = mutableListOf<Caso>()
    private var listaCasosOriginal = mutableListOf<Caso>()
    private lateinit var btnVolverHome: ImageButton


    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gestion_casos)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.layoutGestionCasos)) { v, insets ->
            insets
        }

        etBuscarCaso = findViewById(R.id.etBuscarCaso)
        btnBuscarCaso = findViewById(R.id.btnBuscarCaso)
        recyclerView = findViewById(R.id.recyclerCasos)
        btnCrearCaso = findViewById(R.id.btnCrearCaso)
        btnVolverHome = findViewById(R.id.btnVolverHome)

        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = CasosAdapter(
            context = this,
            listaCasos = listaCasos,
            onVerDetalles = { caso -> verDetallesCaso(caso) },
            onDesactivar = { caso, position -> desactivarCaso(caso, position) }
        )

        recyclerView.adapter = adapter

        btnBuscarCaso.setOnClickListener {
            filtrarCasos(etBuscarCaso.text.toString().trim())
        }

        obtenerCasos()

        btnCrearCaso.setOnClickListener {
            startActivity(Intent(this, CrearCasoActivity::class.java))
        }

        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }

    private fun obtenerCasos() {
        controladorCaso.obtenerCasos().enqueue(object : Callback<List<Caso>> {
            override fun onResponse(call: Call<List<Caso>>, response: Response<List<Caso>>) {
                if (response.isSuccessful) {
                    listaCasos.clear()
                    response.body()?.let {
                        listaCasos.addAll(it)
                        listaCasosOriginal.addAll(it)
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
            listaCasosOriginal
        } else {
            listaCasosOriginal.filter { it.nombreCaso.contains(textoBuscar, ignoreCase = true) }
        }
        listaCasos.clear()
        listaCasos.addAll(casosFiltrados)
        adapter.notifyDataSetChanged()
    }

    private fun verDetallesCaso(caso: Caso) {
        val intent = Intent(this, DetallesCasoActivity::class.java)
        intent.putExtra("CASO_ID", caso.id)
        startActivity(intent)
    }

    private fun desactivarCaso(caso: Caso, position: Int) {
        caso.id?.let {
            controladorCaso.desactivarCaso(it).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        // Actualiza el campo 'activo' del objeto en memoria
                        listaCasos[position].activo = false
                        adapter.notifyItemChanged(position) // Refresca solo ese ítem

                        Toast.makeText(this@GestionCasosActivity, "Caso desactivado correctamente", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this@GestionCasosActivity, "Error al desactivar caso", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    Toast.makeText(this@GestionCasosActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        } ?: run {
            Toast.makeText(this, "ID del caso no válido", Toast.LENGTH_SHORT).show()
        }
    }



    override fun onResume() {
        super.onResume()
        obtenerCasos()
    }
}
