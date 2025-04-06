package com.example.aplicacionptc

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Auth.RegisterActivity
import com.example.aplicacionptc.Models.Administrador.Usuario.AuthResponse
import com.example.aplicacionptc.Models.Administrador.Usuario.User
import com.google.android.material.textfield.MaterialAutoCompleteTextView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.regex.Pattern

class LoginActivity : AppCompatActivity() {

    private lateinit var emailEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var roleDropdown: MaterialAutoCompleteTextView
    private lateinit var loginButton: Button
    private lateinit var registerButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        roleDropdown = findViewById(R.id.roleSpinner) // Asegúrate de que el ID es correcto
        loginButton = findViewById(R.id.loginButton)
        registerButton = findViewById(R.id.registerButton)

        // Verificar si hay sesión activa
        checkSession()

        // Configurar el Dropdown con roles
        val roles = arrayOf("cliente", "detective", "administrador")
        val adapter = ArrayAdapter(this, android.R.layout.simple_dropdown_item_1line, roles)
        roleDropdown.setAdapter(adapter)

        registerButton.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        loginButton.setOnClickListener {
            val email = emailEditText.text.toString().trim()
            val password = passwordEditText.text.toString().trim()
            val selectedRole = roleDropdown.text.toString().trim()

            if (email.isEmpty() || password.isEmpty() || selectedRole.isEmpty()) {
                Toast.makeText(this, "Por favor, completa todos los campos", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            loginUser(email, password, selectedRole)
        }
    }

    private fun loginUser(email: String, password: String, role: String) {
        if (!isValidEmail(email)) {
            Toast.makeText(this, "Correo inválido", Toast.LENGTH_SHORT).show()
            return
        }

        if (password.length < 6) {
            Toast.makeText(this, "La contraseña debe tener al menos 6 caracteres", Toast.LENGTH_SHORT).show()
            return
        }

        Log.d("LoginDebug", "Email: $email, Password: [HIDDEN], Role: $role")

        val user = User(username = "", email = email, password = password, role = role)

        Retrofit.authService.login(user).enqueue(object : Callback<AuthResponse> {
            override fun onResponse(call: Call<AuthResponse>, response: Response<AuthResponse>) {
                if (response.isSuccessful) {
                    val authResponse = response.body()

                    if (authResponse == null || authResponse.accessToken.isNullOrEmpty()) {
                        Log.e("LoginError", "Error: No se recibió el token")
                        Toast.makeText(this@LoginActivity, "Error: No se recibió el token de autenticación", Toast.LENGTH_SHORT).show()
                        return
                    }

                    // Guardar sesión
                    saveSession(authResponse.accessToken, authResponse.role ?: "")

                    Log.d("LoginSuccess", "Token: ${authResponse.accessToken}, Role: ${authResponse.role}")

                    // Ir a HomeActivity
                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()
                } else {
                    val errorMsg = response.errorBody()?.string() ?: "Error desconocido"
                    Toast.makeText(this@LoginActivity, "Error en login: $errorMsg", Toast.LENGTH_SHORT).show()
                    Log.e("LoginError", "Código de error: ${response.code()} - $errorMsg")
                }
            }

            override fun onFailure(call: Call<AuthResponse>, t: Throwable) {
                Toast.makeText(this@LoginActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
                Log.e("LoginError", "Fallo en la conexión: ${t.message}")
            }
        })
    }

    private fun saveSession(token: String, role: String) {
        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE).edit()
        sharedPref.putString("accessToken", token)
        sharedPref.putString("userRole", role)
        sharedPref.apply()
    }

    private fun checkSession() {
        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE)
        val token = sharedPref.getString("accessToken", null)

        if (!token.isNullOrEmpty()) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }

    private fun isValidEmail(email: String): Boolean {
        val emailPattern = Pattern.compile("[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+")
        return emailPattern.matcher(email).matches()
    }
}
