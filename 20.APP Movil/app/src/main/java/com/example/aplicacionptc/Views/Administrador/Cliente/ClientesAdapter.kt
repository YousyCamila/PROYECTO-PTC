package com.example.aplicacionptc.Views.Administrador.Cliente

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicacionptc.R
import com.example.ptc_app.Models.Administrador.Cliente.Clientes

class ClientesAdapter(
    private val clientes: MutableList<Clientes>,
    private val onEditar: (Clientes) -> Unit,
    private val onDetalles: (Clientes) -> Unit
) : RecyclerView.Adapter<ClientesAdapter.ClienteViewHolder>() {

    inner class ClienteViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val txtNombre: TextView = view.findViewById(R.id.txtNombreCliente)
        val btnEditar: Button = view.findViewById(R.id.btnEditar)
        val btnDetalles: Button = view.findViewById(R.id.btnDetalles)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ClienteViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.activity_cliente_adapter, parent, false)
        return ClienteViewHolder(view)
    }

    override fun onBindViewHolder(holder: ClienteViewHolder, position: Int) {
        val cliente = clientes[position]
        holder.txtNombre.text = "${cliente.nombres} ${cliente.apellidos ?: ""}".trim()

        holder.btnEditar.setOnClickListener { onEditar(cliente) }
        holder.btnDetalles.setOnClickListener { onDetalles(cliente) }
    }

    override fun getItemCount(): Int = clientes.size

    fun actualizarLista(nuevaLista: List<Clientes>) {
        clientes.clear()
        clientes.addAll(nuevaLista)
        notifyDataSetChanged()
    }
}