export function enumToOptions<T extends Record<string, string | number>>(
  enumObject: T,
  labelMap?: Partial<Record<keyof T, string>>
): { value: number, label: string }[] {
  return Object.entries(enumObject)
    .filter(([, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: labelMap?.[key as keyof T] ?? key,
      value: value as number,
    }));
}