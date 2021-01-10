using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;


namespace BL.Setup
{
    public static class ClientMiddlewareExtensions
    {
        public static IApplicationBuilder InitClientAppReact(
            this IApplicationBuilder app, bool IsDevelopment=false)
        {

            app.UseStaticFiles();

            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp/appoinment-client";
                if (IsDevelopment)
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");

                    //spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            return app;
        }
    }
}
