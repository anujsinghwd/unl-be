import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Set the minimum log level
  format: winston.format.json(), // Use JSON format
  defaultMeta: { service: 'your-app' }, // Add default metadata
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
  ],
});

export default logger;
