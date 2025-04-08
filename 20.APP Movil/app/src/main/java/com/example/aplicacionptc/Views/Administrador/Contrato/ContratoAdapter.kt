package com.example.aplicacionptc.Views.Administrador.Contrato

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.DatePickerDialog
import android.content.Context
import android.icu.util.Calendar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.aplicacionptc.R
import com.google.android.material.switchmaterial.SwitchMaterial
import java.text.SimpleDateFormat
import java.util.*

class ContratoAdapter(
    context: Context,
    private val contratos: List<Contrato>
) : ArrayAdapter<Contrato>(context, 0, contratos) {

    private val dateFormatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())

    @SuppressLint("SetTextI18n")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context).inflate(
            R.layout.activity_contrato_adapter,
            parent,
            false
        )

        val contrato = contratos[position]

        val txtNombre = view.findViewById<TextView>(R.id.txtNombreContrato)
        val txtFecha = view.findViewById<TextView>(R.id.txtFechaContrato)
        val btnEditar = view.findViewById<Button>(R.id.btnEditar)
        val btnVerDetalle = view.findViewById<Button>(R.id.btnVerDetalle)
        val btnDesactivar = view.findViewById<Button>(R.id.btnDesactivar)

        txtNombre.text = contrato.descripcionServicio
        txtFecha.text = "Creado el: ${formatearFecha(contrato.fechaInicio)}"

        // Cambia el estado visual del botón dependiendo del estado del contrato
        if (contrato.estado == true) {
            btnDesactivar.text = "Desactivar"
            btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.rojo))
        } else {
            btnDesactivar.text = "Activar"
            btnDesactivar.setBackgroundTintList(context.getColorStateList(R.color.verde))
        }

        // Detalle del contrato
        btnVerDetalle.setOnClickListener {
            AlertDialog.Builder(context).apply {
                setTitle("Detalles del Contrato")
                setMessage(
                    "Descripción: ${contrato.descripcionServicio}\n" +
                            "Fecha Inicio: ${formatearFecha(contrato.fechaInicio)}\n" +
                            "Fecha Cierre: ${formatearFecha(contrato.fechaCierre)}\n" +
                            "Cláusulas: ${contrato.clausulas}\n" +
                            "Tarifa: \$${contrato.tarifa}\n" +
                            "Estado: ${if (contrato.estado == true) "Activo" else "Inactivo"}\n\n" +
                            "Cliente ID: ${contrato.idCliente}\n" +
                            "Detective ID: ${contrato.idDetective}"
                )
                setPositiveButton("Cerrar", null)
            }.show()
        }

        // Editar contrato (función local para vista)
        btnEditar.setOnClickListener {
            mostrarDialogoEditar(context, contrato)
        }

        // Simulación cambio de estado local (recomendado: usar API real para actualizar)
        btnDesactivar.setOnClickListener {
            contrato.estado = !(contrato.estado ?: true)
            notifyDataSetChanged()
        }

        return view
    }

    private fun formatearFecha(fecha: String?): String {
        return try {
            val parser = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val date = parser.parse(fecha ?: "")
            dateFormatter.format(date!!)
        } catch (e: Exception) {
            fecha ?: "Sin fecha"
        }
    }

    private fun mostrarDialogoEditar(context: Context, contrato: Contrato) {
        val dialogView = LayoutInflater.from(context).inflate(R.layout.editar_contrato, null)

        val inputDescripcion = dialogView.findViewById<EditText>(R.id.inputDescripcionEditar)
        val inputFechaCierre = dialogView.findViewById<EditText>(R.id.inputFechaCierreEditar)
        val inputClausulas = dialogView.findViewById<EditText>(R.id.inputClausulasEditar)
        val inputTarifa = dialogView.findViewById<EditText>(R.id.inputTarifaEditar)
        val checkEstado = dialogView.findViewById<SwitchMaterial>(R.id.checkEstadoEditar)

        inputDescripcion.setText(contrato.descripcionServicio)
        inputFechaCierre.setText(formatearFecha(contrato.fechaCierre))
        inputClausulas.setText(contrato.clausulas)
        inputTarifa.setText(contrato.tarifa?.toString() ?: "")
        checkEstado.isChecked = contrato.estado == true

        inputFechaCierre.setOnClickListener {
            val calendar = Calendar.getInstance()
            DatePickerDialog(
                context,
                { _, year, month, day ->
                    inputFechaCierre.setText(String.format("%02d/%02d/%04d", day, month + 1, year))
                },
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
            ).show()
        }

        AlertDialog.Builder(context).apply {
            setTitle("Editar Contrato")
            setView(dialogView)
            setPositiveButton("Guardar") { _, _ ->
                contrato.descripcionServicio = inputDescripcion.text.toString()
                contrato.clausulas = inputClausulas.text.toString()
                contrato.fechaCierre = convertirFecha(inputFechaCierre.text.toString())
                contrato.tarifa = inputTarifa.text.toString()
                contrato.estado = checkEstado.isChecked
                notifyDataSetChanged()

                Toast.makeText(context, "Contrato actualizado localmente", Toast.LENGTH_SHORT).show()

                // Aquí podrías llamar a tu API para actualizar el contrato
                // Por ejemplo: Retrofit.contratoInstance.editarContrato(contrato.id, contrato)
            }
            setNegativeButton("Cancelar", null)
        }.show()
    }

    private fun convertirFecha(fecha: String): String {
        return try {
            val sdf = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
            val date = sdf.parse(fecha)
            val outputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            outputFormat.format(date!!)
        } catch (e: Exception) {
            ""
        }
    }
}
