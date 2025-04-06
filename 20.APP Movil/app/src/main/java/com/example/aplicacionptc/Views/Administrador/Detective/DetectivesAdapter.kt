package com.example.aplicacionptc.Views.Administrador.Detective

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import androidx.core.content.ContextCompat
import android.content.res.ColorStateList


class DetectivesAdapter(
    private val detectives: MutableList<Detectives>,
    private val onEditar: (Int) -> Unit,
    private val onEliminar: (Int) -> Unit,
    private val onDetalles: (Int) -> Unit
) : RecyclerView.Adapter<DetectivesAdapter.DetectiveViewHolder>() {

    class DetectiveViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val txtNombre: TextView = view.findViewById(R.id.txtNombreDetective)
        val btnEditar: Button = view.findViewById(R.id.btnEditar)
        val btnDetalles: Button = view.findViewById(R.id.btnDetalles)
        val btnEstado: Button = view.findViewById(R.id.btnEstado)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DetectiveViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.activity_detective_adapter, parent, false)
        return DetectiveViewHolder(view)
    }

    override fun onBindViewHolder(holder: DetectiveViewHolder, position: Int) {
        val detective = detectives[position]
        holder.txtNombre.text = "${detective.nombres} ${detective.apellidos ?: ""}".trim()

        holder.btnEditar.setOnClickListener { onEditar(position) }
        holder.btnDetalles.setOnClickListener { onDetalles(position) }

        val context = holder.itemView.context


        if (detective.activo) {
            holder.btnEstado.text = "Activo"
            holder.btnEstado.backgroundTintList = ColorStateList.valueOf(
                ContextCompat.getColor(context, R.color.verde)
            )
        } else {
            holder.btnEstado.text = "Inactivo"
            holder.btnEstado.backgroundTintList = ColorStateList.valueOf(
                ContextCompat.getColor(context, R.color.rojo)
            )
        }

    }

    override fun getItemCount(): Int = detectives.size

    fun actualizarLista(nuevaLista: List<Detectives>) {
        detectives.clear()
        detectives.addAll(nuevaLista)
        notifyDataSetChanged()
    }

    // Método para eliminar un cliente de la lista sin necesidad de lógica de API aquí
    fun eliminarDetective(position: Int) {
        detectives.removeAt(position)
        notifyItemRemoved(position)
    }
}