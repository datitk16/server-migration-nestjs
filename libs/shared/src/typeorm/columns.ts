/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, ColumnOptions } from 'typeorm';
import { BooleanTransformer } from './transformers/boolean.transformer';
import { EncryptTransformer } from './transformers/encrypt.transformer';
import { FloatTransformer } from './transformers/float.transformer';
import { HashTransformer } from './transformers/hash.transformer';
import { JsonTransformer } from './transformers/json.transformer';

export const EnumColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'nvarchar',
    length: 100,
    ...options,
  });

export const BooleanColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'tinyint',
    transformer: new BooleanTransformer(),
    default: false,
    ...options,
  });

export const JsonColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'varchar',
    transformer: new JsonTransformer(),
    length: 1000,
    ...options,
  });

export const EncryptColumn = (options: ColumnOptions = {}) =>
  Column({
    transformer: new EncryptTransformer(),
    ...options,
  });

export const HashColumn = (options: ColumnOptions = {}) =>
  Column({
    transformer: new HashTransformer(),
    ...options,
  });

export const ArrayColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'varchar',
    transformer: new JsonTransformer(),
    length: 1000,
    ...options,
  });

export const FloatColumn = (options: ColumnOptions = {}, round: number = 4) =>
  Column({
    type: 'float',
    transformer: new FloatTransformer(round),
    ...options,
  });
