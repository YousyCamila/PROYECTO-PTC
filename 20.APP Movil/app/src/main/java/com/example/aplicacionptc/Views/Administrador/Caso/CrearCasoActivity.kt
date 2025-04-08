package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Switch
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearCasoActivity : AppCompatActivity() {

    private lateinit var etNombreCaso: EditText
    private lateinit var etIdCliente: EditText
    private lateinit var etIdDetective: EditText
    private lateinit var switchActivo: Switch
    private lateinit var btnGuardar: Button
    private lateinit var btnVolver: ImageButton

    private val controladorCaso = Retrofit.casoInstance

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_caso)

        etNombreCaso = findViewById(R.id.etNombreCaso)
        etIdCliente = findViewById(R.id.etIdCliente)
        etIdDetective = findViewById(R.id.etIdDetective)
        switchActivo = findViewById(R.id.switchActivo)
        btnGuardar = findViewById(R.id.btnGuardar)
        btnVolver = findViewById(R.id.btnVolver)

        btnVolver.setOnClickListener {
            finish()
        }

        btnGuardar.setOnClickListener {
            crearCaso()
        }
    }

    private fun crearCaso() {
        val nombreCaso = etNombreCaso.text.toString().trim()
        val idClienteInput = etIdCliente.text.toString().trim()
        val idDetectiveInput = etIdDetective.text.toString().trim()
        val activo = switchActivo.isChecked

        if (nombreCaso.isEmpty() || idClienteInput.isEmpty() || idDetectiveInput.isEmpty()) {
            Toast.makeText(this, "Por favor completa todos los campos", Toast.LENGTH_SHORT).show()
            return
        }

        // Se crean las instancias mínimas necesarias para Cliente y Detective
        val cliente = Clientes(
            id = idClienteInput,
            tipoDocumento = "",
            numeroDocumento = "",
            nombres = "",
            apellidos = "",
            correo = "",
            fechaNacimiento = "",
            activo = true
        )

        val detective = Detectives(
            id = idDetectiveInput,
            tipoDocumento = "",
            numeroDocumento = "",
            nombres = "",
            apellidos = "",
            correo = "",
            fechaNacimiento = "",
            activo = true,
            especialidad = emptyList()
        )

        val nuevoCaso = Caso(
            nombreCaso = nombreCaso,
            idCliente = cliente,
            idDetective = detective,
            activo = activo
        )

        controladorCaso.crearCaso(nuevoCaso).enqueue(object : Callback<Caso> {
            override fun onResponse(call: Call<Caso>, response: Response<Caso>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@CrearCasoActivity, "Caso creado exitosamente", Toast.LENGTH_SHORT).show()
                    setResult(Activity.RESULT_OK)
                    finish()
                } else {
                    Toast.makeText(this@CrearCasoActivity, "Error al crear el caso", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Caso>, t: Throwable) {
                Toast.makeText(this@CrearCasoActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
