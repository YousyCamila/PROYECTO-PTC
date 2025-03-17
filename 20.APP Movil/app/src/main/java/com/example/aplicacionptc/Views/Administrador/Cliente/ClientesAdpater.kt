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
    private val onEditar: (Int) -> Unit,
    private val onEliminar: (Int) -> Unit,
    private val onDetalles: (Int) -> Unit
) : RecyclerView.Adapter<ClientesAdapter.ClienteViewHolder>() {

    class ClienteViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val txtNombre: TextView = view.findViewById(R.id.txtNombreCliente)
        val btnEditar: Button = view.findViewById(R.id.btnEditar)
        val btnEliminar: Button = view.findViewById(R.id.btnEliminar)
        val btnDetalles: Button = view.findViewById(R.id.btnDetalles)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ClienteViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.activity_cliente_adapter, parent, false)
        return ClienteViewHolder(view)
    }

    override fun onBindViewHolder(holder: ClienteViewHolder, position: Int) {
        val cliente = clientes[position]
        holder.txtNombre.text = cliente.nombre

        holder.btnEditar.setOnClickListener { onEditar(position) }
        holder.btnEliminar.setOnClickListener { onEliminar(position) }
        holder.btnDetalles.setOnClickListener { onDetalles(position) }
    }

    override fun getItemCount(): Int = clientes.size
}
