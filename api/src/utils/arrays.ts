export const repeat = <T>(n: number, fn: () => T): T[] =>
  Array.from({ length: n }, fn)
