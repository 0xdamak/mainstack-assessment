export function countActiveFilters(
  filters: Record<string, string | string[]>,
): number {
  return Object.values(filters).filter((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  ).length;
}
