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

        holder.txtNombreCaso.text = "Caso: ${caso.nombreCaso}"

        val nombreCliente = "${caso.idCliente?.nombres ?: "Desconocido"} ${caso.idCliente?.apellidos ?: ""}"
        val nombreDetective = "${caso.idDetective?.nombres ?: "Desconocido"} ${caso.idDetective?.apellidos ?: ""}"

        holder.txtCliente.text = "Cliente: $nombreCliente"
        holder.txtDetective.text = "Detective: $nombreDetective"


        holder.btnVerDetalles.setOnClickListener {
            onVerDetalles(caso)
        }

        holder.btnDesactivar.setOnClickListener {
            onDesactivar(caso, position)
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
