
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EComApplication.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MaxLength(50)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required, MaxLength(15)]
        public string Mobile { get; set; }

        public DateTime DOB { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        [ForeignKey("UserTypeId")]
        public UserType UserType { get; set; }

        public string ProfileImage { get; set; }

        public string Address { get; set; }

        [Required]
        public int Zipcode { get; set; }

        public int StateId { get; set; }

        [ForeignKey("StateId")]
        public State State { get; set; }

        public int CountryId { get; set; }

        [ForeignKey("CountryId")]
        public Country Country { get; set; }
    }
}
