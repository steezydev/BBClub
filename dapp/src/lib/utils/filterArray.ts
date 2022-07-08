function filterArray<T>(arr: T[], val: T) {
  if (arr.length == 0) return [val];
  if (arr.some((e) => JSON.stringify(e) == JSON.stringify(val)))
    return arr.filter(function (value) {
      return JSON.stringify(value) != JSON.stringify(val);
    });
  return [...arr, val];
}

export { filterArray };
