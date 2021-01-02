using Microsoft.EntityFrameworkCore;
using System;

namespace BL
{
    public class AppContext: DbContext
    {
        public DbSet<Appointment> Appointments { get; set; }

        public AppContext(DbContextOptions<AppContext> options):base(options)
        {

        }


    }
}
