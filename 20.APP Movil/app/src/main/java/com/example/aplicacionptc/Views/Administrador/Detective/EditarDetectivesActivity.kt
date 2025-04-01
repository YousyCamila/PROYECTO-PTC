package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
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
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.R
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EditarDetectivesActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etApellidos: EditText
    private lateinit var etId: EditText
    private lateinit var etTelefono: EditText
    private lateinit var etCorreo: EditText
    private lateinit var etTipoDocumento: EditText
    private lateinit var etNumeroDocumento: EditText
    private lateinit var etActivo: EditText
    private lateinit var etEspecialidad: EditText
    private lateinit var btnGuardar: Button

    private lateinit var controladorDetective: ControladorDetective
    private var idDetective: String? = null

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_editar_detectives)

        // Ajustes para el diseño de borde a borde
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        controladorDetective = Retrofit.detectiveInstance

        // Configuración del botón para regresar a la vista de gestión de detectives
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)
        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionDetectivesActivity::class.java))
            finish()
        }

        // Inicialización de campos
        etNombre = findViewById(R.id.edtNombre)
        etApellidos = findViewById(R.id.edtApellidos)
        etId = findViewById(R.id.edtId)
        etTelefono = findViewById(R.id.edtTelefono)
        etCorreo = findViewById(R.id.edtCorreo)
        etTipoDocumento = findViewById(R.id.edtTipoDocumento)
        etNumeroDocumento = findViewById(R.id.edtNumeroDocumento)
        etActivo = findViewById(R.id.edtActivo)
        etEspecialidad = findViewById(R.id.edtEspecialidad)
        btnGuardar = findViewById(R.id.btnGuardarDetective)

        // Obtener ID del detective desde el Intent
        idDetective = intent.getStringExtra("id")

        // Cargar los datos del detective
        if (idDetective != null) {
            cargarDatosDetective(idDetective!!)
        }

        // Guardar cambios cuando se presione el botón "Guardar"
        btnGuardar.setOnClickListener {
            actualizarDetective()
        }
    }

    private fun cargarDatosDetective(id: String) {
        // Llamar al servicio para obtener los datos del detective por su ID
        controladorDetective.buscarDetectivePorId(id)
            .enqueue(object : Callback<Detectives> {
                override fun onResponse(call: Call<Detectives>, response: Response<Detectives>) {
                    if (response.isSuccessful && response.body() != null) {
                        val detective = response.body()!!

                        // Rellenar los campos con los datos actuales del detective
                        etNombre.setText(detective.nombres)
                        etApellidos.setText(detective.apellidos)
                        etId.setText(detective.id)
                        etNumeroDocumento.setText(detective.numeroDocumento)
                        etTipoDocumento.setText(detective.tipoDocumento)
                        etCorreo.setText(detective.correo)
                        etActivo.setText(if (detective.activo) "Activo" else "Inactivo")
                        etEspecialidad.setText(detective.especialidad?.joinToString(", ") ?: "")
                    } else {
                        Toast.makeText(this@EditarDetectivesActivity, "No se encontró el detective", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Detectives>, t: Throwable) {
                    Toast.makeText(this@EditarDetectivesActivity, "Error al cargar los datos", Toast.LENGTH_SHORT).show()
                }
            })
    }

    private fun actualizarDetective() {
        // Validación de los campos
        if (etNombre.text.isBlank() || etCorreo.text.isBlank()) {
            Toast.makeText(this, "El nombre y el correo son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        if (idDetective == null) {
            Toast.makeText(this, "Error: ID no encontrado", Toast.LENGTH_SHORT).show()
            return
        }

        // Crear el objeto 'Detectives' con los campos modificados
        val detectiveActualizado = Detectives(
            id = idDetective!!,  // Mantener el mismo ID
            tipoDocumento = etTipoDocumento.text.toString(),  // Asignar el tipo de documento ingresado
            numeroDocumento = etNumeroDocumento.text.toString(),  // Usar el número de documento ingresado
            nombres = etNombre.text.toString(),
            apellidos = etApellidos.text.toString(),
            correo = etCorreo.text.toString(),
            fechaNacimiento = "",  // Mantener la fecha de nacimiento si no se necesita editar
            activo = etActivo.text.toString().equals("Activo", ignoreCase = true),  // Convertir a booleano
            especialidad = etEspecialidad.text.toString().split(",").map { it.trim() } // Convertir a lista
        )

        // Llamar al servicio para actualizar los datos del detective
        controladorDetective.actualizarDetective(idDetective!!, detectiveActualizado)
            .enqueue(object : Callback<Detectives> {
                override fun onResponse(call: Call<Detectives>, response: Response<Detectives>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@EditarDetectivesActivity, "Detective actualizado", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@EditarDetectivesActivity, "Error al actualizar", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Detectives>, t: Throwable) {
                    Toast.makeText(this@EditarDetectivesActivity, "Fallo en la conexión", Toast.LENGTH_SHORT).show()
                }
            })
    }
}
