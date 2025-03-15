package com.example.aplicacionptc.Views.Administrador.Contrato

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.ptc_app.Models.Administrador.Contrato.ModelContrato
import com.example.aplicacionptc.R

class ContratoAdapter(context: Context, private val contratos: List<ModelContrato>) :
    ArrayAdapter<ModelContrato>(context, 0, contratos) {

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.activity_contrato_adapter, parent, false)
        val contrato = contratos[position]

        val txtNombre = view.findViewById<TextView>(R.id.txtNombreContrato)
        val txtFecha = view.findViewById<TextView>(R.id.txtFechaContrato)
        val btnEditar = view.findViewById<Button>(R.id.btnEditar)
        val btnVerDetalle = view.findViewById<Button>(R.id.btnVerDetalle)
        val btnDesactivar = view.findViewById<Button>(R.id.btnDesactivar)

        txtNombre.text = contrato.getDescripcionServicio()
        txtFecha.text = "Fecha: ${contrato.getFechaCreacion()}"

        btnEditar.setOnClickListener { Toast.makeText(context, "Editar contrato", Toast.LENGTH_SHORT).show() }
        btnVerDetalle.setOnClickListener { Toast.makeText(context, "Ver detalles", Toast.LENGTH_SHORT).show() }
        btnDesactivar.setOnClickListener { Toast.makeText(context, "Contrato desactivado", Toast.LENGTH_SHORT).show() }

        return view
    }
}
