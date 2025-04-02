package com.example.aplicacionptc.Views.Administrador.Caso

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Caso.Caso
import com.google.android.material.button.MaterialButton

class CasosAdapter(
    private val casos: List<Caso>,
    private val onEditar: (Caso) -> Unit,
    private val onEliminar: (Caso, Int) -> Unit,
    private val onDetalles: (Caso) -> Unit
) : RecyclerView.Adapter<CasosAdapter.CasoViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CasoViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_caso, parent, false)
        return CasoViewHolder(view)
    }

    override fun onBindViewHolder(holder: CasoViewHolder, position: Int) {
        val caso = casos[position]
        holder.bind(caso, onEditar, onEliminar, onDetalles, position)
    }

    override fun getItemCount(): Int = casos.size

    class CasoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val txtNombreCaso: TextView = itemView.findViewById(R.id.txtNombreCaso)
        private val txtCliente: TextView = itemView.findViewById(R.id.txtCliente)
        private val txtDetective: TextView = itemView.findViewById(R.id.txtDetective)
        private val btnVerDetalles: MaterialButton = itemView.findViewById(R.id.btnVerDetalles)
        private val btnDesactivar: MaterialButton = itemView.findViewById(R.id.btnDesactivar)

        fun bind(caso: Caso, onEditar: (Caso) -> Unit, onEliminar: (Caso, Int) -> Unit, onDetalles: (Caso) -> Unit, position: Int) {
            txtNombreCaso.text = "Caso: ${caso.nombreCaso}"
            txtCliente.text = "Cliente: ${caso.idCliente}"
            txtDetective.text = "Detective: ${caso.idDetective}"

            btnVerDetalles.setOnClickListener { onDetalles(caso) }
            btnDesactivar.setOnClickListener { onEliminar(caso, position) }
        }
    }
}
