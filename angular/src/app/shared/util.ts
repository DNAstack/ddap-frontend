export function objectToArray(dto) {
  const bar = Object
    .keys(dto)
    .map((key) => {
      return {
        ...dto[key],
      };
    });

  return bar;
}
