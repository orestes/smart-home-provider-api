import { Injectable } from '@nestjs/common';

import { Firestore } from '@google-cloud/firestore';

import { LoggerService } from 'app/services/logger/logger.service';

@Injectable()
export class DataService {

  private readonly firestore: Firestore;

  constructor(
    private readonly logger: LoggerService,
  ) {
    const settings = {
      projectId: 'toy-home',
      keyFilename: './auth.json',
      timestampsInSnapshots: true,
    };

    this.firestore = new Firestore(settings);
  }

  public get(): Firestore {
    return this.firestore;
  }
}
