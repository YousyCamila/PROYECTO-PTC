package com.example.aplicacionptc.Views.Administrador.Cliente

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton

class EditarClienteActivity : AppCompatActivity() {
    private lateinit var etNombre: EditText
    private lateinit var etCelular: EditText
    private lateinit var etDireccion: EditText
    private lateinit var etCorreo: EditText
    private lateinit var btnGuardar: Button

    private var posicion: Int = -1
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_editar_cliente)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val btnVolverGestion= findViewById<MaterialButton>(R.id.btnVolverGestion)

        btnVolverGestion.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }
        etNombre = findViewById(R.id.etNombre)
        etCelular = findViewById(R.id.etCelular)
        etDireccion = findViewById(R.id.etDireccion)
        etCorreo = findViewById(R.id.etCorreo)
        btnGuardar = findViewById(R.id.btnGuardar)


        posicion = intent.getIntExtra("posicion", -1)
        val nombre = intent.getStringExtra("nombre")
        val celular = intent.getStringExtra("celular")
        val direccion = intent.getStringExtra("direccion")
        val correo = intent.getStringExtra("correo")


        etNombre.setText(nombre)
        etCelular.setText(celular)
        etDireccion.setText(direccion)
        etCorreo.setText(correo)


        btnGuardar.setOnClickListener {
            if (posicion != -1) {

                val cliente = Clientes.clientes[posicion]
                cliente.nombre = etNombre.text.toString()
                cliente.celular = etCelular.text.toString()
                cliente.direccion = etDireccion.text.toString()
                cliente.correo = etCorreo.text.toString()


                finish()
            }
        }
    }
}