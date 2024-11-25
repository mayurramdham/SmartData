using Domain.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Service
{
    public class ZoomService
    {
        private readonly HttpClient _httpClient;

        public ZoomService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<JsonElement> CreateMeetingAsync()
        {
            var token = await GetAccessTokenAsync();
            var dateTimeUtcNow = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");

            // Create the HttpRequestMessage to interact with the Zoom API
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://api.zoom.us/v2/users/chetanmundle7875@gmail.com/meetings"),
                Headers =
                {
                    { "Authorization", "Bearer " + token }
                },
                Content = new StringContent($@"
        {{
            ""agenda"": ""My Meeting"",
            ""duration"": 60,
            ""password"": ""123456"",
            ""start_time"": ""{dateTimeUtcNow}"",
            ""timezone"": ""UTC"",
            ""topic"": ""My Meeting"",
            ""type"": 2
        }}", Encoding.UTF8, "application/json")
            };

            // Send the request using HttpClient
            using (var response = await _httpClient.SendAsync(request))
            {
                if (!response.IsSuccessStatusCode)
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    
                }

                // Read the response body and deserialize it into a JSON object
                var body = await response.Content.ReadAsStringAsync();

                // Deserialize the JSON response into a C# object (if needed)
                var meetingDetails = JsonSerializer.Deserialize<JsonElement>(body);

                // Return the JSON response to the client


                return meetingDetails;

            }
        }

        public async Task<string> GetAccessTokenAsync()
        {
            var zoomAccountId = "M4Ljv79vQ9Wl46u3im4p7g";
            var zoomClientId = "PbO3Q3wyQs2oG9ACFGxZZQ";
            var zoomClientSecret = "r3X0SzRj1T7q8K30j1PwYr9szfZG5YnZ";

            if (string.IsNullOrEmpty(zoomAccountId) || string.IsNullOrEmpty(zoomClientId) || string.IsNullOrEmpty(zoomClientSecret))
            {
                throw new Exception("Missing Zoom credentials.");
            }

            // Encode client ID and client secret
            var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{zoomClientId}:{zoomClientSecret}"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

            // Set up the body for the access token request
            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "account_credentials"),
                new KeyValuePair<string, string>("account_id", zoomAccountId)
            });

            var response = await _httpClient.PostAsync("https://zoom.us/oauth/token", content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error getting access token from Zoom.");
            }

            var json = await response.Content.ReadAsStringAsync();

            //Console.WriteLine(json);  // Or use a logging framework

            if (string.IsNullOrEmpty(json))
            {
                throw new Exception("Empty response from Zoom API.");
            }
            var tokenResponse = JsonSerializer.Deserialize<ZoomTokenResponseDto>(json);

            if (tokenResponse == null || string.IsNullOrEmpty(tokenResponse.access_token))
            {
                throw new Exception("Failed to retrieve access token.");
            }

            return tokenResponse.access_token;
        }


    }
}
