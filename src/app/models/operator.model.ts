export const operators = [
  'of',
  'map',
  'filter',
  'throttleTime',
  'debounceTime',
  'distinctUntilChanged',
  'merge',
  'switchMap',
  'skip',
  'take',
  'finalize',
] as const

export type Operator = typeof operators[number];
