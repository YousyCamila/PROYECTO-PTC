package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SwitchCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearCasoActivity : AppCompatActivity() {

    private lateinit var etNombreCaso: EditText
    private lateinit var autoCliente: AutoCompleteTextView
    private lateinit var autoDetective: AutoCompleteTextView
    private lateinit var switchActivo: SwitchCompat
    private lateinit var btnGuardar: Button
    private lateinit var btnVolver: ImageButton

    private val controladorCaso = Retrofit.casoInstance
    private val controladorCliente = Retrofit.clienteInstance
    private val controladorDetective = Retrofit.detectiveInstance

    private var listaClientes: List<Clientes> = emptyList()
    private var listaDetectives: List<Detectives> = emptyList()

    private var clienteSeleccionado: Clientes? = null
    private var detectiveSeleccionado: Detectives? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_caso)

        etNombreCaso = findViewById(R.id.etNombreCaso)
        autoCliente = findViewById(R.id.autoCliente)
        autoDetective = findViewById(R.id.autoDetective)
        switchActivo = findViewById(R.id.switchActivo)
        btnGuardar = findViewById(R.id.btnGuardar)
        btnVolver = findViewById(R.id.btnVolver)

        btnVolver.setOnClickListener { finish() }
        btnGuardar.setOnClickListener { crearCaso() }

        cargarClientes()
        cargarDetectives()
    }

    private fun cargarClientes() {
        controladorCliente.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful) {
                    listaClientes = response.body() ?: emptyList()
                    val nombres = listaClientes.map { "${it.nombres} ${it.apellidos}" }
                    val adapter = ArrayAdapter(this@CrearCasoActivity, android.R.layout.simple_dropdown_item_1line, nombres)
                    autoCliente.setAdapter(adapter)

                    autoCliente.setOnItemClickListener { _, _, position, _ ->
                        clienteSeleccionado = listaClientes[position]
                    }
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error al cargar clientes", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun cargarDetectives() {
        controladorDetective.obtenerDetectives().enqueue(object : Callback<List<Detectives>> {
            override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                if (response.isSuccessful) {
                    listaDetectives = response.body() ?: emptyList()
                    val nombres = listaDetectives.map { "${it.nombres} ${it.apellidos}" }
                    val adapter = ArrayAdapter(this@CrearCasoActivity, android.R.layout.simple_dropdown_item_1line, nombres)
                    autoDetective.setAdapter(adapter)

                    autoDetective.setOnItemClickListener { _, _, position, _ ->
                        detectiveSeleccionado = listaDetectives[position]
                    }
                }
            }

            override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error al cargar detectives", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun crearCaso() {
        val nombreCaso = etNombreCaso.text.toString().trim()
        val activo = switchActivo.isChecked

        if (nombreCaso.isEmpty() || clienteSeleccionado == null || detectiveSeleccionado == null) {
            Toast.makeText(this, "Completa todos los campos correctamente", Toast.LENGTH_SHORT).show()
            return
        }

        val nuevoCaso = Caso(
            nombreCaso = nombreCaso,
            idCliente = clienteSeleccionado,
            idDetective = detectiveSeleccionado,
            activo = activo
        )

        controladorCaso.crearCaso(nuevoCaso).enqueue(object : Callback<Caso> {
            override fun onResponse(call: Call<Caso>, response: Response<Caso>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CrearCasoActivity, "Caso creado exitosamente", Toast.LENGTH_SHORT).show()
                    setResult(Activity.RESULT_OK)
                    finish()
                } else {
                    Toast.makeText(this@CrearCasoActivity, "Error al crear el caso", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Caso>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error de red: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
