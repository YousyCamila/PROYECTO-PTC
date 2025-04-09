package com.example.aplicacionptc.Views.Detective

import android.content.Context
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.R

class HomeDetectiveActivity : AppCompatActivity() {

    private lateinit var nombreTextView: TextView
    private lateinit var emailTextView: TextView
    private lateinit var rolTextView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_detective)

        nombreTextView = findViewById(R.id.nombreTextView)
        emailTextView = findViewById(R.id.emailTextView)
        rolTextView = findViewById(R.id.rolTextView)

        val sharedPrefs = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        val nombre = sharedPrefs.getString("username", "Detective")
        val email = sharedPrefs.getString("userEmail", "")
        val rol = sharedPrefs.getString("userRole", "")

        nombreTextView.text = "Nombre: $nombre"
        emailTextView.text = "Correo: $email"
        rolTextView.text = "Rol: $rol"
    }
}
