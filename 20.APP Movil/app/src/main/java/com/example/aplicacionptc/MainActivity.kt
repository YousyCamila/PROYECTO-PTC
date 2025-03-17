package com.example.aplicacionptc

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Views.Administrador.Cliente.GestionClientesActivity
import com.example.aplicacionptc.Views.Administrador.Contrato.HomeContratoActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val btnContratos = findViewById<Button>(R.id.btnContratos)
        val btnClientes = findViewById<Button>(R.id.btnClientes)

        btnContratos.setOnClickListener{
            startActivity(Intent(this, HomeContratoActivity::class.java))
        }
        btnClientes.setOnClickListener{
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }
    }
}