package com.example.aplicacionptc.Views.Administrador.Cliente

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Controllers.Admistrador.Cliente.ControladorCliente
import com.example.aplicacionptc.MainActivity
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import com.google.android.material.floatingactionbutton.FloatingActionButton

class GestionClientesActivity : AppCompatActivity() {

    private lateinit var controladorCliente: ControladorCliente
    private lateinit var recyclerView: RecyclerView
    private lateinit var btnCrearCliente: FloatingActionButton
    private lateinit var adapter: ClientesAdapter

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
        val btnVolverHome= findViewById<MaterialButton>(R.id.btnVolverHome)
        btnVolverHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }


        // Inicializamos el controlador
        controladorCliente = ControladorCliente()


        recyclerView = findViewById(R.id.recyclerClientes)
        btnCrearCliente = findViewById(R.id.btnCrearCliente)


        recyclerView.layoutManager = LinearLayoutManager(this)


        adapter = ClientesAdapter(
            Clientes.clientes,
            onEditar = { position -> editarCliente(position) },
            onEliminar = { position -> eliminarCliente(position) },
            onDetalles = { position -> verDetallesCliente(position) }
        )
        recyclerView.adapter = adapter

        // Botón para ir a crear un nuevo cliente
        btnCrearCliente.setOnClickListener {
            val intent = Intent(this, CrearClienteActivity::class.java)
            startActivity(intent)
        }
    }


    private fun actualizarLista() {

        adapter.notifyDataSetChanged()
    }

    private fun editarCliente(posicion: Int) {
        val cliente = Clientes.clientes[posicion]

        val intent = Intent(this, EditarClienteActivity::class.java)
        intent.putExtra("posicion", posicion)
        intent.putExtra("nombre", cliente.nombre)
        intent.putExtra("celular", cliente.celular)
        intent.putExtra("direccion", cliente.direccion)
        intent.putExtra("correo", cliente.correo)
        startActivity(intent)
    }

    private fun eliminarCliente(posicion: Int) {
        val cliente = Clientes.clientes[posicion]
        val idCliente = cliente.id

        controladorCliente.eliminar(idCliente)

        Clientes.clientes.removeAt(posicion)

        adapter.notifyItemRemoved(posicion)

        Toast.makeText(this, "Cliente eliminado", Toast.LENGTH_SHORT).show()
    }

    private fun verDetallesCliente(posicion: Int) {
        val cliente = Clientes.clientes[posicion]

        val mensaje = """
        Nombre: ${cliente.nombre}
        ID: ${cliente.id}
        Teléfono: ${cliente.celular}
        Dirección: ${cliente.direccion}
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
        actualizarLista()
    }
}
