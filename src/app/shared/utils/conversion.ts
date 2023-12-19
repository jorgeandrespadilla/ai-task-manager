export function tryConvertToNumber(value: string | null): number | null {
  if (value === null || value === undefined) {
    return null
  }
  const parsedValue = Number(value)
  return isNaN(parsedValue) ? null : parsedValue
}

