using Domain.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class PatientDTO
    {
        public int PID { get; set; }
      
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? age { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? phonenumber { get; set; }
        public string? practinionerName { get; set; }
        public string? gender { get; set; }
        public string?email { get; set; }
        public DateTime DataOfBirth { get; set; }
        public bool isAccepted { get; set; }
        public bool isDeleted { get; set; }
        public DateTime AppointmentDate { get; set; }

        
        public int UId { get; set; }
        public string? UserId { get; set; }
      
    }
}
