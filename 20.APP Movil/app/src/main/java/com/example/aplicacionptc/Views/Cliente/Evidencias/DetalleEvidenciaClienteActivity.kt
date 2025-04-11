package com.example.aplicacionptc.Views.Cliente.Evidencias

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Cliente.Evidencias.Evidencia
import com.example.aplicacionptc.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class DetalleEvidenciaClienteActivity : AppCompatActivity() {

    private lateinit var tvDescripcion: TextView
    private lateinit var tvFecha: TextView
    private lateinit var tvTipo: TextView
    private lateinit var tvCaso: TextView
    private lateinit var imgArchivo: ImageView
    private lateinit var btnAbrirArchivo: Button
    private lateinit var progressBar: ProgressBar
    private lateinit var btnVolver: ImageButton

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalle_evidencia_cliente)

        tvDescripcion = findViewById(R.id.tvDescripcion)
        tvFecha = findViewById(R.id.tvFecha)
        tvTipo = findViewById(R.id.tvTipo)
        tvCaso = findViewById(R.id.tvCaso)
        imgArchivo = findViewById(R.id.imgArchivo)
        btnAbrirArchivo = findViewById(R.id.btnAbrirArchivo)
        progressBar = findViewById(R.id.progressBarDetalle)
        btnVolver = findViewById(R.id.btnVolver)

        val evidenciaId = intent.getStringExtra("idEvidencia")

        if (evidenciaId != null) {
            cargarEvidencia(evidenciaId)
        } else {
            Toast.makeText(this, "ID de evidencia no recibido", Toast.LENGTH_SHORT).show()
            finish()
        }

        btnVolver.setOnClickListener {
            finish()
        }
    }

    private fun cargarEvidencia(id: String) {
        progressBar.visibility = View.VISIBLE

        Retrofit.evidenciaInstance.obtenerEvidenciaPorId(id).enqueue(object : Callback<Evidencia> {
            override fun onResponse(call: Call<Evidencia>, response: Response<Evidencia>) {
                progressBar.visibility = View.GONE
                if (response.isSuccessful) {
                    val evidencia = response.body()
                    evidencia?.let {
                        tvDescripcion.text = "Descripción: ${it.descripcion}"
                        tvFecha.text = "Fecha: ${it.fechaEvidencia}"
                        tvTipo.text = "Tipo: ${it.tipoEvidencia.joinToString(", ")}"
                        tvCaso.text = "ID Caso: ${it.idCasos}"

                        // Suponiendo que el campo "archivo" trae el nombre del archivo, por ejemplo "foto123.jpg"
                        if (!it.archivo.isNullOrEmpty()) {
                            val archivoNombre = it.archivo
                            // Construimos la URL completa del archivo
                            val archivoUrl = "http://10.0.2.2:3000/uploads/$archivoNombre"

                            // Determinamos la extensión para saber si es imagen, pdf o video
                            when {
                                archivoNombre.endsWith(".pdf", ignoreCase = true) -> {
                                    // Mostramos un ícono de PDF y configuramos el botón para abrir el PDF
                                    imgArchivo.setImageResource(R.drawable.ic_pdf)
                                    btnAbrirArchivo.visibility = View.VISIBLE
                                    btnAbrirArchivo.text = "Abrir PDF"
                                    btnAbrirArchivo.setOnClickListener {
                                        abrirArchivo(archivoUrl, "application/pdf")
                                    }
                                }
                                archivoNombre.endsWith(".mp4", ignoreCase = true) ||
                                        archivoNombre.endsWith(".avi", ignoreCase = true) ||
                                        archivoNombre.endsWith(".3gp", ignoreCase = true) -> {
                                    // Mostramos un ícono para video (o se podría usar Glide para cargar un thumbnail si el servidor lo soporta)
                                    imgArchivo.setImageResource(R.drawable.ic_video)
                                    btnAbrirArchivo.visibility = View.VISIBLE
                                    btnAbrirArchivo.text = "Reproducir Video"
                                    btnAbrirArchivo.setOnClickListener {
                                        abrirArchivo(archivoUrl, "video/*")
                                    }
                                }
                                else -> {
                                    // Asumimos que es una imagen y usamos Glide para cargarla.
                                    Glide.with(this@DetalleEvidenciaClienteActivity)
                                        .load(archivoUrl)
                                        .placeholder(R.drawable.placeholder)
                                        .error(R.drawable.placeholder)
                                        .into(imgArchivo)
                                    btnAbrirArchivo.visibility = View.GONE
                                }
                            }
                        } else {
                            btnAbrirArchivo.visibility = View.GONE
                            imgArchivo.setImageResource(R.drawable.placeholder)
                        }
                    }
                } else {
                    Toast.makeText(this@DetalleEvidenciaClienteActivity, "Error al cargar evidencia", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Evidencia>, t: Throwable) {
                progressBar.visibility = View.GONE
                Toast.makeText(this@DetalleEvidenciaClienteActivity, "Fallo de conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }

    // Función para abrir archivos con un intent externo
    private fun abrirArchivo(archivoUrl: String, mimeType: String) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.setDataAndType(Uri.parse(archivoUrl), mimeType)
        intent.flags = Intent.FLAG_ACTIVITY_NO_HISTORY
        try {
            startActivity(intent)
        } catch (e: Exception) {
            Toast.makeText(this, "No se pudo abrir el archivo", Toast.LENGTH_SHORT).show()
        }
    }
}