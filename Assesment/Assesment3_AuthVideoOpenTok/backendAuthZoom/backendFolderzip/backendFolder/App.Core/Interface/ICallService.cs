using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenTokSDK;

namespace App.Core.Interface
{
    public interface ICallService
    {
        Session CreateSession(string apiKey, string apiSecret);
        string GenerateToken(string sessionId);
    }
}
