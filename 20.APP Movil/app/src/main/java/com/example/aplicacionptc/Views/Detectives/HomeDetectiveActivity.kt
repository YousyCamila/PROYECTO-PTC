package com.example.aplicacionptc.Views.Detectives
import android.content.Intent
import android.widget.Button
import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.LoginActivity
import com.example.aplicacionptc.R

class HomeDetectiveActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_detective)

        // Datos estáticos para mostrar
        val nombre = "Camila Yousy"
        val email = "cyousy@investigacion.com"
        val rol = "Detective Senior"
        val id = "D-3827"

        val casosAsignados = listOf(
            "Caso 001: Robo en el banco",
            "Caso 002: Desaparición en el parque",
            "Caso 003: Fraude en empresa local"
        )

        val contratosActivos = listOf(
            "Contrato 145 - Vigilancia residencial",
            "Contrato 203 - Investigación corporativa"
        )

        val notificaciones = listOf(
            "🔔 Nueva evidencia en el Caso 001",
            "📅 Reunión de equipo a las 10:00 AM"
        )

        val tareasPendientes = listOf(
            "Visitar la escena del caso 002",
            "Analizar grabaciones de seguridad",
            "Preparar informe semanal"
        )

        // Referencias a vistas
        findViewById<TextView>(R.id.nombreTextView).text = nombre
        findViewById<TextView>(R.id.emailTextView).text = email
        findViewById<TextView>(R.id.rolTextView).text = rol
        findViewById<TextView>(R.id.idTextView).text = "ID: $id"

        // Agregar dinámicamente los elementos a cada sección
        val casosLayout = findViewById<LinearLayout>(R.id.casosLayout)
        casosAsignados.forEach {
            val textView = TextView(this)
            textView.text = "• $it"
            casosLayout.addView(textView)
        }

        val contratosLayout = findViewById<LinearLayout>(R.id.contratosLayout)
        contratosActivos.forEach {
            val textView = TextView(this)
            textView.text = "• $it"
            contratosLayout.addView(textView)
        }

        val notificacionesLayout = findViewById<LinearLayout>(R.id.notificacionesLayout)
        notificaciones.forEach {
            val textView = TextView(this)
            textView.text = it
            notificacionesLayout.addView(textView)
        }

        val tareasLayout = findViewById<LinearLayout>(R.id.tareasLayout)
        tareasPendientes.forEach {
            val textView = TextView(this)
            textView.text = "• $it"
            tareasLayout.addView(textView)
        }

        val btnLogout = findViewById<Button>(R.id.btnLogout)
        btnLogout.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

    }
}