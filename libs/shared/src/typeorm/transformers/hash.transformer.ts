/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ValueTransformer } from 'typeorm';
import { isNil } from 'lodash';
import { genSaltSync, compare, hashSync } from 'bcrypt';

export class HashTransformer implements ValueTransformer {
  private checker: string = '__hashed__';

  public from(value?: string | null): string | undefined {
    if (isNil(value)) {
      return;
    }

    return value;
  }

  public to(value?: string | null): string | undefined {
    if (isNil(value)) {
      return;
    }

    if (value.includes(this.checker)) {
      return value;
    }

    const salt = genSaltSync();
    const hashValue = hashSync(value, salt);

    return `${hashValue}|${this.checker}`;
  }

  static compare(value: string, hashValue: string) {
    const [originalHash] = hashValue.split('|');

    return compare(value, originalHash);
  }
}
