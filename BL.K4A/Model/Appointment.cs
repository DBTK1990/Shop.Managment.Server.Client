using Security.Authentication;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BL
{
    public class Appointment
    {
        private DateTime date_set;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime Date_Set { get => date_set; set => date_set = value; }
        [JsonIgnore]
        public string UserId { get; set; }
        public string Username { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Date_Inserted { get; set; }

    }
}