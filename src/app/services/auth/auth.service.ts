import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  public getToken(userId: string, data: JwtPayload) {
    const payload: JwtPayload = {
      ...data,
      userId,
    };

    // TODO: Use secret from config/env
    const secret = 'secret';

    const options = {
      expiresIn: '1h', // TODO: Get expiration time from config/env
    };

    return jwt.sign(payload, secret, options);
  }

  public getRefreshToken(userId: string, data: JwtPayload) {
    const payload: JwtPayload = {
      ...data,
      userId,
    };

    // TODO: Use secret from config/env
    const secret = 'secret';

    return jwt.sign(payload, secret);
  }

  public getUserIdForAuthCode(authCode: string): string {
    // TODO: Get match from database
    return 'user-123';
  }

}
