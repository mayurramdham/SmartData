﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Register
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public int Zipcode { get; set; }
        public string ProfileImage { get; set; }
        
        public int UserTypeId { get; set; }

        [ForeignKey("UserTypeId")]
        public UserType UserType { get; set; }

       
        public int StateId { get; set; }
        [ForeignKey("StateId")]
        public string State { get; set; }
        [ForeignKey("CountryId")]
        public int CountryId { get; set; }
        public Country Country { get; set; }

    }
}
