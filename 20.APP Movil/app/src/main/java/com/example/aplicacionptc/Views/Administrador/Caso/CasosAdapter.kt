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
import androidx.core.content.ContextCompat
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.Controllers.Admistrador.Caso.CasoService

class CasosAdapter(private val context: Context, private val casos: List<Caso>) : BaseAdapter() {

    override fun getCount(): Int = casos.size
    override fun getItem(position: Int): Any = casos[position]
    override fun getItemId(position: Int): Long = casos[position].id.toLong()

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.item_caso, parent, false)
        val caso = casos[position]

        val txtNombreCaso = view.findViewById<TextView>(R.id.txtNombreCaso)
        val txtCliente = view.findViewById<TextView>(R.id.txtCliente)
        val txtDetective = view.findViewById<TextView>(R.id.txtDetective)
        val txtFechaCreacion = view.findViewById<TextView>(R.id.txtFechaCreacion)
        val btnVerDetalles = view.findViewById<Button>(R.id.btnVerDetalles)
        val btnDesactivar = view.findViewById<Button>(R.id.btnDesactivar)

        // Configurar los textos con valores correctos
        txtNombreCaso.text = context.getString(R.string.nombre_caso, caso.nombreCaso)
        txtCliente.text = context.getString(R.string.cliente, caso.idCliente.toString())
        txtDetective.text = context.getString(R.string.detective, caso.idDetective.toString())
        txtFechaCreacion.text = context.getString(R.string.fechaCreacion, caso.fechaCreacion ?: "Desconocida")

        // Verificar si el caso está activo o desactivado y cambiar la UI
        if (caso.activo) {
            btnDesactivar.text = context.getString(R.string.desactivar)
            btnDesactivar.isEnabled = true
            btnDesactivar.setBackgroundColor(ContextCompat.getColor(context, R.color.error_red))
        } else {
            // Caso desactivado: cambiar colores de los textos
            txtNombreCaso.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))
            txtCliente.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))
            txtDetective.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))

            btnDesactivar.text = context.getString(R.string.desactivado)
            btnDesactivar.isEnabled = false
            btnDesactivar.setBackgroundColor(ContextCompat.getColor(context, R.color.light_gray))
        }

        // Evento para ver detalles del caso
        btnVerDetalles.setOnClickListener {
            val intent = Intent(context, DetallesCasoActivity::class.java)
            intent.putExtra("CASO_ID", caso.id)
            context.startActivity(intent)
        }

        // Evento para desactivar caso
        btnDesactivar.setOnClickListener {
            CasoService().desactivarCaso(caso.id)
            Toast.makeText(context, "Caso ${caso.nombreCaso} desactivado", Toast.LENGTH_SHORT).show()
        }

        return view
    }
}
