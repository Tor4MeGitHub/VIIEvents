using System.Runtime.Remoting.Channels;
using System.Web.Http;
using Core.Common;
using Service;
using Service.Services;

namespace WebApi.Controllers
{
    [RoutePrefix("api/VIIEvents")]
    public class VIIEventsController : ApiController
    {
        private ServiceProvider _serviceProvider = ServiceProvider.GetInstance();

        [HttpPost]
        [Route("GetEvents")]

        public ServerResponse GetAllEvents(ClientRequest clientReq)
        {
            return _serviceProvider.VIIEventsService.GetEvents();
        }
        


        }
}