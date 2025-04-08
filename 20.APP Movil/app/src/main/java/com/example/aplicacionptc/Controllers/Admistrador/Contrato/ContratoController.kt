//package com.example.aplicacionptc.Controllers.Admistrador.Contrato
//
//import com.example.ptc_app.Models.Administrador.Cliente.Clientes
//import com.example.ptc_app.Models.Administrador.Contrato.ModelContrato
//import com.example.ptc_app.Models.Administrador.Detective.Detectives
//import java.text.SimpleDateFormat
//import java.util.Date
//import java.util.Locale
//
//class ContratoController {
//
//    companion object {
//
//         val listaContratos = mutableListOf<ModelContrato>()
//
//
//        fun obtenerContratos(): List<ModelContrato> = listaContratos
//    }
//
//
//    fun agregarContrato(
//        clienteSeleccionado: Clientes,
//        detectiveSeleccionado: Detectives,
//        descripcion: String,
//        fechaInicioStr: String,
//        fechaCierreStr: String,
//        clausulas: String,
//        tarifa: Float,
//        estado: Boolean = true
//    ): String {
//
//        val fechaInicio = convertirFecha(fechaInicioStr)
//        val fechaCierre = convertirFecha(fechaCierreStr)
//
//        val nuevoContrato = ModelContrato(
//            descripcionServicio = descripcion,
//            fechaInicio = fechaInicio,
//            fechaCierre = fechaCierre,
//            clausulas = clausulas,
//            tarifa = tarifa,
//            estado = estado,
//            cliente = clienteSeleccionado,
//            detective = detectiveSeleccionado
//        )
//
//        listaContratos.add(nuevoContrato)
//
//        return "✅ Contrato creado con éxito para el cliente ${clienteSeleccionado.nombre}."
//    }
//
//
//    fun editarContrato(
//        indice: Int,
//        nuevaDescripcion: String,
//        nuevaFechaInicioStr: String,
//        nuevaFechaCierreStr: String,
//        nuevasClausulas: String,
//        nuevaTarifa: Float,
//        nuevoEstado: Boolean
//    ): String {
//        return if (indice in listaContratos.indices) {
//            val contrato = listaContratos[indice]
//            contrato.setDescripcionServicio(nuevaDescripcion)
//            contrato.setFechaInicio(convertirFecha(nuevaFechaInicioStr))
//            contrato.setFechaCierre(convertirFecha(nuevaFechaCierreStr))
//            contrato.setClausulas(nuevasClausulas)
//            contrato.setTarifa(nuevaTarifa)
//            contrato.setEstado(nuevoEstado)
//
//            " Contrato actualizado correctamente para el cliente ${contrato.getCliente().nombre}."
//        } else {
//            " Índice inválido. No se pudo actualizar el contrato."
//        }
//    }
//
//
//    fun desactivarContrato(indice: Int): String {
//        return if (indice in listaContratos.indices) {
//            val contrato = listaContratos[indice]
//            contrato.setEstado(false)
//            "Contrato del cliente ${contrato.getCliente().nombre} desactivado correctamente."
//        } else {
//            " Índice inválido. No se pudo desactivar el contrato."
//        }
//    }
//    fun activarContrato(indice: Int): String {
//        return if (indice in listaContratos.indices) {
//            val contrato = listaContratos[indice]
//            contrato.setEstado(true)
//            "Contrato del cliente ${contrato.getCliente().nombre} activado correctamente."
//        } else {
//            " Índice inválido. No se pudo desactivar el contrato."
//        }
//    }
//
//
//    private fun convertirFecha(fechaStr: String): Date {
//        val formato = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
//        return try {
//            formato.parse(fechaStr) ?: Date()
//        } catch (e: Exception) {
//            Date()
//        }
//    }
//}