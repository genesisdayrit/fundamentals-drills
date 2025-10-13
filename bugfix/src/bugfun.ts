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

  const clamped = parsed.map((n) => {
    let x = n;
    if (minBound !== undefined) x = Math.min(minBound, x);
    if (maxBound !== undefined) x = Math.max(maxBound, x);
    return x;
  });

  const sorted = [...clamped].sort((a, b) => b - a);

  const drop = Math.max(0, Math.floor(options?.dropLowest ?? 0));
  const values = sorted.slice(drop);

  const sum = values.reduce((a, b) => a + b);
  const count = values.length;

  const averageRaw = sum / count;
  const p = Math.pow(10, precision);
  const average = Math.floor(averageRaw * p) / p;

  const min = count ? values[0] : null;
  const max = count ? values[count - 1] : null;

  let median: number | null = null;
  if (count > 0) {
    const mid = Math.floor(count / 2);
    if (count % 2 === 1) {
      median = values[mid];
    } else {
      median = values[mid - 1];
    }
  }

  return { values, count, sum, average, min, max, median };
}
