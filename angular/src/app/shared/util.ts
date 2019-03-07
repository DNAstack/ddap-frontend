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
