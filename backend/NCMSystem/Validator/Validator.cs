using System.Text.RegularExpressions;

namespace NCMSystem.Validator
{
    public static class Validator
    {
        public static bool CheckEmail(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 255)
                {
                    return false;
                }

                string emailRegex =
                    @"^[a-zA-Z0-9\.]+@([a-zA-Z0-9]+\.)+[\w-]{2,4}$";

                if (Regex.IsMatch(value, emailRegex))
                {
                    return true;
                }
            }

            return false;
        }

        public static bool CheckName(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 255)
                {
                    return false;
                }

                string nameRegex =
                    @"[\|#$%&()=?»«@£§€{}.-;<>_,]";

                if (Regex.IsMatch(value, nameRegex))
                {
                    return false;
                }

                return true;
            }

            return false;
        }

        public static bool CheckUrl(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 255)
                {
                    return false;
                }

                //regex check url
                string urlRegex =
                    @"^(http|https|)\://";

                if (Regex.IsMatch(value, urlRegex))
                {
                    return true;
                }
            }

            return false;
        }

        public static bool CheckPhoneOrFax(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 11)
                {
                    return false;
                }

                //regex check url
                string phoneFaxRegex =
                    @"^((0[3|4|5|7|8|9])+([0-9]{8})|(84[3|4|5|7|8|9])+([0-9]{8}))$";

                if (Regex.IsMatch(value, phoneFaxRegex))
                {
                    return true;
                }
            }

            return true;
        }

        public static bool CheckInputLength(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 255)
                {
                    return false;
                }

                return true;
            }

            return true;
        }

        public static bool CheckEmptyvLength(string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                if (value.Length > 255)
                {
                    return false;
                }

                return true;
            }

            return false;
        }
    }
}