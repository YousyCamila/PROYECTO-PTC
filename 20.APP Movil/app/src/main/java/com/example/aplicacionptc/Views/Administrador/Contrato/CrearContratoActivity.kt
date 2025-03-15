package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ContratoController
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Contrato.ModelContrato
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CrearContratoActivity : AppCompatActivity() {

    private val listaModelContratoes = mutableListOf<ModelContrato>()

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_contrato)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets

        }
        val spinnerCliente = findViewById<Spinner>(R.id.spinnerCliente)
        val spinnerDetective = findViewById<Spinner>(R.id.spinnerDetective)
        val etDescripcion = findViewById<EditText>(R.id.etDescripcion)
        val etFechaIni = findViewById<EditText>(R.id.etFechaIni)
        val etFechaFin = findViewById<EditText>(R.id.etFechaFin)
        val etClausulas = findViewById<EditText>(R.id.etClausulas)
        val etTarifa = findViewById<EditText>(R.id.etTarifa)
        val btnGuardarContrato = findViewById<Button>(R.id.btnGuardarContrato)

        val adapterClientes = ArrayAdapter(
            this, android.R.layout.simple_spinner_item,
            Clientes.clientes.map{it.personas.nombre+ "" }
        )
        adapterClientes.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerCliente.adapter =adapterClientes

        val adapterDetectives = ArrayAdapter(
            this, android.R.layout.simple_spinner_item,
            Detectives.listaDetectives.map{it.personas.nombre + ""}
        )
        adapterDetectives.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerDetective.adapter= adapterDetectives

        btnGuardarContrato.setOnClickListener {
            val descripcion = etDescripcion.text.toString().trim()
            val fechaInicioStr = etFechaIni.text.toString().trim()
            val fechaCierre = etFechaFin.text.toString().trim()
            val clausulas = etClausulas.text.toString().trim()
            val tarifaStr = etTarifa.text.toString().trim()

            if (descripcion.isEmpty()|| fechaInicioStr.isEmpty()|| fechaCierre.isEmpty()|| clausulas.isEmpty()|| tarifaStr.isEmpty()){
                Toast.makeText(this, "Llene todos los campos, POR FAVOR", Toast.LENGTH_SHORT).show()

                return@setOnClickListener
            }


            val formatoFecha = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
            val fechaInicio = formatoFecha.parse(fechaInicioStr) ?: Date()
            val fechaFin = formatoFecha.parse(fechaInicioStr) ?: Date()
            val tarifa = tarifaStr.toFloatOrNull() ?: 0f


            val clienteSeleccionado = Clientes.clientes[spinnerCliente.selectedItemPosition]
            val detectiveSeleccionado = Detectives.listaDetectives[spinnerDetective.selectedItemPosition]


            val nuevoContrato = ModelContrato(
                descripcionServicio = descripcion,
                fechaInicio = fechaInicio,
                fechaCierre = fechaFin,
                clausulas = clausulas,
                tarifa = tarifa,
                estado = true,
                cliente = clienteSeleccionado,
                detective = detectiveSeleccionado
            )

            ContratoController.listaContratos.add(nuevoContrato)

            Toast.makeText(this, "Contrato creado exitosamente", Toast.LENGTH_SHORT).show()


            etDescripcion.text.clear()
            etFechaIni.text.clear()
            etFechaFin.text.clear()
            etClausulas.text.clear()
            etTarifa.text.clear()
        }
    }
}


