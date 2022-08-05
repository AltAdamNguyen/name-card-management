using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Results;
using Jose;
using NCMSystem.Filter;
using NCMSystem.Models;
using NCMSystem.Models.CallAPI;
using NCMSystem.Models.CallAPI.User.ChangePassword;
using NCMSystem.Models.CallAPI.User.ForgotPassword;
using NCMSystem.Models.CallAPI.User.RefreshToken;
using NCMSystem.Models.CallAPI.User.UserLogin;
using Newtonsoft.Json;

namespace NCMSystem.Controllers
{
    public class UserController : ApiController
    {
        private NCMSystemEntities db = new NCMSystemEntities(Environment.GetEnvironmentVariable("NCMSystemEntities"));

        [HttpPost]
        [Route("api/auth/login")]
        public ResponseMessageResult Login([FromBody] UserRequest request)
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
                        Message = "U0004",
                    }), Encoding.UTF8, "application/json")
                });
            }

            var user = db.users.FirstOrDefault(x => x.email == email);
            // check user exist
            if (user == null )
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "U0003",
                    }), Encoding.UTF8, "application/json")
                });
            }
            
            if (!BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "U0003",
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
                        Message = "U0002",
                    }), Encoding.UTF8, "application/json")
                });
            }

            // init date create-expire for token and refresh token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);
            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            var token = GenerateToken(user.id, dateCreateToken.ToUnixTimeSeconds(), dateExpireToken.ToUnixTimeSeconds(),
                user.role_id);
            var refreshToken = GenerateRefreshToken(user.id, dateCreateToken.ToUnixTimeSeconds(),
                dateExpireRefreshToken.ToUnixTimeSeconds());

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
                    Message = "U0001",
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
                        Message = "U0010",
                    }), Encoding.UTF8, "application/json")
                });
            }

            var selectToken = db.tokens.FirstOrDefault(e => e.refresh_token == refreshToken);

            // check token exist
            if (selectToken == null)
            {
                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "U0005",
                    }), Encoding.UTF8, "application/json")
                });
            }

            var selectUser = db.users.FirstOrDefault(e => e.id == selectToken.user_id);

            // check refresh token exist
            if (selectToken.expired_date < DateTime.Now)
            {
                // delete refresh token
                db.tokens.Remove(selectToken);
                db.SaveChanges();

                return new ResponseMessageResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                    {
                        Message = "U0009",
                    }), Encoding.UTF8, "application/json")
                });
            }

            // init date create-expire for token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;
            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);

            var token = GenerateToken(selectToken.user_id, dateCreateToken.ToUnixTimeSeconds(),
                dateExpireToken.ToUnixTimeSeconds(), selectUser.role_id);

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
        [JwtAuthorizeFilter(NcmRoles = new[] { NcmRole.Staff, NcmRole.Manager, NcmRole.SaleDirector })]
        public ResponseMessageResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            string newPassword = request.NewPassword;
            string oldPassword = request.OldPassword;

            // check null new password
            if (string.IsNullOrWhiteSpace(newPassword) || string.IsNullOrWhiteSpace(oldPassword))
            {
                return Common.ResponseMessage.BadRequest("U0004");
            }

            newPassword = newPassword.Trim();
            oldPassword = oldPassword.Trim();

            int userId = ((JwtToken)Request.Properties["payload"]).Uid;
            var selectUser = db.users.FirstOrDefault(e => e.id == userId);
            if (selectUser == null)
            {
                return Common.ResponseMessage.BadRequest("C0018");
            }

            if (!selectUser.password.Equals(oldPassword))
            {
                return Common.ResponseMessage.BadRequest("U0007");
            }

            // check match new password and old password
            if (newPassword == oldPassword)
            {
                return Common.ResponseMessage.BadRequest("U0005");
            }

            // check new password regex
            if (!Regex.IsMatch(newPassword, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$"))
            {
                return Common.ResponseMessage.BadRequest("U0006");
            }

            selectUser.password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            db.tokens.RemoveRange(db.tokens.Where(e => e.user_id == userId));

            // init date create-expire for token and refresh token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);
            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            var token = GenerateToken(userId, dateCreateToken.ToUnixTimeSeconds(), dateExpireToken.ToUnixTimeSeconds(),
                selectUser.role_id);
            var refreshToken = GenerateRefreshToken(userId, dateCreateToken.ToUnixTimeSeconds(),
                dateExpireRefreshToken.ToUnixTimeSeconds());

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

        [HttpPost]
        [Route("api/auth/forgot-password/send-email")]
        public ResponseMessageResult ForgotPasswordSendEmail([FromBody] ForgotPasswordSendEmailRequest request)
        {
            if (request == null)
                return Common.ResponseMessage.BadRequest("Request must contain body");

            string email = request.Email;

            // check null email
            if (string.IsNullOrWhiteSpace(email))
                return Common.ResponseMessage.BadRequest("U0004");

            email = email.Trim();

            // check email regex
            var isValidate = Validator.Validator.CheckEmailCorrect(email);

            if (!isValidate)
                return Common.ResponseMessage.BadRequest("U0004");

            var selectUser = db.users.FirstOrDefault(e => e.email == email);

            if (selectUser == null)
                return Common.ResponseMessage.NotFound("C0018");

            // random number length 6
            var randomNumber = new Random().Next(100000, 999999).ToString();
            var expireTime = DateTime.Now.AddMinutes(10);

            // add forgot password to database
            selectUser.code_resetPw = randomNumber;
            selectUser.exp_code = expireTime;

            db.SaveChanges();

            // send email
            SendGridConfig.SendCodeResetPassword(email, randomNumber);

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Send email success",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/auth/forgot-password/check-code")]
        public ResponseMessageResult ForgotPasswordCheckCode([FromBody] ForgotPasswordCheckCodeRequest request)
        {
            if (request == null)
                return Common.ResponseMessage.BadRequest("Request must contain body");

            string code = request.Code;
            string email = request.Email;

            // check null code
            if (string.IsNullOrWhiteSpace(code) || string.IsNullOrWhiteSpace(email))
                return Common.ResponseMessage.BadRequest("U0004");

            code = code.Trim();
            email = email.Trim();

            // get user by email
            var selectUser = db.users.FirstOrDefault(e => e.email == email && e.code_resetPw == code);
            if (selectUser == null)
                return Common.ResponseMessage.NotFound("U0011");

            if (selectUser.exp_code < DateTime.Now)
                return Common.ResponseMessage.BadRequest("U0008");

            return new ResponseMessageResult(new HttpResponseMessage()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(new CommonResponse()
                {
                    Message = "Code is correct",
                }), Encoding.UTF8, "application/json")
            });
        }

        [HttpPost]
        [Route("api/auth/forgot-password/submit")]
        public ResponseMessageResult ForgotPasswordSubmit([FromBody] ForgotPasswordSubmitRequest request)
        {
            if (request == null)
                return Common.ResponseMessage.BadRequest("Request must contain body");

            string code = request.Code;
            string email = request.Email;
            string password = request.Password;

            // check null code or email or password
            if (string.IsNullOrWhiteSpace(code) || string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(password))
                return Common.ResponseMessage.BadRequest("U0004");

            code = code.Trim();
            email = email.Trim();
            password = password.Trim();

            // get user by email
            var selectUser = db.users.FirstOrDefault(e => e.email == email && e.code_resetPw == code);
            if (selectUser == null)
                return Common.ResponseMessage.NotFound("U0011");

            if (selectUser.exp_code < DateTime.Now)
                return Common.ResponseMessage.BadRequest("U0008");

            // check password regex
            if (!Regex.IsMatch(password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$"))
                return Common.ResponseMessage.BadRequest(
                    "U0006");

            selectUser.password = BCrypt.Net.BCrypt.HashPassword(password);
            selectUser.code_resetPw = null;
            selectUser.exp_code = null;

            db.tokens.RemoveRange(db.tokens.Where(e => e.user_id == selectUser.id));

            // generate new token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireToken = dateCreateToken.AddMinutes(30);
            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            var token = GenerateToken(selectUser.id, dateCreateToken.ToUnixTimeSeconds(),
                dateExpireToken.ToUnixTimeSeconds(), selectUser.role_id);
            var refreshToken = GenerateRefreshToken(selectUser.id, dateCreateToken.ToUnixTimeSeconds(),
                dateExpireRefreshToken.ToUnixTimeSeconds());

            db.tokens.Add(new token()
            {
                user_id = selectUser.id,
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
                    Message = "Reset password success",
                    Data = new UserToken()
                    {
                        Token = token,
                        RefreshToken = refreshToken
                    }
                }), Encoding.UTF8, "application/json")
            });
        }

        private string GenerateToken(int userId, long createTime, long expireTime, int userRole)
        {
            Jwk keyToken =
                new Jwk(Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY_TOKEN") ??
                                                string.Empty));

            // init date create-expire for token and refresh token

            string token = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", userId },
                { "iat", createTime },
                { "exp", expireTime },
                { "role", userRole }
            }, keyToken, JwsAlgorithm.HS256);

            return token;
        }

        private string GenerateRefreshToken(int userId, long createTime, long expireTime)
        {
            Jwk keyRefreshToken =
                new Jwk(Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY_REFRESH_TOKEN") ??
                                                string.Empty));

            // init date create-expire for token and refresh token
            DateTimeOffset dateCreateToken = DateTimeOffset.Now;

            DateTimeOffset dateExpireRefreshToken = dateCreateToken.AddMonths(1);

            string refreshToken = Jose.JWT.Encode(new Dictionary<string, object>()
            {
                { "uid", userId },
                { "iat", createTime },
                { "exp", expireTime }
            }, keyRefreshToken, JwsAlgorithm.HS256);

            return refreshToken;
        }
    }
}