using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Security.Authentication;
using Microsoft.AspNetCore.Identity;

namespace BL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentsController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        private readonly AppContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        public AppointmentsController(AppContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
        }
        //get
        //todo:get list of all appoinment
        //post
        //todo:create new appoinment
        //put
        //todo:editing appoinment
        //delete
        //todo:delete appoinment
    }
}
