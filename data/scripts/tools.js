export function normalizeValueLogarithmic(
  valueToProcess,
  minEntry,
  maxEntry,
  normalizedMin,
  normalizedMax
) {
  let preshift =
    (Math.log(valueToProcess - minEntry) / Math.log(maxEntry - minEntry)) *
    (normalizedMax - normalizedMin)
  let shifted = preshift + normalizedMin

  return shifted
}

export function normalizeValueStandard(
  valueToProcess,
  minEntry,
  maxEntry,
  normalizedMin,
  normalizedMax
) {
  let preshift =
    ((valueToProcess - minEntry) / (maxEntry - minEntry)) *
    (normalizedMax - normalizedMin)
  let shifted = preshift + normalizedMin

  return shifted
}
