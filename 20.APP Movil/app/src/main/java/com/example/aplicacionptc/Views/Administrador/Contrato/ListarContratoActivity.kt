package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ContratoController
import com.example.aplicacionptc.R
import com.example.aplicacionptc.Views.Contrato.ContratoAdapter
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.ptc_app.Models.Administrador.Contrato.ModelContrato
import com.google.android.material.button.MaterialButton
import com.google.android.material.chip.ChipGroup
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import com.google.android.material.floatingactionbutton.FloatingActionButton

class ListarContratoActivity : AppCompatActivity() {

    private lateinit var radioGroupTipoPersona: ChipGroup
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
        val btnCrearContratoN = findViewById<ExtendedFloatingActionButton>(R.id.btnCrearContratoN)
        val btnVolverHome = findViewById<ImageButton>(R.id.btnVolverHome)


        btnCrearContratoN.setOnClickListener{
            startActivity(Intent(this, CrearContratoActivity::class.java))
        }

        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, HomeContratoActivity::class.java))
            finish()
        }

        radioGroupTipoPersona = findViewById(R.id.radioGroupTipoPersona)
        spinnerPersonas = findViewById(R.id.spinnerPersonas)
        listViewContratos = findViewById(R.id.listViewContratos)


        radioGroupTipoPersona.setOnCheckedChangeListener { _, checkedId ->
            when (checkedId) {
                R.id.radioCliente -> cargarPersonas(listaClientes.map { it.nombre })
                R.id.radioDetective -> cargarPersonas(listaDetectives.map { it.personas.nombre })
            }
        }


        spinnerPersonas.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                personaSeleccionada = if (radioGroupTipoPersona.checkedChipId  == R.id.radioCliente) {
                    listaClientes[position]
                } else {
                    listaDetectives[position]
                }


                mostrarContratos(personaSeleccionada)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }


        cargarPersonas(listaClientes.map { it.nombre })
        personaSeleccionada = listaClientes.firstOrNull()
        mostrarContratos(personaSeleccionada)
    }


    private fun cargarPersonas(nombres: List<String>) {
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, nombres)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerPersonas.adapter = adapter
    }


    private fun mostrarContratos(persona: Any?) {
        val contratosFiltrados: List<ModelContrato> = listaContratos.filter { contrato ->
            when (persona) {
                is Clientes -> contrato.getCliente().nombre == persona.nombre
                is Detectives -> contrato.getDetective().personas.nombre == persona.personas.nombre
                else -> false
            }
        }


        val adapter = ContratoAdapter(this, contratosFiltrados)
        listViewContratos.adapter = adapter
    }
}
