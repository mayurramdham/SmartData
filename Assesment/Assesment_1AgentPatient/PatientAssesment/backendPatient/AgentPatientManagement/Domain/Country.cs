using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Country
    {
        public int CountryId { get; set; }
        public string Shortname { get; set; }
        public string CountryName { get; set; }
        public int Phonecode { get; set; }
    }
}
