﻿using Domain.Entity.Register;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Products
{
    public class CartMaster
    {
        [Key]
        public int CartId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
      
        public User User { get; set; }
    }
}
