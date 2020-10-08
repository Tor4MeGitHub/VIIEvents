using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Data.Models
{
    public class Events
    {
        public string EventName { get; set; }
        public string EventDescr { get; set; }
        public int Length { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}