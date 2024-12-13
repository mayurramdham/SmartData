using Domain.Entity.AuthProcess;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Appointments
{
    public class Appointment
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int? PatientId { get; set; }
        public int? ProviderId { get; set; }
        public User User { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }
        public string ChiefComplaint { get; set; }
        public float Fees { get; set; }
    }
}
