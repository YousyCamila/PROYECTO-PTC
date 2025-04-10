package com.example.aplicacionptc.Models.Cliente.Evidencias

import okhttp3.MultipartBody
import okhttp3.RequestBody

data class EvidenciaUploadRequest(
    val fechaEvidencia: RequestBody,
    val descripcion: RequestBody,
    val idCasos: RequestBody,
    val tipoEvidencia: List<RequestBody>,
    val archivo: MultipartBody.Part?
)