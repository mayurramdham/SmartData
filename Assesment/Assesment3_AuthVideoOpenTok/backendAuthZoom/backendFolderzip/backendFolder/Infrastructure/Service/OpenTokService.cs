using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Core.Interface;
using OpenTokSDK;


namespace Infrastructure.Service
{
    public class OpenTokService : ICallService
    {
        private readonly OpenTok _openTokSDK;

        string apiKey = "1dea0a2c";
        string apiSecret = "hOtsTKu46RyJJ8Ie";

        //public OpenTokService(string apiKey, string apiSecret)
        //{
        //    _openTokSDK = new OpenTok(apiKey, apiSecret);
        //}

        public Session CreateSession(string apiKey,string apiSecret)
        {
            // Creates a new OpenTok session
            return _openTokSDK.CreateSession();
        }
      

        public string GenerateToken(string sessionId)
        {
            return _openTokSDK.GenerateToken(sessionId);
        }
    }
}
