package com.example.aplicacionptc.Views.Administrador.Detective

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Controllers.Admistrador.Detective.ControladorDetective
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.google.android.material.button.MaterialButton

class CrearDetectivesActivity : AppCompatActivity() {

    private lateinit var controladorDetective: ControladorDetective

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_detectives)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        controladorDetective = ControladorDetective()

        val edtNombre = findViewById<EditText>(R.id.edtNombre)
        val edtId = findViewById<EditText>(R.id.edtId)
        val edtTelefono = findViewById<EditText>(R.id.edtTelefono)
        val edtDireccion = findViewById<EditText>(R.id.edtDireccion)
        val edtCorreo = findViewById<EditText>(R.id.edtCorreo)
        val btnGuardarDetective = findViewById<Button>(R.id.btnGuardarDetective)
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)

        btnGuardarDetective.setOnClickListener {
            val nombre = edtNombre.text.toString()
            val id = (Detectives.detectives.size + 1).toString()
            val telefono = edtTelefono.text.toString()
            val direccion = edtDireccion.text.toString()
            val correo = edtCorreo.text.toString()

            val nuevoDetective = Detectives(id, nombre, telefono, direccion, correo)

            Detectives.detectives.add(nuevoDetective)

            finish()
        }

        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionDetectivesActivity::class.java))
        }
    }
}
