using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class ResetPasswordDto
    {
        public string? Email { get; set; }
        public string? ResetPassword { get; set; }
    }
}
