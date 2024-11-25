using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class Otp
    {
        [Key]
        public int OtpId { get; set; }

        public int EmailOtp { get; set; }

        public DateTime OtpValidity {  get; set; }
        public string UserName { get; set; } 

    }
}
