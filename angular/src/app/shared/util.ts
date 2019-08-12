export function objectToArray(dto) {
  const bar = Object
    .keys(dto)
    .map((key) => {
      return {
        name: key,
        value: dto[key],
      };
    });

  return bar;
}

export function flatten<T>(arrayOfArrays: T[][]): T[] {
  return arrayOfArrays.reduce((accumulator, currentVal) => accumulator.concat(...currentVal), []);
}
