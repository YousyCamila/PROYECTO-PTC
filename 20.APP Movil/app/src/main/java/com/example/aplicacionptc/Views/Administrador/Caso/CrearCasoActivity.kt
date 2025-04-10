package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SwitchCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Administrador.Caso.CasoRequest
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

        Log.d("CrearCasoActivity", "onCreate iniciado")

        etNombreCaso = findViewById(R.id.etNombreCaso)
        autoCliente = findViewById(R.id.autoCliente)
        autoDetective = findViewById(R.id.autoDetective)
        switchActivo = findViewById(R.id.switchActivo)
        btnGuardar = findViewById(R.id.btnGuardar)
        btnVolver = findViewById(R.id.btnVolver)

        btnVolver.setOnClickListener {
            Log.d("CrearCasoActivity", "Botón volver presionado")
            finish()
        }

        btnGuardar.setOnClickListener {
            Log.d("CrearCasoActivity", "Botón guardar presionado")
            crearCaso()
        }

        autoCliente.setOnFocusChangeListener { v, hasFocus ->
            if (hasFocus) (v as AutoCompleteTextView).showDropDown()
        }

        autoDetective.setOnFocusChangeListener { v, hasFocus ->
            if (hasFocus) (v as AutoCompleteTextView).showDropDown()
        }

        autoCliente.setOnClickListener {
            autoCliente.showDropDown()
        }

        autoDetective.setOnClickListener {
            autoDetective.showDropDown()
        }

        cargarClientes()
        cargarDetectives()
    }

    private fun cargarClientes() {
        Log.d("CrearCasoActivity", "Cargando clientes")
        controladorCliente.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful) {
                    listaClientes = response.body() ?: emptyList()
                    Log.d("CrearCasoActivity", "Clientes obtenidos: ${listaClientes.size}")
                    val nombres = listaClientes.map { "${it.nombres} ${it.apellidos}" }
                    val adapter = ArrayAdapter(this@CrearCasoActivity, android.R.layout.simple_dropdown_item_1line, nombres)
                    autoCliente.setAdapter(adapter)

                    autoCliente.setOnItemClickListener { _, _, position, _ ->
                        clienteSeleccionado = listaClientes[position]
                        Log.d("CrearCasoActivity", "Cliente seleccionado: ${clienteSeleccionado?.nombres}")
                    }
                } else {
                    Log.e("CrearCasoActivity", "Error al obtener clientes: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error al cargar clientes", Toast.LENGTH_SHORT).show()
                Log.e("CrearCasoActivity", "Fallo al cargar clientes", t)
            }
        })
    }

    private fun cargarDetectives() {
        Log.d("CrearCasoActivity", "Cargando detectives")
        controladorDetective.obtenerDetectives().enqueue(object : Callback<List<Detectives>> {
            override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                if (response.isSuccessful) {
                    listaDetectives = response.body() ?: emptyList()
                    Log.d("CrearCasoActivity", "Detectives obtenidos: ${listaDetectives.size}")
                    val nombres = listaDetectives.map { "${it.nombres} ${it.apellidos}" }
                    val adapter = ArrayAdapter(this@CrearCasoActivity, android.R.layout.simple_dropdown_item_1line, nombres)
                    autoDetective.setAdapter(adapter)

                    autoDetective.setOnItemClickListener { _, _, position, _ ->
                        detectiveSeleccionado = listaDetectives[position]
                        Log.d("CrearCasoActivity", "Detective seleccionado: ${detectiveSeleccionado?.nombres}")
                    }
                } else {
                    Log.e("CrearCasoActivity", "Error al obtener detectives: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error al cargar detectives", Toast.LENGTH_SHORT).show()
                Log.e("CrearCasoActivity", "Fallo al cargar detectives", t)
            }
        })
    }

    private fun crearCaso() {
        val nombreCaso = etNombreCaso.text.toString().trim()
        val activo = switchActivo.isChecked

        Log.d("CrearCasoActivity", "Nombre del caso: $nombreCaso")
        Log.d("CrearCasoActivity", "Activo: $activo")

        if (nombreCaso.isEmpty() || clienteSeleccionado == null || detectiveSeleccionado == null) {
            Toast.makeText(this, "Completa todos los campos correctamente", Toast.LENGTH_SHORT).show()
            Log.w("CrearCasoActivity", "Campos incompletos")
            return
        }

        val idCliente = clienteSeleccionado!!.id
        val idDetective = detectiveSeleccionado!!.id

        val objectIdRegex = Regex("^[a-fA-F0-9]{24}$")

        if (idCliente.isNullOrEmpty() || !objectIdRegex.matches(idCliente)) {
            Toast.makeText(this, "ID del cliente no es válido", Toast.LENGTH_SHORT).show()
            Log.e("CrearCasoActivity", "ID cliente inválido: $idCliente")
            return
        }

        if (idDetective.isNullOrEmpty() || !objectIdRegex.matches(idDetective)) {
            Toast.makeText(this, "ID del detective no es válido", Toast.LENGTH_SHORT).show()
            Log.e("CrearCasoActivity", "ID detective inválido: $idDetective")
            return
        }

        val nuevoCaso = CasoRequest(
            nombreCaso = nombreCaso,
            idCliente = idCliente,
            idDetective = idDetective,
            activo = activo
        )

        val gson = com.google.gson.Gson()
        val json = gson.toJson(nuevoCaso)
        Log.d("CASO_JSON", json)

        controladorCaso.crearCaso(nuevoCaso).enqueue(object : Callback<CasoRequest> {
            override fun onResponse(call: Call<CasoRequest>, response: Response<CasoRequest>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CrearCasoActivity, "Caso creado exitosamente", Toast.LENGTH_SHORT).show()
                    Log.i("CrearCasoActivity", "Caso creado con éxito")
                    //setResult(Activity.RESULT_OK)
                    //finish()
                } else {
                    val errorBody = response.errorBody()?.string()
                    Toast.makeText(this@CrearCasoActivity, "Error al crear el caso: ${response.code()}", Toast.LENGTH_LONG).show()
                    Log.e("CrearCasoActivity", "Error al crear caso: $errorBody")
                }
            }

            override fun onFailure(call: Call<CasoRequest>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Fallo en la conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                Log.e("CrearCasoActivity", "Fallo en la conexión al crear caso", t)
            }
        })
    }
}
