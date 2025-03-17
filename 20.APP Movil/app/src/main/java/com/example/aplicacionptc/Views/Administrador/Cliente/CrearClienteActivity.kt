package com.example.aplicacionptc.Views.Administrador.Cliente

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton

class CrearClienteActivity : AppCompatActivity() {

    private lateinit var controladorCliente: ControladorCliente

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_crear_cliente)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }


        controladorCliente = ControladorCliente()


        val edtNombre = findViewById<EditText>(R.id.edtNombre)
        val edtId = findViewById<EditText>(R.id.edtId)
        val edtTelefono = findViewById<EditText>(R.id.edtTelefono)
        val edtDireccion = findViewById<EditText>(R.id.edtDireccion)
        val edtCorreo = findViewById<EditText>(R.id.edtCorreo)
        val btnGuardar = findViewById<Button>(R.id.btnGuardarCliente)
        val btnVolverGestion = findViewById<MaterialButton>(R.id.btnVolverGestion)


        btnGuardar.setOnClickListener {

            val nombre = edtNombre.text.toString()
            val id = (Clientes.clientes.size + 1).toString()
            val telefono = edtTelefono.text.toString()
            val direccion = edtDireccion.text.toString()
            val correo = edtCorreo.text.toString()


            val nuevoCliente = Clientes(id, nombre, telefono, direccion, correo)


            Clientes.clientes.add(nuevoCliente)


            finish()
        }

        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }
    }
}
