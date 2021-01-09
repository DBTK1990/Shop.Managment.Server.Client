using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using BL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Security.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;
using Microsoft.Data.SqlClient;

namespace BL.Controllers
{
    [Route("v1/api/[controller]")]
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
        [HttpPost]
        [Route("pager/{page_number}")]
        public async Task<IActionResult> Pager(int page_number, [FromBody] pagerQuery data)
        {

            if (page_number < 1)
            {
                return BadRequest(new { errorcode = 15, error = $"page number cant be below or equal to zero" });
            }

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            page_number--;
            var now = DateTime.Now.ToLocalTime();
            var query = _context.Appointments.Where(el => el.Date_Set >= now);
            Expression<Func<Appointment, object>> expression = data.Filter.Equals("date") ? el => el.Date_Set : el => el.Username;

            var res = data.Order == 1 ? query.OrderBy(expression) : query.OrderByDescending(expression);
            var test = res.AsEnumerable().Skip(page_number * 10).Take(10).ToList();

            return Ok(new
            {
                appointment_list = res.AsEnumerable().Skip(page_number * 10).Take(10).ToList(),
                page_count = Math.Ceiling(_context.Appointments.Count() / 10.0)
            });


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

            return NotFound(new { errorcode = 14, error = $"id {id} dosen't exist for this user or id doesn't exist" });

        }
        //post
        //todo:create new appoinment ->this user
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] Appointment new_doc)
        {
            new_doc.Date_Set = new_doc.Date_Set.ToLocalTime();
            if (!string.IsNullOrWhiteSpace(new_doc.Username))
            {
                return BadRequest(new { errorcode = 11, error = "remove username from request body" });
            }
            else if (_context.Appointments.ToList().Any(el => el.Date_Set <= new_doc.Date_Set && new_doc.Date_Set <= el.Date_Set.AddMinutes(45)))
            {
                return Conflict(new { errorcode = 12, error = "appoinment has allready been set in the time range" });
            }
            else if (new_doc.Date_Set < DateTime.Now)
            {
                return Conflict(new { errorcode = 13, error = "we dont have a time machine yet..." });
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

            new_doc.Date_Set = new_doc.Date_Set.ToLocalTime();
            if (!string.IsNullOrWhiteSpace(new_doc.Username))
            {
                return BadRequest(new { errorcode = 11, error = "remove username from request body" });
            }
            else if (_context.Appointments.Any(el => el.Date_Set <= new_doc.Date_Set && new_doc.Date_Set <= el.Date_Set.AddMinutes(45)))
            {
                return Conflict(new { errorcode = 12, error = "appoinment has allready been set in the time range" });
            }
            else if (new_doc.Date_Set < DateTime.Now)
            {
                return Conflict(new { errorcode = 13, error = "we dont have a time machine yet..." });
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

            return NotFound(new { errorcode = 14, error = $"id {id} dosen't exist for this user or id doesn't exist" });

        }



        //delete
        //todo:delete appoinment->only this user
        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            var temp_id = new SqlParameter("@id", id);
            var temp_userId = new SqlParameter("@userId", user.Id);
            var ref_doc=_context.Appointments.FromSqlRaw($"exec [dbo].DeleteAppointment @id ,@userId", temp_id, temp_userId).ToList();
            if (ref_doc.Any())
            {
         
                return Ok(ref_doc);
            }

            return NotFound(new { errorcode = 14, error = $"id {id} dosen't exist for this user or id doesn't exist" });
        }
    }
}
