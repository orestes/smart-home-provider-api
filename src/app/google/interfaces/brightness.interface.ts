import { TraitDefinition } from 'app/google/interfaces/trait-definition.interface';

export interface Brightness extends TraitDefinition {
  name: 'action.devices.traits.Brightness';
  commands: {
    'action.devices.commands.BrightnessAbsolute': {
      params: {
        brightness: number,
      },
      states: {
        brightness: number,
      },
    },
  };
}
