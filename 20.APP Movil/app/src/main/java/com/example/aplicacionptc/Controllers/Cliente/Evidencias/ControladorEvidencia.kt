package com.example.aplicacionptc.Controllers.Cliente.Evidencias


import com.example.aplicacionptc.Models.Cliente.Evidencias.Evidencia
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

interface ControladorEvidencia {

    @GET("evidencias")
    fun obtenerEvidencias(): Call<List<Evidencia>>

    @GET("evidencias/{id}")
    fun obtenerEvidenciaPorId(@Path("id") id: String): Call<Evidencia>

    @GET("evidencias/caso/{idCaso}")
    fun obtenerEvidenciasPorCaso(@Path("idCaso") idCaso: String): Call<List<Evidencia>>

    @POST("evidencias")
    fun crearEvidencia(@Body evidencia: Evidencia): Call<Evidencia>

    @PUT("evidencias/{id}")
    fun actualizarEvidencia(@Path("id") id: String, @Body evidencia: Evidencia): Call<Evidencia>

    @PATCH("evidencias/{id}/desactivar")
    fun desactivarEvidencia(@Path("id") id: String): Call<Void>

    @Multipart
    @POST("evidencias/upload")
    fun subirEvidenciaConArchivo(
        @Part("fechaEvidencia") fechaEvidencia: RequestBody,
        @Part("descripcion") descripcion: RequestBody,
        @Part("idCasos") idCasos: RequestBody,
        @Part("tipoEvidencia") tipoEvidencia: RequestBody,
        @Part archivo: MultipartBody.Part
    ): Call<Evidencia>
}