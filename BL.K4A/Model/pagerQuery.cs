using Security.Authentication;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BL
{
    public class pagerQuery
    {

        public int Order { get; set; }
        public string Filter { get; set; }
    }
}