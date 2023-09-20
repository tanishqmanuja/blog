export function range(start: number, end: number, step = 1) {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step,
  );
}
