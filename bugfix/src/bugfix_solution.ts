/**
 * Summarize a list of numeric inputs with optional preprocessing.
 *
 * @param inputs List of numbers or numeric strings. Non-numeric values are ignored.
 * @param options Optional transforms:
 *  - dropLowest: number of lowest values to drop after sorting ascending
 *  - clampMin: values below this are raised up to this bound
 *  - clampMax: values above this are lowered to this bound
 *  - precision: number of decimal places to round the average to
 * @returns An object with the processed values and basic statistics.
 */
export default function summarize(
  inputs: Array<number | string>,
  options?: {
    dropLowest?: number;
    clampMin?: number;
    clampMax?: number;
    precision?: number;
  }
): {
  values: number[];
  count: number;
  sum: number;
  average: number;
  min: number | null;
  max: number | null;
  median: number | null;
} {
  const precision = options?.precision ?? 2;
  const minBound = options?.clampMin;
  const maxBound = options?.clampMax;

  const parsed = inputs
    .map((v) => (typeof v === "string" ? Number(v.trim()) : v))
    .filter((n) => typeof n === "number" && Number.isFinite(n));

  // FIX 1 (clamp logic): Use proper clamp order: min(max(x, min), max)
  // The buggy version inverted min/max which could expand values instead of clamping.
  const clamped = parsed.map((n) => {
    let x = n;
    if (minBound !== undefined) x = Math.max(minBound, x);
    if (maxBound !== undefined) x = Math.min(maxBound, x);
    return x;
  });

  // FIX 2 (sort order): Sort ascending so that "dropLowest" removes the smallest values first.
  // The buggy version sorted descending and then sliced, dropping the highest instead.
  const sorted = [...clamped].sort((a, b) => a - b);

  const drop = Math.max(0, Math.floor(options?.dropLowest ?? 0));
  const values = sorted.slice(drop);

  // FIX 3 (sum on empty arrays): Provide an initial value of 0 so empty arrays don't throw.
  const sum = values.reduce((a, b) => a + b, 0);
  const count = values.length;

  // FIX 4 (average for empty and rounding mode): Return 0 for empty; use standard rounding (Math.round).
  const averageRaw = count === 0 ? 0 : sum / count;
  const p = Math.pow(10, precision);
  const average = Math.round(averageRaw * p) / p;

  // With ascending order, min/max are at the ends.
  const min = count ? values[0] : null;
  const max = count ? values[count - 1] : null;

  // FIX 5 (median even case): For even counts, use the mean of the middle pair.
  let median: number | null = null;
  if (count > 0) {
    const mid = Math.floor(count / 2);
    if (count % 2 === 1) {
      median = values[mid];
    } else {
      median = (values[mid - 1] + values[mid]) / 2;
    }
  }

  return { values, count, sum, average, min, max, median };
}
