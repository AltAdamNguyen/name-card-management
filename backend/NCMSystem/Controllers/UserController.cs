using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Results;
using Jose;
using Jose.native;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.User.ChangePassword;
using NCMSystem.Models.CallAPI.User.RefreshToken;
using NCMSystem.Models.CallAPI.User.UserLogin;
using Newtonsoft.Json;

namespace NCMSystem.Controllers
{
    public class UserController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities();

        [HttpPost]
        [Route("api/auth/login")]
        public ResponseMessageResult Post([FromBody] UserRequest request)
        {
            string email = request.Email;
            string password = request.Password;

            // check null email or password
            if (email == null || password == null)
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "Request must contain email and password",
                    }), Encoding.UTF8, "application/json")
                });
            }

            var user = db.users.FirstOrDefault(x => x.email == email && x.password == password);

            // check user exist
            if (user == null)
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "Email or password is incorrect",
                    }), Encoding.UTF8, "application/json")
                });
            }

            // check user is active
            if (user.isActive == false)
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "User is not active",
                    }), Encoding.UTF8, "application/json")
                });
            }

            // generate token
            Jwk keyToken =
                new Jwk(Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JWT_SecretKeyToken"]));
            Jwk keyRefreshToken =
                new Jwk(Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JWT_SecretKeyRefreshToken"]));

            // init date create-expire for token and refresh token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);
            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            string token = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", user.id },
                { "iat", dateCreateToken.ToUnixTimeSeconds() },
                { "exp", dateExpireToken.ToUnixTimeSeconds() }
            }, keyToken, JwsAlgorithm.HS256);

            string refreshToken = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", user.id },
                { "iat", dateCreateToken.ToUnixTimeSeconds() },
                { "exp", dateExpireRefreshToken.ToUnixTimeSeconds() }
            }, keyRefreshToken, JwsAlgorithm.HS256);

            // add refresh token to database
            db.tokens.Add(new token()
            {
                user_id = user.id,
                refresh_token = refreshToken,
                created_date = dateCreateToken.DateTime,
                expired_date = dateExpireRefreshToken.DateTime
            });
            db.SaveChanges();

            // return success response
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Get token success",
                    Data = new UserToken()
                    {
                        Token = token,
                        RefreshToken = refreshToken
                    },
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/auth/refresh-token")]
        public ResponseMessageResult PostRefreshToken([FromBody] RefreshTokenRequest request)
        {
            string refreshToken = request.RefreshToken;

            // check null refresh token
            if (refreshToken == null)
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "Request must contain refresh token",
                    }), Encoding.UTF8, "application/json")
                });
            }

            var selectToken = db.tokens.FirstOrDefault(e => e.refresh_token == refreshToken);

            // check refresh token exist
            if (selectToken == null || selectToken.expired_date < DateTime.Now)
            {
                if (selectToken != null)
                {
                    // delete refresh token
                    db.tokens.Remove(selectToken);
                    db.SaveChanges();
                }

                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "Your refresh token is invalid or has expired",
                    }), Encoding.UTF8, "application/json")
                });
            }

            // generate token
            Jwk keyToken =
                new Jwk(Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JWT_SecretKeyToken"]));

            // init date create-expire for token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;
            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);

            string token = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", selectToken.user_id },
                { "iat", dateCreateToken.ToUnixTimeSeconds() },
                { "exp", dateExpireToken.ToUnixTimeSeconds() }
            }, keyToken, JwsAlgorithm.HS256);

            // return success response
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Get new token success",
                    Data = new RefreshTokenResponse()
                    {
                        Token = token,
                    },
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/auth/change-password")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.Marketer })]
        public ResponseMessageResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            string newPassword = request.NewPassword;
            string oldPassword = request.OldPassword;
            
            // check null new password
            if (string.IsNullOrWhiteSpace(newPassword) || string.IsNullOrWhiteSpace(oldPassword))
            {
                return Common.ResponseMessage.BadRequest("Request must contain new_password and old_password");
            }
            
            // check match new password and old password
            if (newPassword == oldPassword)
            {
                return Common.ResponseMessage.BadRequest("New password must be different from old password");
            }

            // check new password regex
            if (!Regex.IsMatch(newPassword, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$"))
            {
                return Common.ResponseMessage.BadRequest("New password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character");
            }
            
            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            var selectUser = db.users.FirstOrDefault(e => e.id == userId);

            if (!selectUser.password.Equals(oldPassword))
            {
                return Common.ResponseMessage.BadRequest("Old password is incorrect");
            }

            selectUser.password = newPassword;
            db.tokens.RemoveRange(db.tokens.Where(e => e.user_id == userId));
            
            // generate token
            Jwk keyToken =
                new Jwk(Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JWT_SecretKeyToken"]));
            Jwk keyRefreshToken =
                new Jwk(Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["JWT_SecretKeyRefreshToken"]));

            // init date create-expire for token and refresh token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);
            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            string token = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", userId },
                { "iat", dateCreateToken.ToUnixTimeSeconds() },
                { "exp", dateExpireToken.ToUnixTimeSeconds() }
            }, keyToken, JwsAlgorithm.HS256);

            string refreshToken = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", userId },
                { "iat", dateCreateToken.ToUnixTimeSeconds() },
                { "exp", dateExpireRefreshToken.ToUnixTimeSeconds() }
            }, keyRefreshToken, JwsAlgorithm.HS256);

            // add refresh token to database
            db.tokens.Add(new token()
            {
                user_id = userId,
                refresh_token = refreshToken,
                created_date = dateCreateToken.DateTime,
                expired_date = dateExpireRefreshToken.DateTime
            });
            
            db.SaveChanges();

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Change password success",
                    Data = new UserToken()
                    {
                        Token = token,
                        RefreshToken = refreshToken
                    },
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpGet]
        [Route("api/auth/test")]
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Admin, NcmRole.Manager, NcmRole.Staff })]
        public ResponseMessageResult Test()
        {
            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Test success " + ((JwtToken)Request.Properties["payload"]).Uid,
                }), Encoding.UTF8, "application/json")
            });
        }
    }
}