using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace App.Core.Interface
{
    public interface IZoomService
    {
        Task<string> GetAccessTokenAsync();

        Task<JsonElement> CreateMeetingAsync();
    }
}
