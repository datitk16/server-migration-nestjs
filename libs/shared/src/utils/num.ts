export default class Num {
  constructor(private num?: number) { }

  static round(num: number, precision: number) {
    return precision > -1 ? Math.round((num + Number.EPSILON) * Math.pow(10, precision)) / Math.pow(10, precision) : num;
    // return precision >= 0 ? +(num.toFixed(precision)) : num;
  }

  static floor(num: number, precision: number) {
    return precision > -1 ? Math.floor((num + Number.EPSILON) * Math.pow(10, precision)) / Math.pow(10, precision) : num;
  }

  // Remove number exists in 2 arrays
  static uniqeTwoArrays(array1: number[], array2: number[]) {
    if (!array1 || array1.length < 1 || !array2 || array2.length < 1) {
      return {
        array1,
        array2,
      };
    }

    const map = {};

    array1.forEach((a) => {
      if (!map[a]) {
        map[a] = 0;
      }
      map[a] += 1;
    });

    array2.forEach((a) => {
      if (!map[a]) {
        map[a] = 0;
      }
      map[a] += 1;
    });
    return {
      array1: array1.filter((a) => map[a] === 1),
      array2: array2.filter((a) => map[a] === 1),
    };
  }
}
