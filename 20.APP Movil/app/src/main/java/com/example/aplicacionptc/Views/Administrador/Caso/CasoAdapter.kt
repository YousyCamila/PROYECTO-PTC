package com.example.aplicacionptc.Views.Administrador.Caso

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import android.widget.Button
import androidx.recyclerview.widget.RecyclerView

class CasoAdapter(private val casos: List<Caso>, private val onVolverClick: () -> Unit) :
    RecyclerView.Adapter<CasoAdapter.CasoViewHolder>() {

    class CasoViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nombreCaso: TextView = view.findViewById(R.id.tvNombreCaso)
        val cliente: TextView = view.findViewById(R.id.tvCliente)
        val detective: TextView = view.findViewById(R.id.tvDetective)
        val estado: TextView = view.findViewById(R.id.tvEstado)
        val btnVolver: Button = view.findViewById(R.id.btnVolver)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CasoViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_caso, parent, false)
        return CasoViewHolder(view)
    }

    override fun onBindViewHolder(holder: CasoViewHolder, position: Int) {
        val caso = casos[position]
        holder.nombreCaso.text = caso.nombreCaso
        holder.cliente.text = "Cliente: ${caso.idCliente}"
        holder.detective.text = "Detective: ${caso.idDetective}"
        holder.estado.text = if (caso.activo) "Activo" else "Inactivo"

        holder.btnVolver.setOnClickListener { onVolverClick() }
    }

    override fun getItemCount() = casos.size
}
