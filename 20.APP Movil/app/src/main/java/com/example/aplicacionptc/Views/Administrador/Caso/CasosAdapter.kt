package com.example.aplicacionptc.Views.Administrador.Caso

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import android.content.Intent
import androidx.core.content.ContextCompat
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
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

        // Buscar el nombre del cliente y detective basado en su ID
        val nombreCliente = Clientes.clientes.find { it.id == caso.idCliente }?.nombre ?: "Desconocido"
        val nombreDetective = Detectives.detectives.find { it.id == caso.idDetective }?.nombre ?: "Desconocido"

        // Configurar los textos con los nombres correctos
        txtNombreCaso.text = "Caso: ${caso.nombreCaso}"
        txtCliente.text = "Cliente: $nombreCliente"
        txtDetective.text = "Detective: $nombreDetective"
        txtFechaCreacion.text = "Fecha de creación: ${caso.fechaCreacion ?: "Desconocida"}"

        // Verificar si el caso está activo o desactivado y cambiar la UI
        if (caso.activo) {
            btnDesactivar.text = "Desactivar"
            btnDesactivar.isEnabled = true
            btnDesactivar.setBackgroundColor(ContextCompat.getColor(context, R.color.error_red))
        } else {
            // Caso desactivado: cambiar colores de los textos
            txtNombreCaso.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))
            txtCliente.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))
            txtDetective.setTextColor(ContextCompat.getColor(context, R.color.dark_gray))

            btnDesactivar.text = "Desactivado"
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
            val builder = android.app.AlertDialog.Builder(context)
            builder.setTitle("Confirmar desactivación")
            builder.setMessage("¿Estás seguro de que deseas desactivar este caso? Esta acción es permanente.")

            builder.setPositiveButton("Sí, desactivar") { _, _ ->
                CasoService().desactivarCaso(caso.id) // Lógica para desactivar el caso
                caso.activo = false // Actualizamos el estado localmente
                notifyDataSetChanged() // Refrescamos la lista

                Toast.makeText(context, "Caso ${caso.nombreCaso} desactivado", Toast.LENGTH_SHORT).show()
            }

            builder.setNegativeButton("Cancelar") { dialog, _ ->
                dialog.dismiss() // Cerrar el diálogo sin hacer nada
            }

            val alertDialog = builder.create()
            alertDialog.show()
        }

        return view
    }
}
