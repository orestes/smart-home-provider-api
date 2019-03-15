export interface Input {
  intent: string;
  payload: {
    commands: InputCommand[],
  };
}

export interface InputCommandExecution {
  command: string;
  params: Params;
}

export interface InputCommand {
  devices: InputCommandDevice[];
  execution: InputCommandExecution[];
}

export interface InputCommandDevice {
  customData: Params;
  id: string;
}

export interface Params {
  color: ColorDefinition;
  brightness: number;
  on: boolean;
}

export interface ColorDefinition {
  name: string;
  spectrumRGB: number;
}
