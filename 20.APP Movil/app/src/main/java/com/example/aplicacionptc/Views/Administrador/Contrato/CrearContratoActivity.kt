package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.os.Bundle
import android.text.method.ScrollingMovementMethod
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.HtmlCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ControladorContrato
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.textfield.TextInputEditText
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Calendar

class CrearContratoActivity : AppCompatActivity() {

    private lateinit var clienteSpinner: Spinner
    private lateinit var detectiveSpinner: Spinner
    private lateinit var fechaInicioEditText: EditText
    private lateinit var fechaFinalEditText: EditText
    private lateinit var descripcionEditText: EditText
    private lateinit var estadoEditText: EditText
    private lateinit var crearContratoButton: Button
    private lateinit var clausulasEditText: TextInputEditText
    private lateinit var tarifaEditText: EditText


    private var clientesList = listOf<Clientes>()
    private var detectivesList = listOf<Detectives>()

    private val apiClientes: ControladorCliente = Retrofit.clienteInstance
    private val apiDetectives: ControladorDetective = Retrofit.detectiveInstance
    private val apiContrato: ControladorContrato = Retrofit.contratoInstance

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_contrato)

        clienteSpinner = findViewById(R.id.spinner_cliente)
        detectiveSpinner = findViewById(R.id.spinner_detective)
        fechaInicioEditText = findViewById(R.id.editText_fecha_inicio)
        fechaFinalEditText = findViewById(R.id.editText_fecha_final)
        descripcionEditText = findViewById(R.id.editText_descripcion)
        estadoEditText = findViewById(R.id.editText_estado)
        crearContratoButton = findViewById(R.id.button_crear_contrato)
        clausulasEditText = findViewById(R.id.editText_clausulas)
        clausulasEditText.setText(getString(R.string.clausulas_predefinidas))
        tarifaEditText = findViewById(R.id.editText_tarifa)



        clausulasEditText.movementMethod = ScrollingMovementMethod()
        clausulasEditText.setText(
            HtmlCompat.fromHtml(
                getString(R.string.clausulas_predefinidas),
                HtmlCompat.FROM_HTML_MODE_LEGACY
            )
        )
        clausulasEditText.setMovementMethod(ScrollingMovementMethod.getInstance())
        clausulasEditText.setVerticalScrollBarEnabled(true)
        clausulasEditText.isVerticalScrollBarEnabled = true
        clausulasEditText.setHorizontallyScrolling(false)
        clausulasEditText.isEnabled = false       // Desactiva entrada de texto
        clausulasEditText.isFocusable = false     // No permite enfocar (ni el cursor)
        clausulasEditText.isClickable = false     // No permite interacción


        val calendario = Calendar.getInstance()
        val anio = calendario.get(Calendar.YEAR)
        val mes = calendario.get(Calendar.MONTH)
        val dia = calendario.get(Calendar.DAY_OF_MONTH)

// Formatear la fecha como dd/MM/yyyy
        val fechaActual = String.format("%04d-%02d-%02d", anio, mes + 1, dia)
        fechaInicioEditText.setText(fechaActual)


// Desactivar edición y clics
        fechaInicioEditText.isEnabled = false       // No permite escribir
        fechaInicioEditText.isFocusable = false     // No permite seleccionar
        fechaInicioEditText.isClickable = false     // No permite abrir ningún DatePicker

        fechaFinalEditText.setOnClickListener {
            val calendario = Calendar.getInstance()
            val anio = calendario.get(Calendar.YEAR)
            val mes = calendario.get(Calendar.MONTH)
            val dia = calendario.get(Calendar.DAY_OF_MONTH)

            val datePicker = DatePickerDialog(this, { _, year, month, dayOfMonth ->
                val fechaSeleccionada = String.format("%04d-%02d-%02d", year, month + 1, dayOfMonth)


                fechaFinalEditText.setText(fechaSeleccionada)
            }, anio, mes, dia)

            datePicker.show()
        }

        estadoEditText.setText("Activo")
        estadoEditText.isEnabled = false
        estadoEditText.isFocusable = false
        estadoEditText.isClickable = false


        obtenerClientes()
        obtenerDetectives()

        crearContratoButton.setOnClickListener {
            crearContrato()
        }
    }

    private fun obtenerClientes() {
        apiClientes.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful) {
                    clientesList = response.body() ?: emptyList()
                    val nombresClientes = clientesList.map { it.nombres }
                    val adapter =
                        ArrayAdapter(this@CrearContratoActivity, android.R.layout.simple_spinner_item, nombresClientes)
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    clienteSpinner.adapter = adapter
                } else {
                    Toast.makeText(this@CrearContratoActivity, "Error al cargar clientes", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Toast.makeText(this@CrearContratoActivity, "Fallo: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun obtenerDetectives() {
        apiDetectives.obtenerDetectives().enqueue(object : Callback<List<Detectives>> {
            override fun onResponse(call: Call<List<Detectives>>, response: Response<List<Detectives>>) {
                if (response.isSuccessful) {
                    detectivesList = response.body() ?: emptyList()
                    val nombresDetectives = detectivesList.map { it.nombres }
                    val adapter = ArrayAdapter(
                        this@CrearContratoActivity,
                        android.R.layout.simple_spinner_item,
                        nombresDetectives
                    )
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    detectiveSpinner.adapter = adapter
                } else {
                    Toast.makeText(this@CrearContratoActivity, "Error al cargar detectives", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Detectives>>, t: Throwable) {
                Toast.makeText(this@CrearContratoActivity, "Fallo: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun crearContrato() {
        val clienteSeleccionado = clientesList.getOrNull(clienteSpinner.selectedItemPosition)
        val detectiveSeleccionado = detectivesList.getOrNull(detectiveSpinner.selectedItemPosition)

        if (clienteSeleccionado == null || detectiveSeleccionado == null) {
            Toast.makeText(this, "Debes seleccionar un cliente y un detective", Toast.LENGTH_SHORT).show()
            return
        }

        val fechaInicio = fechaInicioEditText.text.toString()
        val fechaFinal = fechaFinalEditText.text.toString()
        val descripcion = descripcionEditText.text.toString()
        val tarifaTexto = tarifaEditText.text.toString()

        if (tarifaTexto.isBlank()) {
            Toast.makeText(this, "La tarifa no puede estar vacía", Toast.LENGTH_SHORT).show()
            return
        }

// validación de número (opcional pero recomendada)
        val tarifa = try {
            tarifaTexto.toBigDecimal().toPlainString()
        } catch (e: NumberFormatException) {
            Toast.makeText(this, "Tarifa inválida", Toast.LENGTH_SHORT).show()
            return
        }


        val estado = true
        val clausulas = clausulasEditText.text.toString()

        val nuevoContrato = Contrato(
            descripcionServicio = descripcion,
            fechaInicio = fechaInicio,
            fechaCierre = fechaFinal,
            clausulas = clausulas,
            tarifa = tarifa,
            estado = estado,
            idCliente = clienteSeleccionado.id,
            nombreCliente = clienteSeleccionado.nombres,
            idDetective = detectiveSeleccionado.id,
            nombreDetective = detectiveSeleccionado.nombres
        )


        apiContrato.crearContrato(nuevoContrato).enqueue(object : Callback<Contrato> {
            override fun onResponse(call: Call<Contrato>, response: Response<Contrato>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CrearContratoActivity, "Contrato creado con éxito", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(
                        this@CrearContratoActivity,
                        "Error al crear contrato ${response.errorBody()?.string()}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onFailure(call: Call<Contrato>, t: Throwable) {
                Toast.makeText(this@CrearContratoActivity, "Fallo: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }
}
