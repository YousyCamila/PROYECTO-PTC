//package com.example.aplicacionptc.Views.Contrato
//
//import android.app.AlertDialog
//import android.app.DatePickerDialog
//import android.content.Context
//import android.icu.util.Calendar
//import android.view.LayoutInflater
//import android.view.View
//import android.view.ViewGroup
//import android.widget.*
//import com.example.aplicacionptc.Controllers.Admistrador.Contrato.ContratoController
//import com.example.ptc_app.Models.Administrador.Contrato.ModelContrato
//import com.example.aplicacionptc.R
//import com.google.android.material.switchmaterial.SwitchMaterial
//import java.text.SimpleDateFormat
//import java.util.Date
//import java.util.Locale
//
//class ContratoAdapter(
//    context: Context,
//    private val contratos: List<ModelContrato>,
//) : ArrayAdapter<ModelContrato>(context, 0, contratos) {
//
//
//    private val dateFormatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
//
//    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
//        val view = convertView ?: LayoutInflater.from(context).inflate(
//            R.layout.activity_contrato_adapter,
//            parent,
//            false
//        )
//
//        val contrato = contratos[position]
//
//        val txtNombre = view.findViewById<TextView>(R.id.txtNombreContrato)
//        val txtFecha = view.findViewById<TextView>(R.id.txtFechaContrato)
//        val btnEditar = view.findViewById<Button>(R.id.btnEditar)
//        val btnVerDetalle = view.findViewById<Button>(R.id.btnVerDetalle)
//        val btnDesactivar = view.findViewById<Button>(R.id.btnDesactivar)
//
//
//        txtNombre.text = contrato.getDescripcionServicio()
//
//        txtFecha.text = "Creado el: ${dateFormatter.format(contrato.getFechaCreacion())}"
//
//
//        if (contrato.getEstado()) {
//            btnDesactivar.text = "Desactivar"
//            btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.rojo))
//        } else {
//            btnDesactivar.text = "Activar"
//            btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.verde))
//        }
//
//
//        btnVerDetalle.setOnClickListener {
//            AlertDialog.Builder(context).apply {
//                setTitle("Detalles del Contrato")
//                setMessage(
//                    "Descripción: ${contrato.getDescripcionServicio()}\n" +
//                            "Fecha Inicio: ${dateFormatter.format(contrato.getFechaInicio())}\n" +
//                            "Fecha Cierre: ${dateFormatter.format(contrato.getFechaCierre())}\n" +
//                            "Cláusulas: ${contrato.getClausulas()}\n" +
//                            "Tarifa: \$${contrato.getTarifa()}\n" +
//                            "Estado: ${if (contrato.getEstado()) "Activo" else "Inactivo"}\n\n" +
//                            "Cliente asignado: ${contrato.getCliente().nombre}\n" +
//                            "Detective asignado: ${contrato.getDetective().nombre}"
//                )
//                setPositiveButton("Cerrar", null)
//            }.show()
//        }
//
//        btnEditar.setOnClickListener {
//            mostrarDialogoEditar(context, contrato, position)
//        }
//
//
//        btnDesactivar.setOnClickListener {
//            if (contrato.getEstado()) {
//                contrato.setEstado(false)
//                val resultado = ContratoController().desactivarContrato(position)
//                Toast.makeText(context, resultado, Toast.LENGTH_SHORT).show()
//            } else {
//                contrato.setEstado(true)
//                val resultado = ContratoController().activarContrato(position)
//                Toast.makeText(context, resultado, Toast.LENGTH_SHORT).show()
//            }
//
//            if (contrato.getEstado()) {
//                btnDesactivar.text = "Desactivar"
//                btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.rojo))
//            } else {
//                btnDesactivar.text = "Activar"
//                btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.verde))
//            }
//
//            notifyDataSetChanged()
//        }
//
//        return view
//    }
//
//    private fun mostrarDialogoEditar(context: Context, contrato: ModelContrato, index: Int) {
//        val dialogView = LayoutInflater.from(context).inflate(R.layout.editar_contrato, null)
//        val inputDescripcion = dialogView.findViewById<EditText>(R.id.inputDescripcionEditar)
//        val inputFechaCierre = dialogView.findViewById<EditText>(R.id.inputFechaCierreEditar)
//        val inputClausulas = dialogView.findViewById<EditText>(R.id.inputClausulasEditar)
//        val inputTarifa = dialogView.findViewById<EditText>(R.id.inputTarifaEditar)
//        val checkEstado = dialogView.findViewById<SwitchMaterial>(R.id.checkEstadoEditar)
//
//
//
//        inputDescripcion.setText(contrato.getDescripcionServicio())
//        inputFechaCierre.setText(dateFormatter.format(contrato.getFechaCierre()))
//        inputClausulas.setText(contrato.getClausulas())
//        inputTarifa.setText(contrato.getTarifa().toString())
//        checkEstado.isChecked = contrato.getEstado()
//
//        checkEstado.setOnCheckedChangeListener { _, isChecked ->
//            val estado = if (isChecked) "Contrato activo" else "Contrato inactivo"
//            Toast.makeText(context, estado, Toast.LENGTH_SHORT).show()
//        }
//
//        inputFechaCierre.setOnClickListener {
//            val calendar = Calendar.getInstance()
//            val datePickerDialog = DatePickerDialog(
//                context,
//                { _, year, month, dayOfMonth ->
//
//                    inputFechaCierre.setText(String.format("%02d/%02d/%04d", dayOfMonth, month + 1, year))
//                },
//                calendar.get(Calendar.YEAR),
//                calendar.get(Calendar.MONTH),
//                calendar.get(Calendar.DAY_OF_MONTH)
//            )
//            datePickerDialog.show()
//        }
//
//        AlertDialog.Builder(context).apply {
//            setTitle("Editar Contrato")
//            setView(dialogView)
//            setPositiveButton("Guardar") { _, _ ->
//
//
//                val fechaActual = dateFormatter.format(Date())
//
//
//                val resultado = ContratoController().editarContrato(
//                    index,
//                    inputDescripcion.text.toString(),
//                    fechaActual,
//                    inputFechaCierre.text.toString().trim(),
//                    inputClausulas.text.toString(),
//                    inputTarifa.text.toString().toFloat(),
//                    checkEstado.isChecked
//                )
//                contrato.setDescripcionServicio(inputDescripcion.text.toString())
//                contrato.setFechaCierre(dateFormatter.parse(inputFechaCierre.text.toString().trim()))
//                contrato.setClausulas(inputClausulas.text.toString())
//                contrato.setTarifa(inputTarifa.text.toString().toFloat())
//                contrato.setEstado(checkEstado.isChecked)
//                Toast.makeText(context, resultado, Toast.LENGTH_SHORT).show()
//                notifyDataSetChanged()
//            }
//            setNegativeButton("Cancelar", null)
//        }.show()
//    }
//}
