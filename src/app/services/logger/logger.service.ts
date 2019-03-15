import { Injectable } from '@nestjs/common';

import * as Bunyan from 'bunyan';

@Injectable()
export class LoggerService {

  private readonly logger: Bunyan = Bunyan.createLogger({
    name: 'smart-home-api',
    streams: [
      {
        level: 'debug',
        path: 'logs/api.log',
      },
    ],
  });

  /**
   * @see https://github.com/trentm/node-bunyan#log-method-api
   * @param args: any[]
   */
  public debug(...args) {
    return this.logger.debug.call(this.logger, ...args);
  }

  /**
   * @see https://github.com/trentm/node-bunyan#log-method-api
   * @param args: any[]
   */
  public warn(...args) {
    return this.logger.warn.call(this.logger, ...args);
  }

  /**
   * @see https://github.com/trentm/node-bunyan#log-method-api
   * @param args: any[]
   */
  public info(...args) {
    return this.logger.info.call(this.logger, ...args);
  }

  /**
   * @see https://github.com/trentm/node-bunyan#log-method-api
   * @param args: any[]
   */
  public error(...args) {
    return this.logger.error.call(this.logger, ...args);
  }

}
