package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.chip.ChipGroup
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ListarContratoActivity : AppCompatActivity() {

    private lateinit var radioGroupTipoPersona: ChipGroup
    private lateinit var spinnerPersonas: Spinner
    private lateinit var listViewContratos: ListView

    private var listaClientes = listOf<Clientes>()
    private var listaDetectives = listOf<Detectives>()
    private var personaSeleccionadaId: String? = null
    private var tipoSeleccionado: String = "cliente"

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_listar_contrato)

        val btnCrearContratoN = findViewById<ExtendedFloatingActionButton>(R.id.btnCrearContratoN)
        val btnVolverHome = findViewById<ImageButton>(R.id.btnVolverHome)

        radioGroupTipoPersona = findViewById(R.id.radioGroupTipoPersona)
        spinnerPersonas = findViewById(R.id.spinnerPersonas)
        listViewContratos = findViewById(R.id.listViewContratos)

        // Cargar datos desde backend
        cargarClientes()
        cargarDetectives()

        btnCrearContratoN.setOnClickListener {
            startActivity(Intent(this, CrearContratoActivity::class.java))
        }

        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, HomeContratoActivity::class.java))
            finish()
        }

        // Manejador de cambio en tipo de persona
        radioGroupTipoPersona.setOnCheckedChangeListener { _, checkedId ->
            if (checkedId == R.id.radioCliente) {
                tipoSeleccionado = "cliente"
                cargarPersonas(listaClientes.map { it.nombres })
                personaSeleccionadaId = listaClientes.firstOrNull()?.id
            } else {
                tipoSeleccionado = "detective"
                cargarPersonas(listaDetectives.map { it.nombres })
                personaSeleccionadaId = listaDetectives.firstOrNull()?.id
            }
            obtenerContratos()
        }

        spinnerPersonas.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                personaSeleccionadaId = if (tipoSeleccionado == "cliente") {
                    listaClientes[position].id
                } else {
                    listaDetectives[position].id
                }
                obtenerContratos()
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }
    }

    private fun cargarClientes() {
        Retrofit.clienteInstance.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful && response.body() != null) {
                    listaClientes = response.body()!!
                    if (tipoSeleccionado == "cliente") {
                        cargarPersonas(listaClientes.map { it.nombres })
                        personaSeleccionadaId = listaClientes.firstOrNull()?.id
                        obtenerContratos()
                    }
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Toast.makeText(this@ListarContratoActivity, "Error al cargar clientes", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun cargarDetectives() {
        Retrofit.detectiveInstance.obtenerDetectives().enqueue(object : Callback<List<Detectives>> {
            override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                if (response.isSuccessful && response.body() != null) {
                    listaDetectives = response.body()!!
                    if (tipoSeleccionado == "detective") {
                        cargarPersonas(listaDetectives.map { it.nombres })
                        personaSeleccionadaId = listaDetectives.firstOrNull()?.id
                        obtenerContratos()
                    }
                }
            }

            override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                Toast.makeText(this@ListarContratoActivity, "Error al cargar detectives", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun cargarPersonas(nombres: List<String>) {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, nombres)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerPersonas.adapter = adapter
    }

    private fun obtenerContratos() {
        if (personaSeleccionadaId == null) return

        val call: Call<List<Contrato>> = if (tipoSeleccionado == "detective") {
            Retrofit.contratoInstance.listarContratosPorDetective(personaSeleccionadaId!!)
        } else {
            Retrofit.contratoInstance.listarContratos() // Filtro manual para cliente
        }

        call.enqueue(object : Callback<List<Contrato>> {
            override fun onResponse(call: Call<List<Contrato>>, response: Response<List<Contrato>>) {
                if (response.isSuccessful) {
                    val contratos = response.body() ?: emptyList()
                    val filtrados = if (tipoSeleccionado == "cliente") {
                        contratos.filter { it.idCliente == personaSeleccionadaId }
                    } else {
                        contratos
                    }
                    listViewContratos.adapter = ContratoAdapter(this@ListarContratoActivity, filtrados)
                } else {
                    Toast.makeText(this@ListarContratoActivity, "Error al obtener contratos", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Contrato>>, t: Throwable) {
                Toast.makeText(this@ListarContratoActivity, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
