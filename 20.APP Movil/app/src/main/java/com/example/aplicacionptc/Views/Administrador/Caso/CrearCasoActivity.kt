//package com.example.aplicacionptc.Views.Administrador.Caso
//
//import android.app.Activity
//import android.os.Bundle
//import android.widget.*
//import androidx.appcompat.app.AppCompatActivity
//import com.example.aplicacionptc.Controllers.Admistrador.Caso.BaseDatosTemporal
//import com.example.ptc_app.Models.Administrador.Caso.Caso
//import com.example.ptc_app.Models.Administrador.Cliente.Clientes
//import com.example.ptc_app.Models.Administrador.Detective.Detectives
//import com.example.aplicacionptc.R
//import java.text.SimpleDateFormat
//import java.util.Date
//import java.util.Locale
//
//class CrearCasoActivity : AppCompatActivity() {
//
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_crear_caso)
//
//        val editTextIdCaso = findViewById<EditText>(R.id.editTextIdCaso)
//        val editTextNombreCaso = findViewById<EditText>(R.id.editTextNombreCaso)
//        val spinnerClientes = findViewById<Spinner>(R.id.spinnerClientes)
//        val spinnerDetectives = findViewById<Spinner>(R.id.spinnerDetectives)
//        val btnCrearCaso = findViewById<Button>(R.id.btnCrearCaso)
//
//        // Poblar los Spinners con los nombres de clientes y detectives
//        val clientes = Clientes.clientes
//        val detectives = Detectives.detectives
//
//        val clientesAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, clientes.map { it.nombre })
//        clientesAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
//        spinnerClientes.adapter = clientesAdapter
//
//        val detectivesAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, detectives.map { it.nombre })
//        detectivesAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
//        spinnerDetectives.adapter = detectivesAdapter
//
//        btnCrearCaso.setOnClickListener {
//            val idCaso = editTextIdCaso.text.toString()
//            val nombreCaso = editTextNombreCaso.text.toString()
//            val clienteSeleccionado = clientes[spinnerClientes.selectedItemPosition]
//            val detectiveSeleccionado = detectives[spinnerDetectives.selectedItemPosition]
//
//            if (idCaso.isEmpty() || nombreCaso.isEmpty()) {
//                Toast.makeText(this, "Por favor, complete todos los campos.", Toast.LENGTH_SHORT).show()
//                return@setOnClickListener
//            }
//
//            val fechaCreacion = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(Date())
//            val nuevoCaso = Caso(idCaso, nombreCaso, clienteSeleccionado.id, detectiveSeleccionado.id, true, fechaCreacion)
//            // Agregar el caso a la base de datos temporal
//            clienteSeleccionado.agregarCaso(nuevoCaso)
//            detectiveSeleccionado.agregarCaso(nuevoCaso)
//            BaseDatosTemporal.casos.add(nuevoCaso)
//
//            Toast.makeText(this, "Caso creado exitosamente", Toast.LENGTH_SHORT).show()
//            setResult(Activity.RESULT_OK)
//            finish()
//        }
//    }
//}
