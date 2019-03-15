export interface ExecuteResponse {
  commands: CommandResult[];
}

export interface CommandResult {
  ids: string[];
  status: string;
  states?: CommandState;
}

export interface CommandState {
  color?: {
    name: string;
    spectrumRGB: number;
  };
}
