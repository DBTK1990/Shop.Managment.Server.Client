using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Security.Authentication
{
    public class RefreshToken
    {
        [Key]
        public string Id { get; set; }
        public string Token { get; set; }
       
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}