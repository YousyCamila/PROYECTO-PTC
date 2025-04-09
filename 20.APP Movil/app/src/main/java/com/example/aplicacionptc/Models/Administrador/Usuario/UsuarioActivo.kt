package com.example.aplicacionptc.Models.Administrador.Usuario

import com.example.aplicacionptc.Models.Administrador.Contrato.Contrato
import com.example.ptc_app.Models.Administrador.Caso.Caso

object UsuarioActivo {
    var id: String? = null
    var username: String? = null
    var email: String? = null
    var role: String? = null
    var casos: List<Caso>? = null
    var contratos: List<Contrato>? = null
}
