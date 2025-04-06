package com.example.aplicacionptc.Validaciones

import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

object Validaciones {

    fun String.esNombreValido(): Boolean {
        return this.matches(Regex("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$"))
    }

    fun String.esEmailValido(): Boolean {
        return this.matches(Regex("^[\\w.-]+@[\\w.-]+\\.com$"))
    }

    fun String.esCedulaValida(): Boolean {
        return this.matches(Regex("^\\d{10}$"))
    }


    fun String.toUpperCaseSafe(): String {
        return this.uppercase(Locale.getDefault())
    }

    fun String.esMayorDeEdad(): Boolean {
        val formatoFecha = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        return try {
            val fechaNacimiento = formatoFecha.parse(this) ?: return false
            val calendarioNacimiento = Calendar.getInstance().apply { time = fechaNacimiento }
            val calendarioActual = Calendar.getInstance()
            val edad = calendarioActual.get(Calendar.YEAR) - calendarioNacimiento.get(Calendar.YEAR)

            if (calendarioActual.get(Calendar.DAY_OF_YEAR) < calendarioNacimiento.get(Calendar.DAY_OF_YEAR)) {
                return edad - 1 >= 18
            }
            edad >= 18
        } catch (e: Exception) {
            false
        }
    }
}
