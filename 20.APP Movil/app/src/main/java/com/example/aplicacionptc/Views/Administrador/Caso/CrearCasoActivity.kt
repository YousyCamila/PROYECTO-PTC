package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCaso
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearCasoActivity : AppCompatActivity() {

    private lateinit var controladorCaso: ControladorCaso

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_caso)

        controladorCaso = Retrofit.retrofit.create(ControladorCaso::class.java)

        val edtNombreCaso = findViewById<EditText>(R.id.etNombreCaso)
        val edtIdCliente = findViewById<EditText>(R.id.etIdCliente)
        val edtIdDetective = findViewById<EditText>(R.id.etIdDetective)
        val btnGuardar = findViewById<Button>(R.id.btnGuardar)
        val btnVolver = findViewById<ImageButton>(R.id.btnVolver)

        btnGuardar.setOnClickListener {
            val nombreCaso = edtNombreCaso.text.toString()
            val idCliente = edtIdCliente.text.toString()
            val idDetective = edtIdDetective.text.toString().takeIf { it.isNotEmpty() }

            if (nombreCaso.isEmpty() || idCliente.isEmpty()) {
                Toast.makeText(this, "Por favor, complete los campos obligatorios", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val caso = Caso(
                nombreCaso = nombreCaso,
                idCliente = idCliente,
                idDetective = idDetective
                // Los demás campos se inicializan con sus valores por defecto
            )

            controladorCaso.crearCaso(caso).enqueue(object : Callback<Caso> {
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
                    Toast.makeText(this@CrearCasoActivity, "Error de conexión", Toast.LENGTH_SHORT).show()
                }
            })
        }

        btnVolver.setOnClickListener {
            finish()
        }
    }
}
