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
import android.app.DatePickerDialog
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import java.util.Calendar
import com.example.aplicacionptc.Validaciones.Validaciones
import com.example.aplicacionptc.Validaciones.Validaciones.esEmailValido
import com.example.aplicacionptc.Validaciones.Validaciones.esMayorDeEdad
import com.example.aplicacionptc.Validaciones.Validaciones.esNombreValido
import com.example.aplicacionptc.Validaciones.Validaciones.toUpperCaseSafe


class CrearClienteActivity : AppCompatActivity() {

    private lateinit var etNombre: EditText

    private lateinit var etApellido: EditText
    private lateinit var etTipoDocumento: AutoCompleteTextView
    private lateinit var etNumeroDocumento: EditText
    private lateinit var etFechaNacimiento: EditText
    private lateinit var etCorreo: EditText
    private lateinit var btnGuardar: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_cliente)
        // Inicializa clienteSpringInstance para compatibilidad con servicios de Spring Boot
        val dummySpringCall = Retrofit.clienteSpringInstance


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

        val opcionesTipoDocumento = arrayOf("Cédula", "Pasaporte")
        val adapterTipoDocumento = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, opcionesTipoDocumento)
        etTipoDocumento.setAdapter(adapterTipoDocumento)
        etTipoDocumento.setOnClickListener {
            etTipoDocumento.showDropDown()
        }



        etFechaNacimiento.setOnClickListener {
            val calendario = Calendar.getInstance()
            val anio = calendario.get(Calendar.YEAR)
            val mes = calendario.get(Calendar.MONTH)
            val dia = calendario.get(Calendar.DAY_OF_MONTH)

            val datePicker = DatePickerDialog(this, { _, year, month, dayOfMonth ->
                val fechaSeleccionada = String.format("%02d/%02d/%04d", dayOfMonth, month + 1, year)
                etFechaNacimiento.setText(fechaSeleccionada)
            }, anio, mes, dia)

            datePicker.show()
        }

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
        var nombre = etNombre.text.toString().trim()
        var apellido = etApellido.text.toString().trim()
        var correo = etCorreo.text.toString().trim()
        var tipoDocumento = etTipoDocumento.text.toString().trim()
        var numeroDocumento = etNumeroDocumento.text.toString().trim()
        var fechaNacimiento = etFechaNacimiento.text.toString().trim()

        var esValido = true

        if (!nombre.esNombreValido()) {
            etNombre.error = "Nombre inválido. Solo letras y tildes."
            esValido = false
        } else {
            nombre = nombre.toUpperCaseSafe()
        }

        if (!apellido.esNombreValido()) {
            etApellido.error = "Apellido inválido. Solo letras y tildes."
            esValido = false
        } else {
            apellido = apellido.toUpperCaseSafe()
        }

        if (!correo.esEmailValido()) {
            etCorreo.error = "Correo inválido. Debe terminar en .com"
            esValido = false
        }

        if (!fechaNacimiento.esMayorDeEdad()) {
            etFechaNacimiento.error = "Debes ser mayor de 18 años."
            esValido = false
        }

        if (!esValido) return

        val nuevoCliente = Clientes(
            tipoDocumento = tipoDocumento,
            numeroDocumento = numeroDocumento,
            nombres = nombre,
            apellidos = apellido,
            correo = correo,
            fechaNacimiento = fechaNacimiento,
            activo = true
        )

        Retrofit.clienteInstance.crearCliente(nuevoCliente)
            .enqueue(object : Callback<Clientes> {
                override fun onResponse(call: Call<Clientes>, response: Response<Clientes>) {
                    if (response.isSuccessful) {
                        mostrarDialogoExito()
                    } else {
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
                val intent = Intent()
                setResult(RESULT_OK, intent)
                finish()
            }
            .show()
    }
}
