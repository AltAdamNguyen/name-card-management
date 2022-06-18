using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using Jose;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI.User;

namespace NCMSystem.Controllers
{
    public class UserController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();

        [HttpPost]
        [Route("api/auth/login")]
        public UserResponse Post([FromBody] UserRequest request)
        {
            string email = request.email;
            string password = request.password;

            var user = db.users.FirstOrDefault(x => x.email == email && x.password == password);

            var payload = new Dictionary<string, object>()
            {
                { "email", email },
                { "iat", DateTimeOffset.Now.ToUnixTimeSeconds() },
                { "exp", DateTimeOffset.Now.ToUnixTimeSeconds() + 3600 }
            };

            Jwk key = new Jwk(Encoding.ASCII.GetBytes("eyJzdWIiOiJtci54QGNvbnRvc28uY29tIiwiaWF0IjoxNjU1NDY1NDE1LCJleHAiOjE2NTU0NjkwMTV9"));

            string token = Jose.JWT.Encode(payload, key, JwsAlgorithm.HS256);

            Console.WriteLine(token);
            
            UserResponse response = new UserResponse();

            return response;
        }
    }
}