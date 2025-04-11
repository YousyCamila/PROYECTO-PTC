package com.example.aplicacionptc.Views.Cliente.Evidencias

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.Models.Cliente.Evidencias.Evidencia
import com.example.aplicacionptc.R

class EvidenciaClienteAdapter(private val listaEvidencias: List<Evidencia>) :
    RecyclerView.Adapter<EvidenciaClienteAdapter.EvidenciaViewHolder>() {

    class EvidenciaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val descripcion: TextView = itemView.findViewById(R.id.tvDescripcion)
        val fecha: TextView = itemView.findViewById(R.id.tvFecha)
        val tipo: TextView = itemView.findViewById(R.id.tvTipo)
        val iconArchivo: ImageView = itemView.findViewById(R.id.iconArchivo)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EvidenciaViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_evidencia_cliente, parent, false)
        return EvidenciaViewHolder(view)
    }

    override fun onBindViewHolder(holder: EvidenciaViewHolder, position: Int) {
        val evidencia = listaEvidencias[position]
        holder.descripcion.text = evidencia.descripcion
        holder.fecha.text = "📅 ${evidencia.fechaEvidencia}"
        holder.tipo.text = "🔍 ${evidencia.tipoEvidencia.joinToString(", ")}"

        // Mostrar ícono si tiene archivo
        if (!evidencia.archivo.isNullOrEmpty()) {
            when {
                evidencia.archivo.endsWith(".pdf", true) -> holder.iconArchivo.setImageResource(R.drawable.ic_pdf)
                evidencia.archivo.endsWith(".mp4", true) -> holder.iconArchivo.setImageResource(R.drawable.ic_video)
                else -> holder.iconArchivo.setImageResource(R.drawable.ic_image)
            }
            holder.iconArchivo.visibility = View.VISIBLE
        } else {
            holder.iconArchivo.visibility = View.GONE
        }

        // Abrir detalles
        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, DetalleEvidenciaClienteActivity::class.java)
            intent.putExtra("idEvidencia", evidencia._id)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = listaEvidencias.size
}
