package com.example.aplicacionptc.Views.Administrador.Contrato

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R


class HomeContratoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_home_contrato)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val btncrearContrato = findViewById<Button>(R.id.btnCrearContrato)
        val btnlistarContratos = findViewById<Button>(R.id.btnListarContratos)
        val volverDashboard = findViewById<Button>(R.id.btnVolverDashboard)

        btncrearContrato.setOnClickListener {
            startActivity(Intent(this, CrearContratoActivity::class.java))
        }

        btnlistarContratos.setOnClickListener {
            startActivity(Intent(this, ListarContratoActivity::class.java))
        }

        volverDashboard.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }
}
