package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
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
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.MaterialAutoCompleteTextView
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class CrearContratoActivity : AppCompatActivity() {

    @SuppressLint("MissingInflatedId", "WrongViewCast")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_contrato)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val spinnerCliente = findViewById<MaterialAutoCompleteTextView>(R.id.spinnerCliente)
        val spinnerDetective = findViewById<MaterialAutoCompleteTextView>(R.id.spinnerDetective)


        val etDescripcion = findViewById<EditText>(R.id.etDescripcion)
        val etFechaIni = findViewById<EditText>(R.id.etFechaIni)
        val etFechaFin = findViewById<EditText>(R.id.etFechaFin)
        val etClausulas = findViewById<EditText>(R.id.etClausulas)
        val etTarifa = findViewById<EditText>(R.id.etTarifa)
        val btnGuardarContrato = findViewById<MaterialButton>(R.id.btnGuardarContrato)
        val btnVolverHome = findViewById<ImageButton>(R.id.btnVolverHome)

        // Adaptadores para clientes y detectives
        val adapterClientes = ArrayAdapter(
            this, android.R.layout.simple_dropdown_item_1line,
            Clientes.clientes.map { it.personas.nombre }
        )
        spinnerCliente.setAdapter(adapterClientes)

        val adapterDetectives = ArrayAdapter(
            this, android.R.layout.simple_dropdown_item_1line,
            Detectives.listaDetectives.map { it.personas.nombre }
        )
        spinnerDetective.setAdapter(adapterDetectives)

        // Configuración de fecha actual por defecto
        val calendar = Calendar.getInstance()
        val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        etFechaIni.setText(dateFormat.format(calendar.time))
        etFechaIni.isFocusable = false
        etFechaIni.isClickable = true

        etFechaIni.setOnClickListener {
            val datePickerDialog = DatePickerDialog(this, { _, y, m, d ->
                etFechaIni.setText(String.format("%02d/%02d/%04d", d, m + 1, y))
            }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))
            datePickerDialog.show()
        }

        // Fecha fin
        etFechaFin.isFocusable = false
        etFechaFin.isClickable = true
        etFechaFin.setOnClickListener {
            val datePickerDialog = DatePickerDialog(this, { _, y, m, d ->
                etFechaFin.setText(String.format("%02d/%02d/%04d", d, m + 1, y))
            }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))
            datePickerDialog.show()
        }

        // Guardar contrato
        btnGuardarContrato.setOnClickListener {
            val descripcion = etDescripcion.text.toString().trim()
            val fechaInicioStr = etFechaIni.text.toString().trim()
            val fechaCierreStr = etFechaFin.text.toString().trim()
            val clausulas = etClausulas.text.toString().trim()
            val tarifaStr = etTarifa.text.toString().trim()

            if (descripcion.isEmpty() || fechaInicioStr.isEmpty() || fechaCierreStr.isEmpty() || clausulas.isEmpty() || tarifaStr.isEmpty()) {
                Toast.makeText(this, "Llene todos los campos, POR FAVOR", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val formatoFecha = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
            val fechaInicio = formatoFecha.parse(fechaInicioStr) ?: Date()
            val fechaCierre = formatoFecha.parse(fechaCierreStr) ?: Date()
            val tarifa = tarifaStr.toFloatOrNull() ?: 0f

            val nombreCliente = spinnerCliente.text.toString()
            val clienteSeleccionado = Clientes.clientes.firstOrNull { it.personas.nombre == nombreCliente }

            val nombreDetective = spinnerDetective.text.toString()
            val detectiveSeleccionado = Detectives.listaDetectives.firstOrNull { it.personas.nombre == nombreDetective }

            if (clienteSeleccionado == null || detectiveSeleccionado == null) {
                Toast.makeText(this, "Seleccione un cliente y un detective válidos", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val nuevoContrato = ModelContrato(
                descripcionServicio = descripcion,
                fechaInicio = fechaInicio,
                fechaCierre = fechaCierre,
                clausulas = clausulas,
                tarifa = tarifa,
                estado = true,
                cliente = clienteSeleccionado,
                detective = detectiveSeleccionado
            )

            // Usar la lista estática del modelo
            ContratoController.listaContratos.add(nuevoContrato)

            Toast.makeText(this, "Contrato creado exitosamente", Toast.LENGTH_SHORT).show()

            // Limpiar campos
            etDescripcion.text.clear()
            etFechaIni.setText(dateFormat.format(Date()))
            etFechaFin.text.clear()
            etClausulas.text.clear()
            etTarifa.text.clear()
        }

        // Volver al home
        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, HomeContratoActivity::class.java))
            finish()
        }
    }
}
