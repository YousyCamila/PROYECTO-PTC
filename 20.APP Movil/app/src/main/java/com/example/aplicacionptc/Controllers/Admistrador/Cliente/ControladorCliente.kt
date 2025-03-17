package com.example.aplicacionptc.Controllers.Admistrador.Cliente

import Persona.Personas
import com.example.ptc_app.Models.Administrador.Cliente.Clientes
import com.example.ptc_app.Views.Detective.FunAdministrador

class ControladorCliente : FunAdministrador<Clientes>() {

        override val lista = mutableListOf<Clientes>()



    fun listarClientes(): List<Clientes> {
        return lista
    }
        fun buscarPorId(id: String): Clientes? {
            return lista.find { it.id == id }
        }

        fun obtenerDetalleCliente(index: Int): String {
            return if (index in lista.indices) {
                val cliente = lista[index]
                "ID: ${cliente.id}, Nombre: ${cliente.nombre}, Celular: ${cliente.celular}, Dirección: ${cliente.direccion}, Correo: ${cliente.correo}"
            } else {
                "Cliente no encontrado."
            }
        }
    }
