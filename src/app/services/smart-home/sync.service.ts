import { Injectable } from '@nestjs/common';

// Services
import { LoggerService } from 'app/services/logger/logger.service';
import { DevicesService } from 'app/services/devices/devices.service';

// Interfaces
import { Input } from 'app/interfaces/input.interface';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';
import { InputProcessor } from 'app/interfaces/input-processor.interface';
import { SyncResponse } from 'app/interfaces/sync-response.interface';

@Injectable()
export class SyncService implements InputProcessor {
  public static intent = 'action.devices.SYNC';

  constructor(
    private readonly logger: LoggerService,
    private readonly devices: DevicesService,
  ) {
  }

  async getResponse(input: Input, context: JwtPayload): Promise<SyncResponse> {
    this.assertValidInput(input);

    const agentUserId = context.userId;
    const devices = await this.devices.findByUser(agentUserId);

    return {
      agentUserId,
      devices,
    };
  }

  private assertValidInput(input: Input) {
    // TODO: Move this method to a superclass
    if (input.intent !== SyncService.intent) {
      this.logger.error({ input }, 'This processor cannot deal with intents of this type');
      throw {
        errorCode: 'ProtocolError',
      };
    }
  }
}
