using Security.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Security.Controllers
{
    [Route("v1/api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this._context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                JwtSecurityToken token;
                JwtSecurityTokenHandler handler;
                GenerateJwtToken(user, userRoles, out token, out handler);

                var refresh_token = new RefreshToken()
                {
                    Id = Guid.NewGuid().ToString(),
                    Token = SecurityUtil.GenerateRandomString(150),
                    User = user,
                };
                _context.refreshes.Add(refresh_token);

                _context.SaveChanges();

                return Ok(new
                {
                    token = handler.WriteToken(token),
                    expiration = token.ValidTo,
                    refresh_token = refresh_token.Token,
                });
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh([FromForm] string refresh_token)
        {
            var ref_token = _context.refreshes.FirstOrDefault(el => el.Token == refresh_token);

            if (ref_token != null)
            {
                var user = await userManager.FindByIdAsync(ref_token.ApplicationUserId);
                var userRoles = await userManager.GetRolesAsync(user);
                JwtSecurityToken token;
                JwtSecurityTokenHandler handler;
                GenerateJwtToken(user, userRoles, out token, out handler);

                var new_refresh_token = new RefreshToken()
                {
                    Id = Guid.NewGuid().ToString(),
                    Token = SecurityUtil.GenerateRandomString(150),
                    User = user,
                };

                _context.refreshes.Remove(ref_token);
                _context.refreshes.Add(new_refresh_token);
                _context.SaveChanges();

                return Ok(new
                {
                    token = handler.WriteToken(token),
                    expiration = token.ValidTo,
                    refresh_token = new_refresh_token.Token
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("validate")]
        public IActionResult ValidateToken([FromForm] string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    IssuerSigningKey = authSigningKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return Unauthorized(false);
            }
            return Ok(true);
        }



        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status409Conflict, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status409Conflict, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again.", ErrorData = result.Errors.Select(el => el.Description).ToList() });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }


        private void GenerateJwtToken(ApplicationUser user, IList<string> userRoles, out JwtSecurityToken token, out JwtSecurityTokenHandler handler)
        {
            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            handler = new JwtSecurityTokenHandler();
        }
    }
}
