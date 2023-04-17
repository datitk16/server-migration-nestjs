import { ValueTransformer } from 'typeorm';
import { isNil } from 'lodash';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
export class JsonTransformer<T> implements ValueTransformer {
  public from(value?: string | null): T | undefined {
    try {
      return JsonTransformer.parseJson<T>(value);
    } catch (e: any) {
      return;
    }
  }

  public to(value?: T | null): string | undefined {
    if (isNil(value)) {
      return;
    }

    return JSON.stringify(value);
  }

  static parseJson = <TResult>(json: string): TResult | undefined => {
    return JSON.parse(json, (_: string, value: any): any => {
      if (typeof value === 'string' && DATE_REGEX.test(value) && !isNaN(Date.parse(value))) {
        // Datetime string
        return new Date(value);
      }

      return value;
    });
  };
}
