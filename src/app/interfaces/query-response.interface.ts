import { DeviceStatus } from 'app/interfaces/device-status.interface';

export interface DeviceStatusList {
  [deviceId: string]: DeviceStatus;
}

export interface QueryResponse {
  agentUserId: string;
  devices: DeviceStatusList;
}
