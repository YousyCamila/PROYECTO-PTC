package com.example.aplicacionptc.Controllers.Admistrador.Detective

import com.example.ptc_app.Models.Administrador.Detective.Detectives
import com.example.ptc_app.Views.Detective.FunAdministrador

class ControladorDetectiv : FunAdministrador<Detectives>() {

    override val lista = mutableListOf<Detectives>()

    fun listarDetectives(): List<Detectives> {
        return lista
    }

    fun buscarPorId(id: String): Detectives? {
        return lista.find { it.id == id }
    }

    fun obtenerDetalleDetective(index: Int): String {
        return if (index in lista.indices) {
            val detective = lista[index]
            "ID: ${detective.id}, Nombre: ${detective.nombre}, Celular: ${detective.celular}, Dirección: ${detective.direccion}, Correo: ${detective.correo}"
        } else {
            "Detective no encontrado."
        }
    }
}
