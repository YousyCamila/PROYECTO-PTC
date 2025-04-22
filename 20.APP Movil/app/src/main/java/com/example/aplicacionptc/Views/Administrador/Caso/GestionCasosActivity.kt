package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionCasosActivity : AppCompatActivity() {

    private val crearCasoLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            obtenerCasos(forzar = true)
        }
    }

    private val controladorCaso = Retrofit.casoInstance

    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearCaso: FloatingActionButton
    private lateinit var etBuscarCaso: EditText
    private lateinit var btnBuscarCaso: Button
    private lateinit var btnVolverHome: ImageButton

    private lateinit var adapter: CasosAdapter
    private val listaCasos = mutableListOf<Caso>()
    private val listaCasosOriginal = mutableListOf<Caso>()

    private var primeraCargaRealizada = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gestion_casos)

        inicializarVista()
        configurarRecyclerView()
        configurarEventos()

        if (!primeraCargaRealizada) {
            obtenerCasos(forzar = true)
            primeraCargaRealizada = true
        }
    }

    private fun inicializarVista() {
        etBuscarCaso = findViewById(R.id.etBuscarCaso)
        btnBuscarCaso = findViewById(R.id.btnBuscarCaso)
        recyclerView = findViewById(R.id.recyclerCasos)
        btnCrearCaso = findViewById(R.id.btnCrearCaso)
        btnVolverHome = findViewById(R.id.btnVolverHome)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.layoutGestionCasos)) { _, insets -> insets }
    }

    private fun configurarRecyclerView() {
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = CasosAdapter(
            context = this,
            listaCasos = listaCasos,
            onVerDetalles = { verDetallesCaso(it) },
            onDesactivar = { caso, pos -> desactivarCaso(caso, pos) }
        )
        recyclerView.adapter = adapter
    }

    private fun configurarEventos() {
        btnBuscarCaso.setOnClickListener {
            btnBuscarCaso.isEnabled = false
            Handler(Looper.getMainLooper()).postDelayed({
                btnBuscarCaso.isEnabled = true
            }, 800)

            val texto = etBuscarCaso.text.toString().trim()
            filtrarCasos(texto)
        }

        btnCrearCaso.setOnClickListener {
            val intent = Intent(this, CrearCasoActivity::class.java)
            crearCasoLauncher.launch(intent)
        }

        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }

    private fun obtenerCasos(forzar: Boolean = false) {
        if (listaCasosOriginal.isNotEmpty() && !forzar) {
            Log.d("GestionCasos", "Usando lista cacheada")
            return
        }

        controladorCaso.obtenerCasos().enqueue(object : Callback<List<Caso>> {
            override fun onResponse(call: Call<List<Caso>>, response: Response<List<Caso>>) {
                if (response.isSuccessful) {
                    response.body()?.let { casos ->
                        listaCasos.clear()
                        listaCasosOriginal.clear()
                        listaCasos.addAll(casos)
                        listaCasosOriginal.addAll(casos)
                        adapter.notifyDataSetChanged()
                    }
                } else {
                    mostrarMensaje("Error al obtener casos")
                }
            }

            override fun onFailure(call: Call<List<Caso>>, t: Throwable) {
                mostrarMensaje("Fallo en la conexión: ${t.message}")
            }
        })
    }

    private fun filtrarCasos(textoBuscar: String) {
        val resultados = if (textoBuscar.isEmpty()) {
            listaCasosOriginal
        } else {
            listaCasosOriginal.filter {
                it.nombreCaso.contains(textoBuscar, ignoreCase = true)
            }
        }

        listaCasos.clear()
        listaCasos.addAll(resultados)
        adapter.notifyDataSetChanged()
    }

    private fun verDetallesCaso(caso: Caso) {
        val intent = Intent(this, DetallesCasoActivity::class.java).apply {
            putExtra("CASO_ID", caso.id)
        }
        startActivity(intent)
    }

    private fun desactivarCaso(caso: Caso, position: Int) {
        caso.id?.let { casoId ->
            controladorCaso.desactivarCaso(casoId).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        listaCasos[position].activo = false
                        adapter.notifyItemChanged(position)
                        mostrarMensaje("Caso desactivado correctamente")
                    } else {
                        mostrarMensaje("Error al desactivar caso")
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    mostrarMensaje("Error de conexión: ${t.message}")
                }
            })
        } ?: mostrarMensaje("ID del caso no válido")
    }

    private fun mostrarMensaje(mensaje: String) {
        Toast.makeText(this, mensaje, Toast.LENGTH_SHORT).show()
    }

    override fun onResume() {
        super.onResume()
        Log.d("Lifecycle", "onResume llamado")
        // No volvemos a llamar a obtenerCasos aquí para evitar recarga innecesaria
    }
}
