package com.example.aplicacionptc.Views.Cliente.Evidencias

import android.annotation.SuppressLint
import android.app.*
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Cliente.Evidencias.Evidencia
import com.example.aplicacionptc.R
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.InputStream
import java.text.SimpleDateFormat
import java.util.*

class SubirEvidenciaClienteActivity : AppCompatActivity() {

    private lateinit var fechaEditText: EditText
    private lateinit var descripcionEditText: EditText
    private lateinit var tipoSpinner: Spinner
    private lateinit var idCasoEditText: EditText
    private lateinit var subirBtn: Button
    private lateinit var seleccionarArchivoBtn: Button
    private lateinit var archivoNombreTextView: TextView

    private var archivoUri: Uri? = null
    private val PICK_FILE_REQUEST = 100
    private val tiposEvidencia = arrayOf("Imagen", "Video", "PDF")

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_subir_evidencia_cliente)

        fechaEditText = findViewById(R.id.etFecha)
        descripcionEditText = findViewById(R.id.etDescripcion)
        tipoSpinner = findViewById(R.id.spinnerTipo)
        idCasoEditText = findViewById(R.id.etIdCaso)
        subirBtn = findViewById(R.id.btnSubir)
        seleccionarArchivoBtn = findViewById(R.id.btnSeleccionarArchivo)
        archivoNombreTextView = findViewById(R.id.tvNombreArchivo)

        tipoSpinner.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, tiposEvidencia)

        fechaEditText.setOnClickListener { mostrarDatePicker() }
        seleccionarArchivoBtn.setOnClickListener { seleccionarArchivo() }
        subirBtn.setOnClickListener { subirEvidencia() }

        findViewById<ImageView>(R.id.btnBack).setOnClickListener { finish() }
    }

    private fun mostrarDatePicker() {
        val calendar = Calendar.getInstance()
        val datePicker = DatePickerDialog(this, { _, year, month, day ->
            val fechaSeleccionada = "$year-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}"
            fechaEditText.setText(fechaSeleccionada)
        }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))
        datePicker.show()
    }

    private fun seleccionarArchivo() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "*/*"
        startActivityForResult(Intent.createChooser(intent, "Seleccionar archivo"), PICK_FILE_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_FILE_REQUEST && resultCode == Activity.RESULT_OK) {
            archivoUri = data?.data
            archivoNombreTextView.text = obtenerNombreArchivo(archivoUri)
        }
    }

    private fun obtenerNombreArchivo(uri: Uri?): String {
        uri ?: return "Ningún archivo"
        val cursor = contentResolver.query(uri, null, null, null, null)
        return cursor?.use {
            val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            it.moveToFirst()
            it.getString(nameIndex)
        } ?: "Archivo seleccionado"
    }

    private fun subirEvidencia() {
        val fecha = fechaEditText.text.toString().trim()
        val descripcion = descripcionEditText.text.toString().trim()
        val tipo = tipoSpinner.selectedItem.toString()
        val idCaso = idCasoEditText.text.toString().trim()

        if (fecha.isEmpty() || descripcion.isEmpty() || tipo.isEmpty() || idCaso.isEmpty() || archivoUri == null) {
            Toast.makeText(this, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
            return
        }

        val fechaBody = RequestBody.create("text/plain".toMediaTypeOrNull(), fecha)
        val descripcionBody = RequestBody.create("text/plain".toMediaTypeOrNull(), descripcion)
        val tipoBody = RequestBody.create("text/plain".toMediaTypeOrNull(), tipo)
        val idCasoBody = RequestBody.create("text/plain".toMediaTypeOrNull(), idCaso)

        val inputStream: InputStream? = contentResolver.openInputStream(archivoUri!!)
        val archivoBytes = inputStream?.readBytes()
        val archivoRequestBody = RequestBody.create("application/octet-stream".toMediaTypeOrNull(), archivoBytes!!)
        val archivoPart = MultipartBody.Part.createFormData("archivo", obtenerNombreArchivo(archivoUri), archivoRequestBody)

        Retrofit.evidenciaInstance.subirEvidenciaConArchivo(
            fechaBody, descripcionBody, idCasoBody, tipoBody, archivoPart
        ).enqueue(object : Callback<Evidencia> {
            override fun onResponse(call: Call<Evidencia>, response: Response<Evidencia>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@SubirEvidenciaClienteActivity, "Evidencia subida con éxito", Toast.LENGTH_SHORT).show()
                    finish()
                } else {
                    Toast.makeText(this@SubirEvidenciaClienteActivity, "Error del servidor: ${response.code()}", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Evidencia>, t: Throwable) {
                Toast.makeText(this@SubirEvidenciaClienteActivity, "Fallo al subir: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}