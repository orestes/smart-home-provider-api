import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';

import * as queryString from 'querystring';

import { LoggerService } from 'app/services/logger/logger.service';
import { AuthService } from 'app/services/auth/auth.service';

@Controller('')
export class AuthController {

  constructor(
    private readonly logger: LoggerService,
    private readonly auth: AuthService,
  ) { }

  @Get('login')
  login(@Query() query, @Res() res) {
    const queryStringValue = queryString.stringify(query);

    this.logger.debug({ queryString: queryStringValue }, 'Getting login URI');

    // TODO: Save target redirect in config/env variables
    const url = `toy-home.firebaseapp.com`;

    const redirect = `https://${url}/login?${queryStringValue}`;

    res
      .status(HttpStatus.FOUND)
      .set('Location', redirect)
      .send();
  }

  @Post('token')
  getToken(@Body() body, @Query() query, @Req() req) {
    this.logger.debug({body, query, uri: req.path}, 'Getting token');

    const authCode = body.code;
    const userId = this.auth.getUserIdForAuthCode(authCode);

    this.logger.debug({authCode, userId}, 'Auth code matches user');

    // TODO: Add any metadata for the user
    const data = {
      authCode,
    };

    const access_token = this.auth.getToken(userId, data as any);
    const refresh_token = this.auth.getRefreshToken(userId, data as any);

    return {
      access_token,
      refresh_token,
    };
  }

}
