using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Usuario
    {
        public int UsuarioId { get; set; }

        public string nome { get; set; }

        public int cpfcnpj { get; set; }

        public string tipo { get; set; }

        public string status { get; set; }

        public DateTime datahora { get; }

    }
}