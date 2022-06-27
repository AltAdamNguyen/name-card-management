using System;
using Serilog;

namespace NCMSystem.Filter
{
    public class LogException
    {
        public LogException()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.File(AppDomain.CurrentDomain.BaseDirectory + "Logs\\ncm-logs_.txt",
                    rollingInterval: RollingInterval.Day,
                    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}{NewLine}")
                .CreateLogger();
        }
    }
}