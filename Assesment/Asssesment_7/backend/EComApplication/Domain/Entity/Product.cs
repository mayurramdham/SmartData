
using System;
using System.ComponentModel.DataAnnotations;

namespace EComApplication.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string ProductName { get; set; }

        [Required, MaxLength(10)]
        public string ProductCode { get; set; }

        public string ProductImage { get; set; }

        public string Category { get; set; }

        public string Brand { get; set; }

        [Required]
        public float SellingPrice { get; set; }

        [Required]
        public float PurchasePrice { get; set; }

        public DateTime PurchaseDate { get; set; }

        [Required]
        public int Stock { get; set; }
    }
}
