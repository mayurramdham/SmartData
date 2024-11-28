using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ModelDto
{
    public class PatientDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int State { get; set; }
        public int Country { get; set; }
        public string PostalCode { get; set; }
        public string BloodType { get; set; }
        public string Medications { get; set; }
        public DateTime LastVisitDate { get; set; }
        public DateTime NextAppointmentDate { get; set; }
        public string InsuranceProvider { get; set; }
        public int InsurancePolicyNumber { get; set; }
        public bool HasAgreeToTerms { get; set; }
        public bool IsPatientActive { get; set; }
        public int AId { get; set; }
    }
}
