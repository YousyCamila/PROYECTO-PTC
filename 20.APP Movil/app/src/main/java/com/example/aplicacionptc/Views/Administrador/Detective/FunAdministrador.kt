package com.example.ptc_app.Views.Detective

import Persona.Personas

abstract class FunAdministrador<T : Personas> {

    protected abstract val lista: MutableList<T>

    open fun crear(nuevo: T) {
        lista.add(nuevo)
    }

    open fun editar(index: Int, campo: String, nuevoValor: String) {
        if (index !in lista.indices) return

        val persona = lista[index]

        when (campo.lowercase()) {
            "nombre" -> persona.nombre = nuevoValor
            "celular" -> persona.celular = nuevoValor
            "direccion" -> persona.direccion = nuevoValor
            "correo" -> persona.correo = nuevoValor
            else -> return // Campo no reconocido
        }
    }

    open fun eliminar(idCliente: String) {
        lista.removeIf { it.id == idCliente }
    }



    open fun listar(): List<String> {
        if (lista.isEmpty()) return listOf("No hay registros disponibles.")

        return lista.mapIndexed { index, persona ->
            "${index + 1}. ID: ${persona.id}, Nombre: ${persona.nombre}, Celular: ${persona.celular}, Dirección: ${persona.direccion}, Correo: ${persona.correo}"
        }
    }
}
