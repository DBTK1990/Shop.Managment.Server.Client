using System.Collections.Generic;

namespace Security.Authentication
{
    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public List<string> Data { get ; set; }

    }
}