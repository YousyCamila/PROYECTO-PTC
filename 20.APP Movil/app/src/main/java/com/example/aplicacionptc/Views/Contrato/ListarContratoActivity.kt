package com.example.aplicacionptc.Views.Contrato

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.RadioGroup
import android.widget.Spinner
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ContratoController
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives

class ListarContratoActivity : AppCompatActivity() {

    private lateinit var radioGroupTipoPersona: RadioGroup
    private lateinit var spinnerPersonas: Spinner
    private lateinit var listViewContratos: ListView

    private var listaClientes = Clientes.clientes
    private var listaDetectives = Detectives.listaDetectives
    private var listaContratos = ContratoController.listaContratos

    private var personaSeleccionada: Any? = null
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_listar_contrato)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        radioGroupTipoPersona = findViewById(R.id.radioGroupTipoPersona)
        spinnerPersonas = findViewById(R.id.spinnerPersonas)
        listViewContratos = findViewById(R.id.listViewContratos)


        radioGroupTipoPersona.setOnCheckedChangeListener { _, checkedId ->
            when (checkedId) {
                R.id.radioCliente -> cargarPersonas(listaClientes.map { it.personas.nombre })
                R.id.radioDetective -> cargarPersonas(listaDetectives.map { it.personas.nombre })
            }
        }


        spinnerPersonas.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View?,
                position: Int,
                id: Long
            ) {
                personaSeleccionada = if (radioGroupTipoPersona.checkedRadioButtonId == R.id.radioCliente) {
                    listaClientes[position]
                } else {
                    listaDetectives[position]
                }

                mostrarContratos(personaSeleccionada)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }
    }


    private fun cargarPersonas(nombres: List<String>) {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, nombres)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerPersonas.adapter = adapter
    }


    private fun mostrarContratos(persona: Any?) {
        val contratosFiltrados = listaContratos.filter { contrato ->
            when (persona) {
                is Clientes -> contrato.getCliente() == persona
                is Detectives -> contrato.getDetective() == persona
                else -> false
            }
        }


        val adapter = ContratoAdapter(this, contratosFiltrados)
        listViewContratos.adapter = adapter
    }
}
