export function valueExistsInArray(array: [], key: string, value: string) {
  return array.some(function (el) {
    return el[key] === value;
  });
}

export function removeItemsFromArray(
  arrayToFilter: string[],
  itemsToRemove: string[]
) {
  itemsToRemove.forEach((itemToRemove) => {
    arrayToFilter = arrayToFilter.filter(
      (arrayItem) => arrayItem !== itemToRemove
    );
  });

  return arrayToFilter;
}
