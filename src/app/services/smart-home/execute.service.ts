import { HttpService, Injectable } from '@nestjs/common';

// Services
import { LoggerService } from 'app/services/logger/logger.service';

// Interfaces
import { Input, InputCommand } from 'app/interfaces/input.interface';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';
import { InputProcessor } from 'app/interfaces/input-processor.interface';
import { ExecuteResponse } from 'app/interfaces/execute-response.interface';
import { parseAsRGB } from 'app/services/smart-home/color';

@Injectable()
export class ExecuteService implements InputProcessor {
  public static intent = 'action.devices.EXECUTE';

  constructor(
    private readonly logger: LoggerService,
    private readonly http: HttpService,
  ) {
  }

  async getResponse(input: Input, context: JwtPayload): Promise<ExecuteResponse> {
    this.assertValidInput(input);

    const agentUserId = context.userId;

    const requestsByDeviceId: any = {};
    const ids: string[] = [];

    input.payload.commands.forEach((command: InputCommand) => {
      command.devices.forEach(d => {
        ids.push(d.id);
        requestsByDeviceId[d.id] = this.getDeviceState(command);
      });
    });

    // TODO: Get from database
    const deviceAddress = 'demo.local';

    const requestForOne = requestsByDeviceId['light-one'];

    this.logger.debug('Sending state to IoT Device', requestForOne);

    const response = await this.http.post(`http://${deviceAddress}/state`, requestForOne)
      .toPromise();

    this.logger.debug('IoT Device response', response.data);

    return {
      commands: [
        {
          ids,
          status: 'SUCCESS', // TODO: Move to const ENUM
        },
      ],
    };
  }

  private getDeviceState(command: InputCommand) {
    const params = command.execution[0].params;

    let output: any = {};

    if (typeof params.on !== 'undefined') {
      output = {
        ...output,
        on: params.on,
      };
    }

    if (typeof params.color !== 'undefined') {
      this.logger.debug('Checking color', params.color);
      const rgb = parseAsRGB(params.color.spectrumRGB);
      output = {
        ...output,
        ...rgb,
      };
    }

    if (typeof params.brightness !== 'undefined') {
      output = {
        ...output,
        i: params.brightness,
      };
    }

    return output;
  }

  private assertValidInput(input: Input): void {
    // TODO: Move this method to a superclass
    if (input.intent !== ExecuteService.intent) {
      this.logger.error({ input }, 'This processor cannot deal with intents of this type');
      throw {
        errorCode: 'ProtocolError',
      };
    }
  }

}
