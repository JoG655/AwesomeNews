export function createRange(start: number, end: number, step = 1) {
  return Array.from({ length: (end - start) / step + 1 }, (_, i) => {
    return Number(start + i * step);
  });
}
