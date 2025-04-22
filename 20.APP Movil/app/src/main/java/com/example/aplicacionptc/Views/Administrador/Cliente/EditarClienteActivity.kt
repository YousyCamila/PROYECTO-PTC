package com.example.aplicacionptc.Views.Administrador.Cliente

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.aplicacionptc.Validaciones.Validaciones.esNombreValido
import com.example.aplicacionptc.Validaciones.Validaciones.esEmailValido
import com.example.aplicacionptc.Validaciones.Validaciones.toUpperCaseSafe



class EditarClienteActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etApellidos: EditText
    private lateinit var etId: EditText
    private lateinit var etCorreo: EditText
    private lateinit var etTipoDocumento: EditText
    private lateinit var etNumeroDocumento: EditText
    private lateinit var etActivo: AutoCompleteTextView
    private lateinit var btnGuardar: Button
    private lateinit var controladorCliente: ControladorCliente
    private var idCliente: String? = null

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_editar_cliente)

        controladorCliente = Retrofit.clienteInstance

        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)
        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
            finish()
        }



        // Inicialización de campos
        etNombre = findViewById(R.id.edtNombre)
        etApellidos = findViewById(R.id.edtApellidos)
        etId = findViewById(R.id.edtId)
        etCorreo = findViewById(R.id.edtCorreo)
        etTipoDocumento = findViewById(R.id.edtTipoDocumento)
        etNumeroDocumento = findViewById(R.id.edtNumeroDocumento)
        etActivo = findViewById(R.id.edtActivo)
        btnGuardar = findViewById(R.id.btnGuardar)

        // Deshabilitar edición de ID y Tipo de Documento
        etId.isEnabled = false
        etId.isFocusable = false
        etTipoDocumento.isEnabled = false
        etTipoDocumento.isFocusable = false

        etId.setTextColor(resources.getColor(R.color.gris, theme))
        etTipoDocumento.setTextColor(resources.getColor(R.color.gris, theme))

        // Configurar opciones del campo "Activo"
        val opcionesEstado = arrayOf("Activo", "Inactivo")
        val adapterEstado = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, opcionesEstado)

        etActivo.setAdapter(adapterEstado)
        etActivo.setOnClickListener {
            etActivo.showDropDown()
        }

        // Obtener datos del intent
        idCliente = intent.getStringExtra("id")
        idCliente?.let { cargarDatosCliente(it) }

        btnGuardar.setOnClickListener {
            actualizarCliente()
        }
    }

    private fun cargarDatosCliente(id: String) {
        controladorCliente.buscarClientePorId(id)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful) {
                        response.body()?.let { cliente ->
                            etNombre.setText(cliente.nombres)
                            etApellidos.setText(cliente.apellidos)
                            etId.setText(cliente.id)
                            etNumeroDocumento.setText(cliente.numeroDocumento)
                            etTipoDocumento.setText(cliente.tipoDocumento)
                            etCorreo.setText(cliente.correo)

                            // Configurar estado del cliente en el desplegable
                            val estadoActual = if (cliente.activo) "Activo" else "Inactivo"
                            etActivo.setText(estadoActual, false) // Seteamos sin abrir el dropdown
                        }
                    } else {
                        Toast.makeText(this@EditarClienteActivity, "No se encontró el cliente", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Clientes>, t: Throwable) {
                    Toast.makeText(this@EditarClienteActivity, "Error al cargar los datos", Toast.LENGTH_SHORT).show()
                }
            })
    }

    private fun actualizarCliente() {
        val nombre = etNombre.text.toString().trim()
        val apellidos = etApellidos.text.toString().trim()
        val correo = etCorreo.text.toString().trim()

        if (nombre.isBlank() || apellidos.isBlank() || correo.isBlank()) {
            Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        if (!nombre.esNombreValido()) {
            Toast.makeText(this, "Nombre no válido. Solo letras y espacios.", Toast.LENGTH_SHORT).show()
            return
        }

        if (!apellidos.esNombreValido()) {
            Toast.makeText(this, "Apellido no válido. Solo letras y espacios.", Toast.LENGTH_SHORT).show()
            return
        }

        if (!correo.esEmailValido()) {
            Toast.makeText(this, "Correo electrónico no válido", Toast.LENGTH_SHORT).show()
            return
        }

        idCliente?.let { id ->
            val clienteActualizado = Clientes(
                id = id,
                tipoDocumento = etTipoDocumento.text.toString(),
                numeroDocumento = etNumeroDocumento.text.toString(),
                nombres = nombre.toUpperCaseSafe(),
                apellidos = apellidos.toUpperCaseSafe(),
                correo = correo,
                //fechaNacimiento = "", // si tienes este dato en otro lado, pásalo
                activo = etActivo.text.toString().equals("Activo", ignoreCase = true)
            )

            controladorCliente.actualizarCliente(id, clienteActualizado)
                .enqueue(object : Callback<Clientes> {
                    override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                        if (response.isSuccessful) {
                            mostrarDialogoExito()
                        } else {
                            Toast.makeText(this@EditarClienteActivity, "Error al actualizar", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<Clientes>, t: Throwable) {
                        Toast.makeText(this@EditarClienteActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                    }
                })
        } ?: Toast.makeText(this, "Error: ID no encontrado", Toast.LENGTH_SHORT).show()
    }


    private fun mostrarDialogoExito() {
        AlertDialog.Builder(this)
            .setTitle("Cliente actualizado")
            .setMessage("El cliente ha sido actualizado correctamente.")
            .setPositiveButton("OK") { dialog, _ ->
                dialog.dismiss()
                finish()
            }
            .show()
    }
}
