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
using Microsoft.AspNetCore.Http;

namespace BL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public AppointmentsController(AppContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        //get
        //todo:get list of all appoinment
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All()
        {
            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(_context.Appointments);

        }
        //get
        //todo:get user appoinment -> only belongs to this user
        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);
            var res = _context.Appointments.FirstOrDefault(el => el.UserId.Equals(user.Id) && el.Id.Equals(id));

            if (res != null)
            {
                return Ok(res);
            }

            return NotFound(new { massege = $"id {id} dosen't exist for this user or id doesn't exist" });

        }
        //post
        //todo:create new appoinment ->this user
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Appointment new_doc)
        {
            if (!string.IsNullOrWhiteSpace(new_doc.Username))
            {
                return BadRequest(new { massege = "remove username from request body" });
            }

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            new_doc.UserId = user.Id;
            new_doc.Username = user.UserName;

            _context.Appointments.Add(new_doc);

            int res = _context.SaveChanges();


            if (res > 0)
            {
                return Ok(res);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "appoinment has not been set" });

        }

        //put
        //todo:editing appoinment->only this user
        [HttpPut]
        [Route("edit/{id}")]
        public async Task<IActionResult> Edit([FromBody] Appointment new_doc, int id)
        {
            if (!string.IsNullOrWhiteSpace(new_doc.Username))
            {
                return BadRequest(new { massege = "remove username from request body" });
            }

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            new_doc.UserId = user.Id;
            new_doc.Username = user.UserName;

            var ref_doc = _context.Appointments.FirstOrDefault(el => el.UserId == new_doc.UserId && el.Id.Equals(id));

            if (ref_doc != null)
            {
                ref_doc.Date_Set = new_doc.Date_Set;
                _context.SaveChanges();
                return Ok(ref_doc);
            }

            return NotFound(new { massege = $"id {id} dosen't exist for this user or id doesn't exist" });

        }



        //delete
        //todo:delete appoinment->only this user
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);
            var ref_doc = _context.Appointments.FirstOrDefault(el => el.UserId.Equals(user.Id) && el.Id.Equals(id));

            if (ref_doc != null)
            {
                _context.Appointments.Remove(ref_doc);
                _context.SaveChanges();

                return Ok(ref_doc);
            }

            return NotFound(new { massege = $"id {id} dosen't exist for this user or id doesn't exist" });
        }
    }
}
