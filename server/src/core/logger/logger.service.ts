import { LoggerService } from '@nestjs/common';
import { configure, getLogger, Logger } from 'log4js';
// const layout = {
//   type: 'pattern',
//   pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m',
// };
export class AppLogger implements LoggerService {
  private logger: Logger;
  constructor() {
    const appenders = process.env.NODE_ENV === 'development' ? ['console'] : ['file'];
    const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
    configure({
      appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'cheese.log' },
      },
      categories: {
        default: { appenders, level },
        nest: { appenders, level },
      },
    });
    this.logger = getLogger('nest');
  }
  generate(message: any, context?: string) {
    return `${context ? '[' + context + '] ' : ''}${message}`;
  }
  error(message: any, trace?: string, context?: string) {
    this.logger.error(this.generate(message, context));
  }
  warn(message: any, context?: string) {
    this.logger.warn(this.generate(message, context));
  }
  debug(message: any, context?: string) {
    this.logger.debug(this.generate(message, context));
  }
  log(message: any, context?: string) {
    this.logger.info(this.generate(message, context));
  }
}
