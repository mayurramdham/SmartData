using App.core.Interface;
using Domain.Entity.Register;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Database
{
    public class AppDbContext:DbContext,IAppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<UserType> UserType { get; set; }
    }
}
