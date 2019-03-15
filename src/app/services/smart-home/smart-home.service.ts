import { Injectable } from '@nestjs/common';

// Services
import { SyncService } from './sync.service';
import { QueryService } from './query.service';
import { ExecuteService } from './execute.service';
import { LoggerService } from 'app/services/logger/logger.service';

// Interfaces
import { Input } from 'app/interfaces/input.interface';
import { JwtPayload } from 'app/interfaces/jwt-payload.interface';
import { InputProcessor } from 'app/interfaces/input-processor.interface';

@Injectable()
export class SmartHomeService {

  constructor(
    private readonly logger: LoggerService,
    private readonly syncService: SyncService,
    private readonly execService: ExecuteService,
    private readonly queryService: QueryService,
  ) {
  }

  /**
   *
   * @param {any[]} inputs
   * @param {JwtPayload} context
   * @returns any
   */
  public async processInputs(inputs: any[], context: JwtPayload) {
    this.assertValidInputs(inputs);

    // TODO: Find out the user associated to the given token

    const input = inputs[0];

    const processor: InputProcessor = this.getInputProcessor(input);
    const response = await processor.getResponse(input, context);

    return response;
  }

  /**
   *
   * @param {any[]} inputs
   */
  private assertValidInputs(inputs: any[]) {
    if (inputs.length > 1) {
      this.logger.error({ intents: inputs }, 'More than one intent per request');
      throw {
        errorCode: 'protocolError',
      };
    }
  }

  private getInputProcessor(input: Input): InputProcessor {
    switch (input.intent) {
      case SyncService.intent:
        return this.syncService;
      case QueryService.intent:
        return this.queryService;
      case ExecuteService.intent:
        return this.execService;
    }

    this.logger.error({ input }, 'No matching processor for given input');

    throw {
      errorCode: 'protocolError',
    };
  }
}
