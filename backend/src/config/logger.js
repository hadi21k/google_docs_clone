const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(
      (info) =>
        `${new Date(info.timestamp).toLocaleString()} ${info.level}: ${
          info.message
        }`
    )
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
  ],
});

module.exports = logger;
