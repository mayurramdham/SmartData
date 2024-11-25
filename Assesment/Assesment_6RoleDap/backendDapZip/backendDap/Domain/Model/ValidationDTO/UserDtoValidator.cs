using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model.ValidationDTO
{
    public class UserDtoValidator: AbstractValidator<UserDTO>
    {
        public UserDtoValidator()
        {
            RuleFor(x => x.UserEmail).EmailAddress().NotEmpty();
            RuleFor(x => x.FirstName).Length(0, 10).ToString();
            RuleFor(x => x.LastName).Length(0, 10).ToString();
            RuleFor(p => p.Password).Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.");
            RuleFor(p => p.Password).Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.");
            RuleFor(p => p.Password).Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.");
            RuleFor(x => x.Password).Matches(@"[\!\?\*\.]*$").WithMessage("Your password must contain at least one (!? *.).");
        }
    }
}
