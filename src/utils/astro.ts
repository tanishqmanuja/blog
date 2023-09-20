export function combineFilters<T>(
  ...filters: ((entry: T) => boolean)[]
): (entry: T) => boolean {
  return (entry: T) => {
    for (const filter of filters) {
      if (!filter(entry)) {
        return false;
      }
    }
    return true;
  };
}
