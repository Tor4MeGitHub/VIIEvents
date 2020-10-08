using System;
using System.Collections.Generic;
using Core.Common;
using Data.Models;
using Service.Interfaces;

namespace Service.Services
{
    public class VIIEventsService: IVIIEventsService
    {
        public ServerResponse GetEvents()
        {
            List<Events> list = new List<Events>();

            list.Add(new Events
            {
                EventName = "FirstEvent",
                EventDescr = "Description",
                Length = 8,
                CreatedDate = DateTime.Now
            });

            return ServerResponse.Ok(list);
        }
    }
}