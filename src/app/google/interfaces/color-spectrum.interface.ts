import { ColorModel } from 'app/google/enums/color-model.enum';
import { TraitDefinition } from 'app/google/interfaces/trait-definition.interface';

export interface ColorSpectrum extends TraitDefinition {
  attributes: {
    // Device definitions must include these
    colorModel: ColorModel,
  };
  commands: {
    'action.devices.commands.ColorAbsolute': {
      params: { // Will be included in the command
        color: {
          name: string,
          spectrumRGB: string,
        },
      },
      states: { // Must be reported after execution
        color: {
          name: string,
          spectrumRGB: string,
        },
      },
    },
  };
}
