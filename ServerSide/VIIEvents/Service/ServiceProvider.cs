using Service.Services;

namespace Service
{
    public class ServiceProvider
    {
        private static ServiceProvider _instance;
        public VIIEventsService VIIEventsService { get; private set; }

      
        public ServiceProvider()
        {
            InitializeServices();
        }

        public static ServiceProvider GetInstance()
        {
            if (_instance == null)
                _instance = new ServiceProvider();
            return _instance;
        }

        private void InitializeServices()
        {
            VIIEventsService = new VIIEventsService();
        }

    }
}