import { TraitDefinition } from 'app/google/interfaces/trait-definition.interface';

export interface OnOff extends TraitDefinition {
  commands: {
    'action.devices.commands.OnOff': {
      params: {
        on: boolean,
      },
      states: {
        on: boolean,
      },
    };
  };
}
