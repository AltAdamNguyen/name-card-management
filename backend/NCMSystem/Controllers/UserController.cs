using System;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Text;
using System.Web.Http;
using JWT.Algorithms;
using JWT.Builder;
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

            var token = JwtBuilder.Create()
                .WithAlgorithm(new RS256Algorithm(certificate))
                .AddClaim("exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds())
                .AddClaim("claim1", 0)
                .AddClaim("claim2", "claim2-value")
                .Encode();

            Console.WriteLine(token);
            
            
            UserResponse response = new UserResponse();
            
            return response;
        }
        
        
    }
}