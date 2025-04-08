package com.example.aplicacionptc.Auth

import com.example.aplicacionptc.R
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Models.Administrador.Usuario.RegisterResponse
import com.example.aplicacionptc.Models.Administrador.Usuario.User
import com.google.android.material.textfield.MaterialAutoCompleteTextView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlin.text.isEmpty
import kotlin.text.trim

class RegisterActivity : AppCompatActivity() {

    private lateinit var etUsername: EditText
    private lateinit var etEmail: EditText
    private lateinit var etPassword: EditText
    private lateinit var roleSpinner: MaterialAutoCompleteTextView
    private lateinit var btnRegister: Button
    private lateinit var btnGoToLogin: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        etUsername = findViewById(R.id.etUsername)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        roleSpinner = findViewById(R.id.roleSpinner) // MaterialAutoCompleteTextView en lugar de Spinner
        btnRegister = findViewById(R.id.btnRegister)
        btnGoToLogin = findViewById(R.id.btnGoToLogin)

        btnGoToLogin.setOnClickListener {
            finish() // Cierra esta actividad y vuelve a la anterior (Login)
        }

        // Configurar MaterialAutoCompleteTextView como un menú desplegable
        val roles = arrayOf("cliente", "detective", "administrador")
        val adapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, roles)
        roleSpinner.setAdapter(adapter)

        btnRegister.setOnClickListener {
            val username = etUsername.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()
            val selectedRole = roleSpinner.text.toString() // Ahora es un TextView, no un Spinner

            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || selectedRole.isEmpty()) {
                Toast.makeText(this, "Por favor, completa todos los campos", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            registerUser(username, email, password, selectedRole)
        }
    }

    private fun registerUser(username: String, email: String, password: String, role: String) {
        val user = User(
            username = username,
            email = email,
            password = password,
            role = role
        )

        Retrofit.authService.registerUser(user).enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                if (response.isSuccessful) {
                    val registerResponse = response.body()
                    Toast.makeText(applicationContext, registerResponse?.message ?: "Registro exitoso", Toast.LENGTH_LONG).show()
                    finish() // Cierra la actividad y vuelve al login
                } else {
                    val errorBody = response.errorBody()?.string()
                    Toast.makeText(applicationContext, "Error: $errorBody", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                Toast.makeText(applicationContext, "Error de conexión: ${t.message}", Toast.LENGTH_LONG).show()
            }
        })
    }
}