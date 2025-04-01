package com.example.aplicacionptc.Views.Administrador.Cliente

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Api.Retrofit
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.FloatingActionButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GestionClientesActivity : AppCompatActivity() {

    private val controladorCliente = Retrofit.clienteInstance
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearCliente: FloatingActionButton
    private lateinit var adapter: ClientesAdapter
    private var listaClientes = mutableListOf<Clientes>()

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_gestion_clientes)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val btnVolverHome = findViewById<MaterialButton>(R.id.btnVolverHome)
        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        recyclerView = findViewById(R.id.recyclerClientes)
        btnCrearCliente = findViewById(R.id.btnCrearCliente)

        recyclerView.layoutManager = LinearLayoutManager(this)

        adapter = ClientesAdapter(
            listaClientes,
            onEditar = { cliente -> editarCliente(cliente) },
            onEliminar = { cliente, position -> eliminarCliente(cliente, position) },
            onDetalles = { cliente -> verDetallesCliente(cliente) }
        )

        recyclerView.adapter = adapter

        btnCrearCliente.setOnClickListener {
            val intent = Intent(this, CrearClienteActivity::class.java)
            startActivity(intent)
        }

        obtenerClientes()
    }

    private fun obtenerClientes() {
        controladorCliente.obtenerClientes().enqueue(object : Callback<List<Clientes>> {
            override fun onResponse(call: Call<List<Clientes>>, response: Response<List<Clientes>>) {
                if (response.isSuccessful) {
                    listaClientes.clear()
                    response.body()?.let { listaClientes.addAll(it) }
                    adapter.notifyDataSetChanged()
                } else {
                    Toast.makeText(this@GestionClientesActivity, "Error al obtener clientes", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<Clientes>>, t: Throwable) {
                Toast.makeText(this@GestionClientesActivity, "Fallo en la conexión: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun editarCliente(cliente: Clientes) {
        val intent = Intent(this, EditarClienteActivity::class.java).apply {
            putExtra("id", cliente.id)
            putExtra("nombre", cliente.nombres)
            putExtra("correo", cliente.correo)
        }
        startActivity(intent)
    }

    private fun eliminarCliente(cliente: Clientes, posicion: Int) {
        controladorCliente.desactivarCliente(cliente.id).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    listaClientes.removeAt(posicion)
                    adapter.notifyItemRemoved(posicion)
                    Toast.makeText(this@GestionClientesActivity, "Cliente desactivado", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this@GestionClientesActivity, "Error al desactivar cliente", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(this@GestionClientesActivity, "Error de conexión: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun verDetallesCliente(cliente: Clientes) {
        val mensaje = """
            Nombre: ${cliente.nombres}
            ID: ${cliente.id}
            Correo: ${cliente.correo}
        """.trimIndent()

        AlertDialog.Builder(this)
            .setTitle("Detalles del Cliente")
            .setMessage(mensaje)
            .setPositiveButton("Cerrar") { dialog, _ -> dialog.dismiss() }
            .show()
    }

    override fun onResume() {
        super.onResume()
        obtenerClientes()
    }
}
