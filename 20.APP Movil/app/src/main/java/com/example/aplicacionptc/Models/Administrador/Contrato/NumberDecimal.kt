package com.example.aplicacionptc.Models.Administrador.Contrato

import com.google.gson.annotations.SerializedName
import java.math.BigDecimal

data class NumberDecimal(
    val value: BigDecimal
) {
    constructor(value: String) : this(BigDecimal(value))
    constructor(value: Double) : this(BigDecimal.valueOf(value))
    constructor(value: Int) : this(BigDecimal.valueOf(value.toLong()))
    constructor(value: Long) : this(BigDecimal.valueOf(value))

    override fun toString(): String {
        return value.toPlainString()
    }
}