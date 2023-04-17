import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ValueTransformer } from 'typeorm';
import { isNil } from 'lodash';

export interface EncryptTransformerOptions {
  algorithm?: string;
  ivLength?: number;
  key?: string;
}

export class EncryptTransformer implements ValueTransformer {
  constructor(private options: EncryptTransformerOptions = {}) {
    this.options = {
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      key: process.env.ENCRYPT_KEY,
      ...options,
    } as EncryptTransformerOptions;
  }

  public from(value?: string | null): string | undefined {
    if (isNil(value)) {
      return;
    }

    const { algorithm, key, ivLength } = this
      .options as Required<EncryptTransformerOptions>;
    const data = Buffer.from(value, 'base64');
    const iv = data.slice(0, ivLength);
    const decipher = createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    const start = decipher.update(data.slice(ivLength));
    const final = decipher.final();
    return Buffer.concat([start, final]).toString('utf8');
  }

  public to(value?: string | null): string | undefined {
    if (isNil(value)) {
      return;
    }

    const { algorithm, key, ivLength } = this
      .options as Required<EncryptTransformerOptions>;
    const iv = randomBytes(ivLength);
    const cipher = createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    const start = cipher.update(value);
    const end = cipher.final();
    return Buffer.concat([iv, start, end]).toString('base64');
  }
}
