import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

// Enums
import { ErrorCode } from 'app/google/enums/error-code.enum';

// Services
import { ErrorService } from 'app/services/error/error.service';
import { LoggerService } from 'app/services/logger/logger.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly errorService: ErrorService,
    private readonly logger: LoggerService,
  ) {
  }

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {

      let token;

      try {
        token = this.getToken(req);
      } catch (error) {
        const errorResponse = this.handleError(req, error);
        this.logger.error({ error, errorResponse }, 'Authorization failed');

        return res.json(errorResponse);
      }

      req.jwt = token;
      this.logger.debug({ token }, 'Authorization cleared');

      next();
    };
  }

  private getToken(req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw {
        errorCode: ErrorCode.authFailure,
      };
    }

    const [_, token] = authorization.split(' ');
    if (!token) {
      throw {
        errorCode: ErrorCode.authFailure,
      };
    }

    // TODO: Save in config/env
    const secret = 'secret';

    return jwt.verify(token, secret);
  }

  private handleError(req: Request, e) {
    return {
      requestId: req.body.requestId,
      payload: this.errorService.getErrorPayload(e),
    };
  }
}
