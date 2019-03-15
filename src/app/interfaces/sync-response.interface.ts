export interface DeviceDefinition {
  id?: string;
  type: string;
  willReportState: boolean;
  traits: string[];
  deviceInfo: {
    manufacturer: string;
    hwVersion: string;
    model: string;
    swVersion: string;
  };
  name: {
    name: string;
    defaultNames: string[];
    nicknames: string[];
  };
  customData: {
    [key: string]: boolean|string|number,
  };
  attributes: {
    colorModel: string;
    temperatureMinK: number;
    temperatureMaxK: number;
  };
}

export interface SyncResponse {
  agentUserId: string;
  devices: DeviceDefinition[];
}
