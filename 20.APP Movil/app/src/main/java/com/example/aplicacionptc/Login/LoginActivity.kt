package com.example.aplicacionptc

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)

        // Si el usuario ya inició sesión, redirigir a MainActivity
        if (sharedPref.getBoolean("isLoggedIn", false)) {
            goToMainActivity()
            return
        }

        setContentView(R.layout.activity_login)

        val etUsername = findViewById<EditText>(R.id.etUsername)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)

        val defaultUser = "admin"
        val defaultPass = "1234"

        btnLogin.setOnClickListener {
            val username = etUsername.text.toString()
            val password = etPassword.text.toString()

            if (username == defaultUser && password == defaultPass) {
                sharedPref.edit().apply {
                    putBoolean("isLoggedIn", true)
                    apply()
                }
                Toast.makeText(this, "Login exitoso", Toast.LENGTH_SHORT).show()
                goToMainActivity()
            } else {
                Toast.makeText(this, "Usuario o contraseña incorrectos", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun goToMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    companion object {
        fun logout(context: Context) {
            val sharedPref = context.getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
            sharedPref.edit().apply {
                putBoolean("isLoggedIn", false)
                apply()
            }
            val intent = Intent(context, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            context.startActivity(intent)
        }
    }
}
