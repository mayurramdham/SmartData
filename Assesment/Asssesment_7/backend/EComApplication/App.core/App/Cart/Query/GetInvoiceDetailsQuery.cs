﻿using App.core.Interface;
using App.core.Model.Cart;
using Dapper;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.core.App.Cart.Query
{
    public class GetInvoiceDetailsQuery : IRequest<object>
    {
        public int SalesId { get; set; }

      
    }

    public class GetInvoiceDetailsQueryHandler : IRequestHandler<GetInvoiceDetailsQuery, object>
    {
        private readonly IAppDbContext _appDbContext;
        private readonly IConfiguration _configuration;

        public GetInvoiceDetailsQueryHandler(IAppDbContext appDbContext, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
        }

        public async Task<object> Handle(GetInvoiceDetailsQuery request, CancellationToken cancellationToken)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new SqlConnection(connectionString);

            // SQL query to join SalesMaster, SalesDetails, Users, and Products
            const string sql = @"
                SELECT 
                    u.UserId,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    u.Mobile,
                    u.Address AS UserAddress,
                    u.Zipcode AS UserZipCode,
                    sm.InvoiceId,
                    sm.OrderDate,
                    sm.TotalAmount,
                    sm.DeliveryAddress,
                    sm.DeliveryZipCode,
                    sm.DeliveryState,
                    sm.DeliveryCountry,
                    p.PrName AS ProductName,
                    sd.ProductCode,
                    sd.SalesQty,
                    sd.SellingPrice
                FROM SalesMaster sm
                INNER JOIN [User] u ON sm.UserId = u.UserId
                INNER JOIN SalesDetails sd ON sm.SalesId = sd.InvoiceId
                INNER JOIN Product p ON sd.PrId = p.PrId
                WHERE sm.SalesId = @SalesId";

            var parameters = new { SalesId = request.SalesId };

            // Execute the query using Dapper
            var invoiceDetails = await connection.QueryAsync<InvoiceDetailsDto>(sql, parameters);

            // Map the result to a response object
            var response = new
            {
                message = "Invoice details retrieved successfully.",
                status = 200,
                invoice = invoiceDetails.ToList()
            };

            return response;
        }
    }

}
