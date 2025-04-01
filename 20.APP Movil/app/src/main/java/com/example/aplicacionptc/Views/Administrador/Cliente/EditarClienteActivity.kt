package com.example.aplicacionptc.Views.Administrador.Cliente

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
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

class EditarClienteActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etApellidos: EditText
    private lateinit var etId: EditText
    private lateinit var etTelefono: EditText
    private lateinit var etCorreo: EditText
    private lateinit var etTipoDocumento: EditText
    private lateinit var etNumeroDocumento: EditText
    private lateinit var etActivo: EditText
    private lateinit var btnGuardar: Button
    private lateinit var controladorCliente: ControladorCliente
    private var idCliente: String? = null


    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_editar_cliente)

        controladorCliente= Retrofit.clienteInstance

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

        // Obtener datos del intent
        idCliente = intent.getStringExtra("id")
        if (idCliente!= null) {
            cargarDatosCliente(idCliente!!)
        }

        btnGuardar.setOnClickListener {
            actualizarCliente()
        }
    }
    private fun cargarDatosCliente(id: String) {

        controladorCliente.buscarClientePorId(id)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful && response.body() != null) {
                        val cliente = response.body()!!


                        etNombre.setText(cliente.nombres)
                        etApellidos.setText(cliente.apellidos)
                        etId.setText(cliente.id)
                        etNumeroDocumento.setText(cliente.numeroDocumento)
                        etTipoDocumento.setText(cliente.tipoDocumento)
                        etCorreo.setText(cliente.correo)
                        etActivo.setText(if (cliente.activo) "Activo" else "Inactivo")

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
        // Validación de los campos
        if (etNombre.text.isBlank() || etCorreo.text.isBlank()) {
            Toast.makeText(this, "El nombre y el correo son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        if (idCliente == null) {
            Toast.makeText(this, "Error: ID no encontrado", Toast.LENGTH_SHORT).show()
            return
        }

        val clienteActualizado = Clientes(
            id = idCliente!!,
            tipoDocumento = etTipoDocumento.text.toString(),  // Asignar el tipo de documento ingresado
            numeroDocumento = etNumeroDocumento.text.toString(),  // Usar el número de documento ingresado
            nombres = etNombre.text.toString(),
            apellidos = etApellidos.text.toString(),
            correo = etCorreo.text.toString(),
            fechaNacimiento = "",  // Mantener la fecha de nacimiento si no se necesita editar
            activo = etActivo.text.toString().equals("Activo", ignoreCase = true),  // Convertir
        )

        controladorCliente.actualizarCliente(idCliente!!, clienteActualizado)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@EditarClienteActivity, "Cliente actualizado", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@EditarClienteActivity, "Error al actualizar", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Clientes>, t: Throwable) {
                    Toast.makeText(this@EditarClienteActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                }
            })
    }

    private fun mostrarDialogoExito() {
        AlertDialog.Builder(this)
            .setTitle("Cliente actualizado")
            .setMessage("El cliente ha sido actualizado correctamente.")
            .setPositiveButton("OK") { dialog, _ ->
                dialog.dismiss()
                finish() // Cierra la actividad después de actualizar
            }
            .show()
    }
}
