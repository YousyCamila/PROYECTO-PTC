package com.example.aplicacionptc.Views.Administrador.Caso

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import android.widget.Button
import android.content.Intent
import android.widget.Toast
import com.example.aplicacionptc.R
import com.example.aplicacionptc.Controllers.Admistrador.Caso.CasoService

class CasosAdapter(private val context: Context, private val casos: List<CasoInfo>) : BaseAdapter() {

    override fun getCount(): Int = casos.size
    override fun getItem(position: Int): Any = casos[position]
    override fun getItemId(position: Int): Long = casos[position].id.toLong()

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.item_caso, parent, false)

        val caso = casos[position]

        // Asignamos los valores a los elementos de la UI
        val txtNombreCaso = view.findViewById<TextView>(R.id.txtNombreCaso)
        val txtCliente = view.findViewById<TextView>(R.id.txtCliente)
        val txtDetective = view.findViewById<TextView>(R.id.txtDetective)
        val btnVerDetalles = view.findViewById<Button>(R.id.btnVerDetalles)
        val btnDesactivar = view.findViewById<Button>(R.id.btnDesactivar)

        txtNombreCaso.text = "Caso: ${caso.nombre}"
        txtCliente.text = "Cliente: ${caso.cliente}"
        txtDetective.text = "Detective: ${caso.detective}"

        // Evento para ver detalles del caso
        btnVerDetalles.setOnClickListener {
            val intent = Intent(context, DetallesCasoActivity::class.java)
            intent.putExtra("CASO_ID", caso.id)
            context.startActivity(intent)
        }

        // Evento para desactivar caso
        btnDesactivar.setOnClickListener {
            CasoService().desactivarCaso(caso.id)
            Toast.makeText(context, "Caso ${caso.nombre} desactivado", Toast.LENGTH_SHORT).show()
        }

        return view
    }
}
