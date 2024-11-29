
using System.ComponentModel.DataAnnotations;

namespace EComApplication.Models
{
    public class UserType
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(20)]
        public string Name { get; set; }
    }
}
