package com.example.aplicacionptc.Views.Administrador.Detective

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton

class EditarDetectivesActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etId: EditText
    private lateinit var etTelefono: EditText
    private lateinit var etDireccion: EditText
    private lateinit var etCorreo: EditText
    private lateinit var btnGuardar: Button

    private var posicion: Int = -1

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_editar_detectives)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)

        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionDetectivesActivity::class.java))
        }

        etNombre = findViewById(R.id.edtNombre)
        etId = findViewById(R.id.edtId)
        etTelefono = findViewById(R.id.edtTelefono)
        etDireccion = findViewById(R.id.edtDireccion)
        etCorreo = findViewById(R.id.edtCorreo)
        btnGuardar = findViewById(R.id.btnGuardarDetective)

        posicion = intent.getIntExtra("posicion", -1)
        val nombre = intent.getStringExtra("nombre")
        val id = intent.getStringExtra("id")
        val telefono = intent.getStringExtra("telefono")
        val direccion = intent.getStringExtra("direccion")
        val correo = intent.getStringExtra("correo")

        etNombre.setText(nombre)
        etId.setText(id)
        etTelefono.setText(telefono)
        etDireccion.setText(direccion)
        etCorreo.setText(correo)

        btnGuardar.setOnClickListener {
            if (posicion != -1) {
                val detective = Detectives.detectives[posicion]
                detective.nombre = etNombre.text.toString()
                detective.id = etId.text.toString()
                detective.celular = etTelefono.text.toString()
                detective.direccion = etDireccion.text.toString()
                detective.correo = etCorreo.text.toString()

                finish()
            }
        }
    }
}
