namespace API.Models
{
    public class Endereço
    {
         public int EndereçoId { get; set; }

        public string logradouro { get; set; }

        public int numero { get; set; }

        public string complemento { get; set; }

        public string bairro { get; set; }

        public int cep { get; set; }

        public string cidade { get; set; }

        public string estado { get; set; }

        public Usuario Usuario { get; set; }
    }
}