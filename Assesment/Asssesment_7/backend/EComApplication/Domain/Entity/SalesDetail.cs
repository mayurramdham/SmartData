
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EComApplication.Models
{
    public class SalesDetail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int InvoiceId { get; set; }

        [ForeignKey("InvoiceId")]
        public SalesMaster SalesMaster { get; set; }

        [Required]
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        [Required, MaxLength(10)]
        public string ProductCode { get; set; }

        [Required]
        public int SaleQty { get; set; }

        [Required]
        public float SellingPrice { get; set; }
    }
}
