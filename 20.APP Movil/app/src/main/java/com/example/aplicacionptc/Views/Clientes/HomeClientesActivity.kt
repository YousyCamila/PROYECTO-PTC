package com.example.aplicacionptc.Views.Clientes
import android.content.Intent
import android.widget.Button
import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.aplicacionptc.LoginActivity
import com.example.aplicacionptc.R

class HomeClientesActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_cliente)

        // Configurar Toolbar
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(false)

        // Datos quemados del cliente
        val nombre = "Juan Pérez"
        val email = "juanperez@gmail.com"
        val idCliente = "C12345"
        val estadoContrato = "Activo hasta 30/04/2025"
        val ultimaActividad = "Reunión con detective el 18/04/2025"

        // Asignar datos
        findViewById<TextView>(R.id.nombreClienteTextView).text = nombre
        findViewById<TextView>(R.id.emailClienteTextView).text = email
        findViewById<TextView>(R.id.idClienteTextView).text = "ID: $idCliente"
        findViewById<TextView>(R.id.estadoContratoTextView).text = estadoContrato
        findViewById<TextView>(R.id.ultimaActividadTextView).text = ultimaActividad

        // Casos contratados (quemados)
        val casosLayout = findViewById<LinearLayout>(R.id.casosClienteLayout)
        val casos = listOf(
            "📁 Robo en propiedad privada",
            "📁 Seguimiento a sospechoso",
            "📁 Verificación de identidad"
        )

        for (caso in casos) {
            val casoTextView = TextView(this)
            casoTextView.text = caso
            casoTextView.textSize = 14f
            casoTextView.setPadding(0, 4, 0, 4)
            casosLayout.addView(casoTextView)
        }

        val btnLogout = findViewById<Button>(R.id.btnLogout)
        btnLogout.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

    }
}
