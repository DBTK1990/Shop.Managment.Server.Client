using Security.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Security.Setup
{
    public static class SecurityMiddlewareExtensions
    {
        public static IApplicationBuilder InitSecurityDatabase(
            this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var Auth_DB = scope.ServiceProvider.GetService<ApplicationDbContext>().Database;

                Auth_DB.Migrate();



            }
            return app;
        }
    }
}
