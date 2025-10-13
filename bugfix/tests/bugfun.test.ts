import { describe, it, expect } from "vitest";
import summarize from "../src/bugfun";

describe("summarize (debugging exercise)", () => {
  it("parses numbers and numeric strings, ignores junk", () => {
    const r = summarize([10, "20", " 30 ", "hi", "", "NaN", 40]);
    expect(r.values).toEqual([10, 20, 30, 40]); // order after processing is not guaranteed by spec, but current impl sorts
    expect(r.count).toBe(4);
    expect(r.sum).toBe(100);
  });

  it("handles empty input safely (no exceptions) and returns zeros/nulls", () => {
    const r = summarize([]);
    expect(r.count).toBe(0);
    expect(r.sum).toBe(0);
    expect(r.average).toBe(0);
    expect(r.min).toBeNull();
    expect(r.max).toBeNull();
    expect(r.median).toBeNull();
  });

  it("drops the lowest values after sorting ascending", () => {
    const r = summarize([10, 20, 30, 40], { dropLowest: 1 });
    expect(r.values).toEqual([20, 30, 40]);
    expect(r.min).toBe(20);
    expect(r.max).toBe(40);
    expect(r.median).toBe(30);
  });

  it("clamps values to [clampMin, clampMax] when provided", () => {
    const r = summarize([1, 10, 50], { clampMin: 5, clampMax: 25 });
    expect(r.values).toEqual([5, 10, 25]);
    expect(r.min).toBe(5);
    expect(r.max).toBe(25);
  });

  it("rounds average to the given precision using standard rounding", () => {
    // Average = (2.4 + 2.6 + 2.65) / 3 = 2.55 -> 1 decimal place should be 2.6
    const r = summarize([2.4, 2.6, 2.65], { precision: 1 });
    expect(r.average).toBe(2.6);
  });

  it("computes correct median for even-length lists (mean of the middle pair)", () => {
    const r = summarize([1, 2, 3, 4]);
    expect(r.median).toBe(2.5);
  });
});
