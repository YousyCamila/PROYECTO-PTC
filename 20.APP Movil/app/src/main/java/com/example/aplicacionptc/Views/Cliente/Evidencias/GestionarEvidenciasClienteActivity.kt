package com.example.aplicacionptc.Views.Cliente.Evidencias

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Cliente.Evidencias.Evidencia
import com.example.aplicacionptc.R
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionarEvidenciasClienteActivity : AppCompatActivity() {

    private lateinit var rvEvidencias: RecyclerView
    private lateinit var btnAgregarEvidencia: FloatingActionButton
    private lateinit var btnVolver: ImageButton
    private lateinit var tvTitulo: TextView
    private lateinit var tvSinEvidencias: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gestionar_evidencias_cliente)

        rvEvidencias = findViewById(R.id.rvEvidencias)
        btnAgregarEvidencia = findViewById(R.id.btnAgregarEvidencia)
        btnVolver = findViewById(R.id.btnVolver)
        tvTitulo = findViewById(R.id.tvTitulo)
        tvSinEvidencias = findViewById(R.id.tvSinEvidencias)

        rvEvidencias.layoutManager = LinearLayoutManager(this)

        btnAgregarEvidencia.setOnClickListener {
            startActivity(Intent(this, SubirEvidenciaClienteActivity::class.java))
        }

        btnVolver.setOnClickListener {
            finish()
        }

        obtenerEvidencias()
    }

    private fun obtenerEvidencias() {
        val call = Retrofit.evidenciaInstance.obtenerEvidencias()

        call.enqueue(object : Callback<List<Evidencia>> {
            override fun onResponse(call: Call<List<Evidencia>>, response: Response<List<Evidencia>>) {
                if (response.isSuccessful) {
                    val evidencias = response.body() ?: emptyList()
                    if (evidencias.isNotEmpty()) {
                        tvSinEvidencias.visibility = View.GONE
                        rvEvidencias.adapter = EvidenciaClienteAdapter(evidencias)
                    } else {
                        tvSinEvidencias.visibility = View.VISIBLE
                    }
                } else {
                    Toast.makeText(this@GestionarEvidenciasClienteActivity, "Error al obtener evidencias", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Evidencia>>, t: Throwable) {
                Toast.makeText(this@GestionarEvidenciasClienteActivity, "Error de conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }
}