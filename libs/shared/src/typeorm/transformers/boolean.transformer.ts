import { ValueTransformer } from 'typeorm';
import { isNil } from 'lodash';

export class BooleanTransformer implements ValueTransformer {
  public from(value?: number | null): boolean | undefined {
    if (isNil(value)) {
      return;
    }
    return value ? true : false;
  }

  public to(value?: boolean | null): number | undefined {
    if (isNil(value)) {
      return;
    }
    return value ? 1 : 0;
  }
}
