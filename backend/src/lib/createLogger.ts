import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities } from 'nest-winston';

export const createLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.STAGE === 'prod' ? 'info' : 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike('LEECODER', { prettyPrint: true }),
            ),
        }),
    ],
});