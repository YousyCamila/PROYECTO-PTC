package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Calendar
import com.example.aplicacionptc.Validaciones.Validaciones
import com.example.aplicacionptc.Validaciones.Validaciones.esCedulaValida
import com.example.aplicacionptc.Validaciones.Validaciones.esEmailValido
import com.example.aplicacionptc.Validaciones.Validaciones.esMayorDeEdad
import com.example.aplicacionptc.Validaciones.Validaciones.esNombreValido
import com.example.aplicacionptc.Validaciones.Validaciones.toUpperCaseSafe


class CrearDetectivesActivity : AppCompatActivity() {

    private lateinit var controladorDetective: ControladorDetective

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_detectives)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        controladorDetective = Retrofit.detectiveInstance

        val spinnerTipoDocumento = findViewById<Spinner>(R.id.spinnerTipoDocumento)
        val tiposDocumentoAdapter = ArrayAdapter.createFromResource(
            this,
            R.array.tipos_documento_array, // Este array lo defines en strings.xml
            android.R.layout.simple_spinner_item
        )
        tiposDocumentoAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerTipoDocumento.adapter = tiposDocumentoAdapter
        val edtNumeroDocumento = findViewById<EditText>(R.id.edtNumeroDocumento)
        val edtNombres = findViewById<EditText>(R.id.edtNombres)
        val edtApellidos = findViewById<EditText>(R.id.edtApellidos)
        val edtCorreo = findViewById<EditText>(R.id.edtCorreo)
        val edtFechaNacimiento = findViewById<EditText>(R.id.edtFechaNacimiento)

        val txtEspecialidades = findViewById<TextView>(R.id.txtEspecialidadesSeleccionadas)
        val especialidades = resources.getStringArray(R.array.especialidades_array)
        val seleccionadas = BooleanArray(especialidades.size)

        val listaSeleccionadas = mutableListOf<String>()
        val btnGuardarDetective = findViewById<Button>(R.id.btnGuardarDetective)
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)

        txtEspecialidades.setOnClickListener {
            val builder = AlertDialog.Builder(this)
            builder.setTitle("Selecciona las especialidades")
            builder.setMultiChoiceItems(especialidades, seleccionadas) { _, which, isChecked ->
                if (isChecked) {
                    listaSeleccionadas.add(especialidades[which])
                } else {
                    listaSeleccionadas.remove(especialidades[which])
                }
            }
            builder.setPositiveButton("Aceptar") { _, _ ->
                txtEspecialidades.text = listaSeleccionadas.joinToString(", ")
            }
            builder.setNegativeButton("Cancelar", null)
            builder.show()
        }

        edtFechaNacimiento.setOnClickListener {
            val calendario = Calendar.getInstance()
            val anio = calendario.get(Calendar.YEAR)
            val mes = calendario.get(Calendar.MONTH)
            val dia = calendario.get(Calendar.DAY_OF_MONTH)

            val datePicker = DatePickerDialog(this, { _, year, month, dayOfMonth ->
                val fechaSeleccionada = String.format("%02d/%02d/%04d", dayOfMonth, month + 1, year)
                edtFechaNacimiento.setText(fechaSeleccionada)
            }, anio, mes, dia)

            datePicker.show()
        }

        btnGuardarDetective.setOnClickListener {
            val tipoDocumento = spinnerTipoDocumento.selectedItem.toString()
            val numeroDocumento = edtNumeroDocumento.text.toString()
            val nombres = edtNombres.text.toString()
            val apellidos = edtApellidos.text.toString()
            val correo = edtCorreo.text.toString()
            val fechaNacimiento = edtFechaNacimiento.text.toString()
            val activo = true

            // 🧪 Validaciones
            if (!nombres.esNombreValido()) {
                edtNombres.error = "Nombre inválido. Solo letras y espacios."
                return@setOnClickListener
            }

            if (!apellidos.esNombreValido()) {
                edtApellidos.error = "Apellido inválido. Solo letras y espacios."
                return@setOnClickListener
            }

            if (!correo.esEmailValido()) {
                edtCorreo.error = "Correo inválido. Debe terminar en .com"
                return@setOnClickListener
            }

            if (tipoDocumento == "Cédula" && !numeroDocumento.esCedulaValida()) {
                edtNumeroDocumento.error = "La cédula debe tener exactamente 10 dígitos numéricos"
                return@setOnClickListener
            }

            if (!fechaNacimiento.esMayorDeEdad()) {
                edtFechaNacimiento.error = "Debe ser mayor de edad"
                return@setOnClickListener
            }

            // Convertir nombres y apellidos a mayúsculas
            val nombresFinal = nombres.toUpperCaseSafe()
            val apellidosFinal = apellidos.toUpperCaseSafe()

            // Crear el detective
            val nuevoDetective = Detectives(
                tipoDocumento = tipoDocumento,
                numeroDocumento = numeroDocumento,
                nombres = nombresFinal,
                apellidos = apellidosFinal,
                correo = correo,
                fechaNacimiento = fechaNacimiento,
                activo = activo,
                especialidad = listaSeleccionadas
            )


            controladorDetective.crearDetective(nuevoDetective).enqueue(object : Callback<Detectives> {
                override fun onResponse(call: Call<Detectives>, response: Response<Detectives>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@CrearDetectivesActivity, "Detective creado exitosamente", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        // Mostrar el cuerpo de la respuesta para más detalles
                        val errorMessage = response.errorBody()?.string() ?: "Error desconocido"
                        Toast.makeText(this@CrearDetectivesActivity, "Error al crear detective: $errorMessage", Toast.LENGTH_SHORT).show()
                    }
                }


                override fun onFailure(call: Call<Detectives>, t: Throwable) {
                    Toast.makeText(this@CrearDetectivesActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }

        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionDetectivesActivity::class.java))
        }
    }
}
