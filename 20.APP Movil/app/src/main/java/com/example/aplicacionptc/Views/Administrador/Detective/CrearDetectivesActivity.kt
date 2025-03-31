package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Api.RetrofitDetective
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

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

        controladorDetective = RetrofitDetective.instance

        val edtTipoDocumento = findViewById<EditText>(R.id.edtTipoDocumento)
        val edtNumeroDocumento = findViewById<EditText>(R.id.edtNumeroDocumento)
        val edtNombres = findViewById<EditText>(R.id.edtNombres)
        val edtApellidos = findViewById<EditText>(R.id.edtApellidos)
        val edtCorreo = findViewById<EditText>(R.id.edtCorreo)
        val edtFechaNacimiento = findViewById<EditText>(R.id.edtFechaNacimiento)
        val edtEspecialidad = findViewById<Spinner>(R.id.spinnerEspecialidad) // Usamos Spinner ahora
        val btnGuardarDetective = findViewById<Button>(R.id.btnGuardarDetective)
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)

        // Configurar el Spinner para especialidad
        val especialidadesAdapter = ArrayAdapter.createFromResource(
            this,
            R.array.especialidades_array,
            android.R.layout.simple_spinner_item
        )
        especialidadesAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        edtEspecialidad.adapter = especialidadesAdapter

        btnGuardarDetective.setOnClickListener {
            val tipoDocumento = edtTipoDocumento.text.toString()
            val numeroDocumento = edtNumeroDocumento.text.toString()
            val nombres = edtNombres.text.toString()
            val apellidos = edtApellidos.text.toString()
            val correo = edtCorreo.text.toString()
            val fechaNacimiento = edtFechaNacimiento.text.toString()
            val activo = true

            // Obtener la especialidad seleccionada
            val especialidadSeleccionada = edtEspecialidad.selectedItem.toString()

            // Crear el detective
            val nuevoDetective = Detectives(
                tipoDocumento = tipoDocumento,
                numeroDocumento = numeroDocumento,
                nombres = nombres,
                apellidos = apellidos,
                correo = correo,
                fechaNacimiento = fechaNacimiento,
                activo = activo,
                especialidad = listOf(especialidadSeleccionada)
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
