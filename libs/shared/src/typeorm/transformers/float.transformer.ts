import { ValueTransformer } from 'typeorm';
import { isNil } from 'lodash';
import Num from '@libs/shared/utils/num';

export class FloatTransformer implements ValueTransformer {
  round: number = 4;
  constructor(round: number = 4) {
    this.round = round
  }

  public from(value?: number | null): number | undefined {
    if (isNil(value)) {
      return;
    }
    return Num.round(value, this.round);
  }

  public to(value?: number | null): number | undefined {
    if (isNil(value)) {
      return;
    }
    return Num.round(value, this.round);
  }
}
