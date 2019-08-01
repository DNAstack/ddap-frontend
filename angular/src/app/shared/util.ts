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

export function flattenArray(arr) {
  return arr.reduce((accumulator, currentVal) => accumulator.concat(currentVal), []);
}
