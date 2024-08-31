using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("FORMULARIO")]
public partial class FORMULARIO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Formulario { get; set; }

    [StringLength(100)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Nombre { get; set; } = null!;

    [StringLength(15)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Numero_Celular { get; set; } = null!;

    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Envio { get; set; }

    public int ID_Cliente { get; set; }

    [ForeignKey("ID_Cliente")]
    [InverseProperty("FORMULARIOS")] // Corrige el nombre de la propiedad inversa en CLIENTE
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;
}
