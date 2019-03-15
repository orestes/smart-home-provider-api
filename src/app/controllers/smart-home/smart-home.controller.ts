import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';

// Services
import { LoggerService } from 'app/services/logger/logger.service';
import { ErrorService } from 'app/services/error/error.service';
import { SmartHomeService } from 'app/services/smart-home/smart-home.service';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';

@Controller('smart-home')
export class SmartHomeController {

  constructor(
    private readonly logger: LoggerService,
    private readonly errors: ErrorService,
    private readonly service: SmartHomeService,
  ) {
  }

  @Post()
  async smartHome(@Res() res, @Body() body, @Req() req) {

    const { inputs, requestId } = body;
    const jwt: JwtPayload = req.jwt;

    this.logger.debug({ body, jwt }, 'POST smart-home incoming');

    let payload;

    try {
      payload = await this.service.processInputs(inputs, jwt);
    } catch (error) {
      payload = this.errors.getErrorPayload(error);
      this.logger.error({ error }, 'POST smart-home error');
    }

    const response = {
      requestId,
      payload,
    };

    this.logger.debug({ response }, 'POST smart-home response');

    return res.send(response);
  }
}
