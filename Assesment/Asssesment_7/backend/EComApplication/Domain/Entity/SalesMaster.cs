
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EComApplication.Models
{
    public class SalesMaster
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(10)]
        public string InvoiceId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime InvoiceDate { get; set; }

        [Required]
        public float Subtotal { get; set; }

        [Required]
        public string DeliveryAddress { get; set; }

        [Required]
        public int DeliveryZipcode { get; set; }

        [Required]
        public int DeliveryState { get; set; }

        [ForeignKey("DeliveryState")]
        public State State { get; set; }

        [Required]
        public int DeliveryCountry { get; set; }

        [ForeignKey("DeliveryCountry")]
        public Country Country { get; set; }
    }
}
