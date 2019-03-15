import { Color } from 'app/interfaces/color.interface';

export interface DeviceStatus {
  online: boolean;
  on: boolean;
  brightness: number;
  color: Color;
}
