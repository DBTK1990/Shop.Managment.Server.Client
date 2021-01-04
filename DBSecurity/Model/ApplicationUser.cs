using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Security.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public List<RefreshToken> RefreshToken { get; set; }
    }
}


  
