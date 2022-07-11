using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using Newtonsoft.Json;
using Serilog;

namespace NCMSystem.Filter
{
    public enum NcmRole
    {
        Staff = 1,
        Manager = 2,
        Marketer = 3,
        Admin = 4
    }

    public class JwtAuthorizeFilter : AuthorizeAttribute, IAuthorizationFilter
    {
        public NcmRole[] NcmRoles { get; set; }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                Console.Out.WriteLine("Role: " + NcmRoles);
                var token = actionContext.Request.Headers.Authorization;

                // check empty, null token
                if (token == null || token.Scheme != "Bearer" || string.IsNullOrEmpty(token.Parameter))
                {
                    actionContext.Response = new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.Unauthorized,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Unauthorized",
                        }), Encoding.UTF8, "application/json")
                    };
                    Console.Out.WriteLine("Unauthorized by token empty or null");
                    return;
                }

                var jwtToken = token.Parameter;
                var data = "";

                // validate the token
                try
                {
                    data = Jose.JWT.Decode(jwtToken,
                        Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY_TOKEN") ??
                                                string.Empty));
                }
                catch (Exception)
                {
                    actionContext.Response = new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.Unauthorized,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Unauthorized",
                        }), Encoding.UTF8, "application/json")
                    };
                    Console.Out.WriteLine("Unauthorized by can't decode token");
                    return;
                }

                var payload = JsonConvert.DeserializeObject<JwtToken>(data);

                // check expired token
                if (payload?.Exp < DateTimeOffset.Now.ToUnixTimeSeconds())
                {
                    actionContext.Response = new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.Unauthorized,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Unauthorized",
                        }), Encoding.UTF8, "application/json")
                    };
                    Console.Out.WriteLine("Unauthorized by token expired");
                    return;
                }

                // check role
                NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));
                var selectUser = db.users.First(e => e.id == payload.Uid);

                if (!NcmRoles.Contains((NcmRole)selectUser.role_id))
                {
                    actionContext.Response = new HttpResponseMessage()
                    {
                        StatusCode = System.Net.HttpStatusCode.Unauthorized,
                        Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                        {
                            Message = "Unauthorized",
                        }), Encoding.UTF8, "application/json")
                    };
                    Console.Out.WriteLine("Unauthorized by don't have permission");
                    return;
                }

                actionContext.Request.Properties.Add("payload", payload);
                actionContext.Request.Properties.Add("role", (NcmRole)selectUser.role_id);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "C0001");
                Log.CloseAndFlush();
            }
        }
    }

    class JwtToken
    {
        [JsonProperty("uid")] public int Uid { get; set; }

        [JsonProperty("iat")] public long Iat { get; set; }

        [JsonProperty("exp")] public long Exp { get; set; }
    }
}