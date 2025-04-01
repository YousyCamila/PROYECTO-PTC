package com.example.aplicacionptc.Views.Administrador.Cliente

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearClienteActivity : AppCompatActivity() {

    private lateinit var etNombre: EditText
    private lateinit var etApellido: EditText
    private lateinit var etTipoDocumento: EditText
    private lateinit var etNumeroDocumento: EditText
    private lateinit var etFechaNacimiento: EditText
    private lateinit var etCorreo: EditText
    private lateinit var btnGuardar: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_cliente)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Inicialización de campos
        etNombre = findViewById(R.id.etNombres)
        etApellido = findViewById(R.id.etApellidos)
        etTipoDocumento = findViewById(R.id.etTipoDocumento)
        etNumeroDocumento = findViewById(R.id.etNumeroDocumento)
        etFechaNacimiento = findViewById(R.id.etFechaNacimiento)
        etCorreo = findViewById(R.id.etCorreo)
        btnGuardar = findViewById(R.id.btnGuardarCliente)

        // Botón de volver a la gestión de clientes
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)
        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }

        // Botón para guardar cliente
        btnGuardar.setOnClickListener {
            crearCliente()
        }
    }

    private fun crearCliente() {
        val nuevoCliente = Clientes(
            tipoDocumento = etTipoDocumento.text.toString(),
            numeroDocumento = etNumeroDocumento.text.toString(),
            nombres = etNombre.text.toString(),
            apellidos = etApellido.text.toString(),
            correo = etCorreo.text.toString(),
            fechaNacimiento = "", // No es obligatorio
            activo = true
        )

        // Llamada a la API para crear el cliente
        Retrofit.clienteInstance.crearCliente(nuevoCliente)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful) {
                        mostrarDialogoExito()
                    } else {
                        // Mostrar el cuerpo del error
                        Toast.makeText(this@CrearClienteActivity, "Error al crear cliente: ${response.errorBody()?.string()}", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Clientes>, t: Throwable) {
                    Toast.makeText(this@CrearClienteActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
    }

    private fun mostrarDialogoExito() {
        AlertDialog.Builder(this)
            .setTitle("Cliente creado")
            .setMessage("El cliente ha sido registrado exitosamente.")
            .setPositiveButton("OK") { dialog, _ ->
                dialog.dismiss()
                finish()
            }
            .show()
    }
}
