export const findItemIndexByKeyValue = <T, K extends keyof T>(
  array: T[],
  keyName: K,
  keyValue: T[K]
) => {
  for (let index = 0; index < array.length; index++) {
    const match =
      keyName in array[index] && array[index][keyName] === keyValue;
    if (match) {
      return index;
    }
  }
  return -1;
};