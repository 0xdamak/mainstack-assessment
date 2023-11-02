export function sortByDate(
  data: Array<Record<string, any>>,
  dateProperty: string,
): Record<string, any> {
  return data
    .slice()
    .sort((a, b) => +new Date(a[dateProperty]) - +new Date(b[dateProperty]));
}
