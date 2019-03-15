import { Injectable } from '@nestjs/common';

// Services
import { LoggerService } from 'app/services/logger/logger.service';
import { DevicesService } from 'app/services/devices/devices.service';

// Interfaces
import { Input } from 'app/interfaces/input.interface';
import { Device } from 'app/interfaces/device.interface';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';
import { InputProcessor } from 'app/interfaces/input-processor.interface';
import { DeviceStatusList, QueryResponse } from 'app/interfaces/query-response.interface';
import { DeviceDefinition } from 'app/interfaces/sync-response.interface';

@Injectable()
export class QueryService implements InputProcessor {
  public static intent = 'action.devices.QUERY';

  constructor(
    private readonly logger: LoggerService,
    private readonly devices: DevicesService,
  ) {
  }

  async getResponse(input: Input, context: JwtPayload): Promise<QueryResponse> {
    this.assertValidInput(input);

    const agentUserId = context.userId;
    const devices = await this.devices.findByUser(agentUserId);

    const status: DeviceStatusList = {};

    devices.forEach((d: DeviceDefinition) => {
      status[d.id] = {
        // TODO: Read the latest state for all these properties
        online: true,
        on: true,
        brightness: 80,
        color: {
          name: 'apricot',
          spectrumRGB: parseInt('FBCEB1', 16),
        },
      };
    });

    return {
      agentUserId,
      devices: status,
    };
  }

  private assertValidInput(input: Input): void {
    // TODO: Move this method to a superclass
    if (input.intent !== QueryService.intent) {
      this.logger.error({ input }, 'This processor cannot deal with intents of this type');
      throw {
        errorCode: 'ProtocolError',
      };
    }
  }
}
