import * as winston from 'winston'
const { combine, timestamp, json} = winston.format

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.File({ filename: 'logs/combined.log' }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
});
