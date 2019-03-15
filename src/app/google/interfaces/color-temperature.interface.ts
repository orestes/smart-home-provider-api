import { TraitDefinition } from 'app/google/interfaces/trait-definition.interface';
import { ColorValue } from 'app/google/interfaces/color-value.interface';

export interface ColorTemperature extends TraitDefinition {
  attributes: {
    // Device definitions must include these
    temperatureMinK: number,
    temperatureMaxK: number,
  };
  commands: {
    'action.devices.commands.ColorAbsolute': {
      params: { // Will be included in the command
        color: ColorValue;
      },
      states: { // Must be reported after execution
        color: ColorValue;
      },
    },
  };
}
