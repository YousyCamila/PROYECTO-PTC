package com.example.aplicacionptc.Views.Administrador.Cliente

import android.app.AlertDialog
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EditarClienteActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etApellido: EditText
    private lateinit var etCorreo: EditText
    private lateinit var btnGuardar: Button

    private var clienteId: String? = null
    private var tipoDocumento: String? = null
    private var numeroDocumento: String? = null
    private var activo: Boolean = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_editar_cliente)

        etNombre = findViewById(R.id.etNombre)
        etApellido = findViewById(R.id.etApellido)
        etCorreo = findViewById(R.id.etCorreo)
        btnGuardar = findViewById(R.id.btnGuardar)

        // Obtener datos del intent
        clienteId = intent.getStringExtra("id")
        tipoDocumento = intent.getStringExtra("tipoDocumento")
        numeroDocumento = intent.getStringExtra("numeroDocumento")
        etNombre.setText(intent.getStringExtra("nombres"))
        etApellido.setText(intent.getStringExtra("apellidos"))
        etCorreo.setText(intent.getStringExtra("correo"))
        activo = intent.getBooleanExtra("activo", true)

        findViewById<MaterialButton>(R.id.btnVolverGestion).setOnClickListener {
            finish() // Evita crear una nueva actividad innecesaria
        }

        btnGuardar.setOnClickListener {
            validarYActualizarCliente()
        }
    }

    private fun validarYActualizarCliente() {
        if (clienteId.isNullOrEmpty()) {
            Toast.makeText(this, "Error: ID del cliente no encontrado", Toast.LENGTH_SHORT).show()
            return
        }
        if (etNombre.text.isNullOrEmpty() || etApellido.text.isNullOrEmpty() || etCorreo.text.isNullOrEmpty()) {
            Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        val clienteActualizado = Clientes(
            id = clienteId!!,
            tipoDocumento = tipoDocumento.orEmpty(),
            numeroDocumento = numeroDocumento.orEmpty(),
            nombres = etNombre.text.toString().trim(),
            apellidos = etApellido.text.toString().trim(),
            correo = etCorreo.text.toString().trim(),
            fechaNacimiento = "",
            activo = activo
        )

        Retrofit.clienteInstance.actualizarCliente(clienteId!!, clienteActualizado)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful) {
                        mostrarDialogoExito()
                    } else {
                        Toast.makeText(this@EditarClienteActivity, "Error al actualizar cliente", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Clientes>, t: Throwable) {
                    Toast.makeText(this@EditarClienteActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
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
