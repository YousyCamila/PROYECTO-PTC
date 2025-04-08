package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ControladorContrato
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearContratoActivity : AppCompatActivity() {

    private lateinit var clienteSpinner: Spinner
    private lateinit var detectiveSpinner: Spinner
    private lateinit var fechaInicioEditText: EditText
    private lateinit var fechaFinalEditText: EditText
    private lateinit var descripcionEditText: EditText
    private lateinit var estadoEditText: EditText
    private lateinit var crearContratoButton: Button
    private lateinit var clausulasEditText: EditText


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
                    val adapter = ArrayAdapter(this@CrearContratoActivity, android.R.layout.simple_spinner_item, nombresClientes)
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
                    val adapter = ArrayAdapter(this@CrearContratoActivity, android.R.layout.simple_spinner_item, nombresDetectives)
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
        val tarifa = "200000" // Puedes reemplazar con un campo si quieres ingresarla desde el layout
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
                    Toast.makeText(this@CrearContratoActivity, "Error al crear contrato", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Contrato>, t: Throwable) {
                Toast.makeText(this@CrearContratoActivity, "Fallo: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }
}
