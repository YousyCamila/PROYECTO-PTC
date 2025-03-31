package com.example.aplicacionptc.Views.Administrador.Detective

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Detective.Detectives

class DetectivesAdapter(
    private val detectives: MutableList<Detectives>,
    private val onEditar: (Int) -> Unit,
    private val onEliminar: (Int) -> Unit,
    private val onDetalles: (Int) -> Unit
) : RecyclerView.Adapter<DetectivesAdapter.DetectiveViewHolder>() {

    class DetectiveViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val txtNombre: TextView = view.findViewById(R.id.txtNombreDetective)
        val btnEditar: Button = view.findViewById(R.id.btnEditar)
        val btnEliminar: Button = view.findViewById(R.id.btnEliminar)
        val btnDetalles: Button = view.findViewById(R.id.btnDetalles)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DetectiveViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.activity_detective_adapter, parent, false)
        return DetectiveViewHolder(view)
    }

    override fun onBindViewHolder(holder: DetectiveViewHolder, position: Int) {
        val detective = detectives[position]
        holder.txtNombre.text = detective.nombres

        holder.btnEditar.setOnClickListener { onEditar(position) }
        holder.btnEliminar.setOnClickListener { onEliminar(position) }
        holder.btnDetalles.setOnClickListener { onDetalles(position) }
    }

    override fun getItemCount(): Int = detectives.size
}