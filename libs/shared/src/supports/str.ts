import { v4 as uuid } from 'uuid';

export default class Str {
    static uuid() {
        return uuid();
    }

    /**
  *
  * @param keyword: raw keyword from user input;
  * @returns filtered wildcard keyword
  * Can search _ % character;
  * postgresql: % => \\%
  * mssql: % => [%]
  */
    public static filterSearchKeyword(keyword: string) {
        const trimmed = keyword.trim();
        const escapedKeyword = trimmed.replace('%', '[%]').replace('_', '[_]');
        return `%${escapedKeyword}%`;
    }

    static stringOrDefault(value: string, defaultValue = '') {
        return value || defaultValue;
    }
}
