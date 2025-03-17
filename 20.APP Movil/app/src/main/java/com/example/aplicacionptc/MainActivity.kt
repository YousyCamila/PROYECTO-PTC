package com.example.aplicacionptc

import android.content.Context
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

        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        val isLoggedIn = sharedPref.getBoolean("isLoggedIn", false)

        // Si el usuario no ha iniciado sesión, redirigirlo al login
        if (!isLoggedIn) {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
            return
        }

        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val btnContratos = findViewById<Button>(R.id.btnContratos)
        val btnClientes = findViewById<Button>(R.id.btnClientes)
        val btnLogout = findViewById<Button>(R.id.btnLogout) // Agregado botón de cerrar sesión

        btnContratos.setOnClickListener {
            startActivity(Intent(this, HomeContratoActivity::class.java))
        }

        btnClientes.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }

        btnLogout.setOnClickListener {
            // Cerrar sesión
            sharedPref.edit().apply {
                putBoolean("isLoggedIn", false) // Eliminar sesión
                apply()
            }
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}
