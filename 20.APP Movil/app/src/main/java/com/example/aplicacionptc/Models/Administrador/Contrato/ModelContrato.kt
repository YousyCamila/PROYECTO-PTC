package com.example.ptc_app.Models.Administrador.Contrato

import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Models.Administrador.Detective.Detectives
import java.util.Date

class ModelContrato(
    private var descripcionServicio: String,
    private var fechaInicio: Date,
    private var fechaCierre: Date,
    private var clausulas: String,
    private var tarifa: Float,
    private var estado: Boolean = true,
    private var cliente: Clientes,
    private var detective: Detectives,
    private val fechaCreacion: Date = Date()
) {
    // Getters y Setters
    fun getDescripcionServicio() = descripcionServicio
    fun setDescripcionServicio(desc: String) { descripcionServicio = desc }

    fun getFechaInicio() = fechaInicio
    fun setFechaInicio(fecha: Date) { fechaInicio = fecha }

    fun getFechaCierre() = fechaCierre
    fun setFechaCierre(fecha: Date) { fechaCierre = fecha }

    fun getClausulas() = clausulas
    fun setClausulas(cl: String) { clausulas = cl }

    fun getTarifa() = tarifa
    fun setTarifa(t: Float) { tarifa = t }

    fun getEstado() = estado
    fun setEstado(est: Boolean) { estado = est }

    fun getCliente() = cliente
    fun setCliente(cl: Clientes) { cliente = cl }

    fun getDetective() = detective
    fun setDetective(det: Detectives) { detective = det }

    fun getFechaCreacion() = fechaCreacion

}
