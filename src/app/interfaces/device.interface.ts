export interface Device {
  id: string;
  type: string;
  state: {
    on: boolean;
    online: boolean;
  };
}
