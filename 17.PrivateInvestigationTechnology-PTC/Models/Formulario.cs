﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Formulario
{
    public int Id { get; set; }

    public string FullName { get; set; }

    public string Email { get; set; }

    public string Descripcion { get; set; }

}
