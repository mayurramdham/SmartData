using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ExampleWebApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task MessageSent(string message, string userName)
        {
            await this.Clients.All.SendAsync("messageRecieved", message, userName);
        }
    }
}
