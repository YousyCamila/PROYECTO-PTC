package com.example.aplicacionptc.Views.Administrador.Caso

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCaso
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import com.example.aplicacionptc.Api.Retrofit

class EditarCasoActivity : AppCompatActivity() {

    private lateinit var controladorCaso: ControladorCaso

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_editar_caso)

        // Inicializar Retrofit
        controladorCaso = Retrofit.retrofit.create(ControladorCaso::class.java)

        val caso = intent.getSerializableExtra("caso") as? Caso

        val edtNombreCaso = findViewById<EditText>(R.id.edtNombreCaso)
        val btnGuardar = findViewById<Button>(R.id.btnGuardar)
        val btnVolver = findViewById<ImageButton>(R.id.btnVolver)

        if (caso != null) {
            edtNombreCaso.setText(caso.nombreCaso)
        }

        btnGuardar.setOnClickListener {
            if (caso != null) {
                val nombreCaso = edtNombreCaso.text.toString()
                caso.nombreCaso = nombreCaso

                controladorCaso.actualizarCaso(caso._id, caso).enqueue(object : Callback<Caso> {
                    override fun onResponse(call: Call<Caso>, response: Response<Caso>) {
                        if (response.isSuccessful) {
                            Toast.makeText(this@EditarCasoActivity, "Caso actualizado exitosamente", Toast.LENGTH_SHORT).show()
                            setResult(Activity.RESULT_OK)
                            finish()
                        } else {
                            Toast.makeText(this@EditarCasoActivity, "Error al actualizar el caso", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<Caso>, t: Throwable) {
                        Toast.makeText(this@EditarCasoActivity, "Error de conexión", Toast.LENGTH_SHORT).show()
                    }
                })
            }
        }

        btnVolver.setOnClickListener {
            finish()
        }
    }
}
