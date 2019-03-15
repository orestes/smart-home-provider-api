import { Injectable } from '@nestjs/common';

import { DataService } from 'app/services/data/data.service';

import { DeviceDefinition } from 'app/interfaces/sync-response.interface';

@Injectable()
export class DevicesService {

  constructor(
    private readonly firestore: DataService,
  ) {
  }

  public async findByUser(user_id: string): Promise<DeviceDefinition[]> {

    const mockedDevices = require('../../data/devices.json').devices;

    return mockedDevices;

    // await this.create(user_id, mockedDevices[0]);
    // await this.create(user_id, mockedDevices[1]);

    return this.getUserDevicesCollectionReference(user_id)
      .get().then(querySnapshot => {
        return querySnapshot.docs.map((doc): DeviceDefinition => {
          return {
            id: doc.id,
            ...doc.data(),
          } as DeviceDefinition;
        });
      });
  }

  private getUserDevicesCollectionReference(user_id: string) {
    return this.firestore.get().collection('users/' + user_id + '/devices');
  }

  public create(user_id: string, device: DeviceDefinition) {
    return this.getUserDevicesCollectionReference(user_id).doc().create(device);
  }

}
