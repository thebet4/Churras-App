export function generateRandomNumber(length: number): string {
  return Array(length)
    .fill(1)
    .reduce((acc, number) => `${acc}${Math.random().toString().substr(2, number)}`, '');
}
