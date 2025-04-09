package com.example.aplicacionptc.Views.Administrador.Caso

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.example.aplicacionptc.R
import com.google.android.material.button.MaterialButton
import androidx.core.content.ContextCompat

class CasosAdapter(
    private val context: Context,
    private val listaCasos: MutableList<Caso>,
    private val onVerDetalles: (Caso) -> Unit,
    private val onDesactivar: (Caso, Int) -> Unit
) : RecyclerView.Adapter<CasosAdapter.CasoViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CasoViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_caso, parent, false)
        return CasoViewHolder(view)
    }

    override fun onBindViewHolder(holder: CasoViewHolder, position: Int) {
        val caso = listaCasos[position]

        holder.txtNombreCaso.text = caso.nombreCaso
        holder.txtCliente.text = "Cliente: ${caso.idCliente?.nombres ?: ""} ${caso.idCliente?.apellidos ?: ""}"
        holder.txtDetective.text = "Detective: ${caso.idDetective?.nombres ?: ""} ${caso.idDetective?.apellidos ?: ""}"


        // Mostrar el estado según si el caso está activo o no
        if (caso.activo == false) {
            holder.btnDesactivar.text = "Desactivado"
            holder.btnDesactivar.isEnabled = false
            holder.btnDesactivar.setBackgroundColor(ContextCompat.getColor(context, R.color.gray))
            holder.btnDesactivar.setIconResource(R.drawable.ic_block_gray)
        } else {
            holder.btnDesactivar.text = "Desactivar"
            holder.btnDesactivar.isEnabled = true
            holder.btnDesactivar.setBackgroundColor(ContextCompat.getColor(context, R.color.error_red))
            holder.btnDesactivar.setIconResource(R.drawable.ic_block)
        }

        // Evento del botón
        holder.btnDesactivar.setOnClickListener {
            // Cambia el estado del caso
            caso.activo = false
            // Actualiza solo ese ítem
            notifyItemChanged(position)
        }
    }



    override fun getItemCount(): Int = listaCasos.size

    inner class CasoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val txtNombreCaso: TextView = itemView.findViewById(R.id.txtNombreCaso)
        val txtCliente: TextView = itemView.findViewById(R.id.txtCliente)
        val txtDetective: TextView = itemView.findViewById(R.id.txtDetective)
        val btnVerDetalles: MaterialButton = itemView.findViewById(R.id.btnVerDetalles)
        val btnDesactivar: MaterialButton = itemView.findViewById(R.id.btnDesactivar)
    }
}
