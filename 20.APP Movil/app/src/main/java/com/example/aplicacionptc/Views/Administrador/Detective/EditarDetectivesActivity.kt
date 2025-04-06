package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
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
import com.example.aplicacionptc.Validaciones.Validaciones.esCedulaValida
import com.example.aplicacionptc.Validaciones.Validaciones.esEmailValido
import com.example.aplicacionptc.Validaciones.Validaciones.esNombreValido
import com.example.aplicacionptc.Validaciones.Validaciones.toUpperCaseSafe
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
    private lateinit var etActivo: AutoCompleteTextView

    private lateinit var especialidadesArray: Array<String>
    private lateinit var seleccionadas: BooleanArray
    private val listaEspecialidadesSeleccionadas = mutableListOf<String>()
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
        etCorreo = findViewById(R.id.edtCorreo)
        etTipoDocumento = findViewById(R.id.edtTipoDocumento)
        etNumeroDocumento = findViewById(R.id.edtNumeroDocumento)
        etActivo = findViewById(R.id.edtActivo)
        etEspecialidad = findViewById(R.id.edtEspecialidad)

        especialidadesArray = resources.getStringArray(R.array.especialidades_array)
        seleccionadas = BooleanArray(especialidadesArray.size)

        etEspecialidad.setOnClickListener {
            val builder = androidx.appcompat.app.AlertDialog.Builder(this)
            builder.setTitle("Selecciona las especialidades")

            builder.setMultiChoiceItems(especialidadesArray, seleccionadas) { _, which, isChecked ->
                if (isChecked) {
                    if (!listaEspecialidadesSeleccionadas.contains(especialidadesArray[which])) {
                        listaEspecialidadesSeleccionadas.add(especialidadesArray[which])
                    }
                } else {
                    listaEspecialidadesSeleccionadas.remove(especialidadesArray[which])
                }
            }

            builder.setPositiveButton("Aceptar") { _, _ ->
                etEspecialidad.setText(listaEspecialidadesSeleccionadas.joinToString(", "))
            }

            builder.setNegativeButton("Cancelar", null)

            builder.show()
        }


        btnGuardar = findViewById(R.id.btnGuardarDetective)

        etId.isEnabled = false
        etId.isFocusable = false
        etTipoDocumento.isEnabled = false
        etTipoDocumento.isFocusable = false

        etId.setTextColor(resources.getColor(R.color.gris, theme))
        etTipoDocumento.setTextColor(resources.getColor(R.color.gris, theme))

        val opcionesEstado = arrayOf("Activo", "Inactivo")
        val adapterEstado = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, opcionesEstado)

        etActivo.setAdapter(adapterEstado)
        etActivo.setOnClickListener {
            etActivo.showDropDown()
        }


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
                        val estadoActual = if (detective.activo) "Activo" else "Inactivo"
                        etActivo.setText(estadoActual, false) // Seteamos sin abrir el dropdown

                        etEspecialidad.setText(detective.especialidad?.joinToString(", ") ?: "")
                        // Llenar los datos en la lista y el boolean array
                        val especialidadesDetective = detective.especialidad ?: listOf()

                        listaEspecialidadesSeleccionadas.clear() // Limpiar antes de añadir nuevas
                        listaEspecialidadesSeleccionadas.addAll(especialidadesDetective)

                        for (i in especialidadesArray.indices) {
                            seleccionadas[i] = especialidadesDetective.contains(especialidadesArray[i])
                        }

                    } else {
                        Toast.makeText(this@EditarDetectivesActivity, "No se encontró el detective", Toast.LENGTH_SHORT)
                            .show()
                    }
                }

                override fun onFailure(call: Call<Detectives>, t: Throwable) {
                    Toast.makeText(this@EditarDetectivesActivity, "Error al cargar los datos", Toast.LENGTH_SHORT)
                        .show()
                }
            })
    }

    private fun actualizarDetective() {
        if (etNombre.text.isBlank() || etCorreo.text.isBlank()) {
            Toast.makeText(this, "El nombre y el correo son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        // Validaciones personalizadas
        val nombre = etNombre.text.toString().trim()
        val apellidos = etApellidos.text.toString().trim()
        val correo = etCorreo.text.toString().trim()
        val cedula = etNumeroDocumento.text.toString().trim()

        if (!nombre.esNombreValido()) {
            Toast.makeText(this, "Nombre inválido (solo letras y espacios)", Toast.LENGTH_SHORT).show()
            return
        }

        if (!apellidos.esNombreValido()) {
            Toast.makeText(this, "Apellidos inválidos (solo letras y espacios)", Toast.LENGTH_SHORT).show()
            return
        }

        if (!correo.esEmailValido()) {
            Toast.makeText(this, "Correo inválido (debe terminar en .com)", Toast.LENGTH_SHORT).show()
            return
        }

        if (!cedula.esCedulaValida()) {
            Toast.makeText(this, "Cédula inválida (debe tener 10 dígitos)", Toast.LENGTH_SHORT).show()
            return
        }

        if (idDetective == null) {
            Toast.makeText(this, "Error: ID no encontrado", Toast.LENGTH_SHORT).show()
            return
        }

        // Crear el objeto 'Detectives' con los campos modificados (conversión a mayúsculas en nombres y apellidos)
        val detectiveActualizado = Detectives(
            id = idDetective!!,
            tipoDocumento = etTipoDocumento.text.toString(),
            numeroDocumento = cedula,
            nombres = nombre.toUpperCaseSafe(),
            apellidos = apellidos.toUpperCaseSafe(),
            correo = correo,
            fechaNacimiento = "",  // Si no se usa, déjalo vacío o usa el anterior
            activo = etActivo.text.toString().equals("Activo", ignoreCase = true),
            especialidad = etEspecialidad.text.toString().split(",").map { it.trim() }
        )

        // Llamada a Retrofit para actualizar
        controladorDetective.actualizarDetective(idDetective!!, detectiveActualizado)
            .enqueue(object : Callback<Detectives> {
                override fun onResponse(call: Call<Detectives>, response: Response<Detectives>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@EditarDetectivesActivity, "Detective actualizado", Toast.LENGTH_SHORT)
                            .show()
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