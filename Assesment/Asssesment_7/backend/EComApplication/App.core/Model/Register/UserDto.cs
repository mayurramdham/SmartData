﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.core.Model.Register
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
      
        public int Zipcode { get; set; }
        public IFormFile ProfileImage { get; set; }
       
      
     
    }
}
