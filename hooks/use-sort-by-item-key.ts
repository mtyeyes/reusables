import { useEffect, useState } from 'react';

export type SortingDirection = 'ascending' | 'descending';

export const useSortByItemKey = <O extends {}>(items: Array<O>, key: keyof O) => {
  const [sortingDirection, setSortingDirection] = useState<SortingDirection>('ascending');
  const [sortedItems, setSortedItems] = useState(items);

  const ascendingSort = (a: O, b: O) => Number(a[key]) - Number(b[key]);
  const descendingSort = (a: O, b: O) => Number(b[key]) - Number(a[key]);

  useEffect(() => {
    setSortedItems(
      items.sort(sortingDirection === 'ascending' ? ascendingSort : descendingSort),
    );
  }, [items, sortingDirection]);

  return { sortedItems, sortingDirection, setSortingDirection };
};
