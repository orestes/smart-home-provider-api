import { ColorValue } from 'app/google/interfaces/color-value.interface';

export interface TraitDefinition {
  attributes?: {
    [attribute: string]: number | boolean | string | ColorValue,
  };
  commands: {
    [id: string]: {
      params: {
        [param: string]: number | boolean | string | ColorValue,
      },
      states: {
        [property: string]: number | boolean | string | ColorValue,
      },
    },
  };
}
