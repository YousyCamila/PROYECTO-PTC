package com.example.aplicacionptc

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.Views.Administrador.Cliente.GestionClientesActivity
import com.example.aplicacionptc.Views.Administrador.Detective.GestionDetectivesActivity
import com.example.aplicacionptc.Views.Administrador.Caso.GestionCasosActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

       // val btnContratos = findViewById<Button>(R.id.btnContratos)
        val btnClientes = findViewById<Button>(R.id.btnClientes)
        val btnDetectives = findViewById<Button>(R.id.btnDetectives)
        val btnCasos = findViewById<Button>(R.id.btnCasos)
        val btnLogout = findViewById<Button>(R.id.btnLogout)

        // Navegación
        btnClientes.setOnClickListener {
            startActivity(Intent(this, GestionClientesActivity::class.java))
        }

        btnDetectives.setOnClickListener {
            startActivity(Intent(this, GestionDetectivesActivity::class.java))
        }


        val intent = Intent(this, GestionCasosActivity::class.java)
        startActivity(intent)


//        btnContratos.setOnClickListener {
//            startActivity(Intent(this, HomeContratoActivity::class.java))
//        }

        // Cerrar sesión
        btnLogout.setOnClickListener {
            logoutUser()
        }
    }






    private fun logoutUser() {
        val sharedPref = getSharedPreferences("LoginPrefs", Context.MODE_PRIVATE).edit()
        sharedPref.clear()
        sharedPref.apply()

        Retrofit.authService.logout().enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                Toast.makeText(this@MainActivity, "Sesión cerrada", Toast.LENGTH_SHORT).show()
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Error al cerrar sesión, pero serás redirigido", Toast.LENGTH_SHORT).show()
            }
        })
        redirectToLogin()
    }
    private fun redirectToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
    }
}
