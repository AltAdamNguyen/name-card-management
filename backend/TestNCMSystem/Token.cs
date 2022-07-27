using System;
using System.Collections.Generic;
using System.Text;
using Jose;

namespace TestNCMSystem
{
    public class Token
    {
        public string GenerateToken(int userId, long createTime, long expireTime, int userRole)
        {
            Jwk keyToken =
                new Jwk(Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY_TOKEN") ?? string.Empty));

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
    }
}