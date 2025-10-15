import { describe, it, expect } from "vitest";
import { parkingGarageExit } from "../problems/assignment2";

describe("parkingGarageExit", () => {
  it("returns canExit false when garage is empty", () => {
    const result = parkingGarageExit([], "A");
    expect(result).toEqual({ canExit: false });
  });

  it("returns canExit false when car is not in garage", () => {
    const result = parkingGarageExit(["A", "B", "C"], "D");
    expect(result).toEqual({ canExit: false });
  });

  it("allows front car to exit with no moves needed", () => {
    const result = parkingGarageExit(["A", "B", "C"], "A");
    expect(result).toEqual({
      canExit: true,
      carsToMove: [],
      finalGarage: ["B", "C"],
    });
  });

  it("handles single car in garage", () => {
    const result = parkingGarageExit(["A"], "A");
    expect(result).toEqual({
      canExit: true,
      carsToMove: [],
      finalGarage: [],
    });
  });

  it("requires moving one car for second position exit", () => {
    const result = parkingGarageExit(["A", "B", "C"], "B");
    expect(result).toEqual({
      canExit: true,
      carsToMove: ["A"],
      finalGarage: ["C", "A"],
    });
  });

  it("requires moving all cars for back position exit", () => {
    const result = parkingGarageExit(["A", "B", "C"], "C");
    expect(result).toEqual({
      canExit: true,
      carsToMove: ["A", "B"],
      finalGarage: ["B", "A"],
    });
  });

  it("handles larger garage with middle car exit", () => {
    const result = parkingGarageExit(
      ["A", "B", "C", "D", "E"],
      "C"
    );
    expect(result).toEqual({
      canExit: true,
      carsToMove: ["A", "B"],
      finalGarage: ["D", "E", "B", "A"],
    });
  });

  it("handles duplicate car IDs by using first occurrence", () => {
    const result = parkingGarageExit(["A", "B", "A", "C"], "A");
    expect(result).toEqual({
      canExit: true,
      carsToMove: [],
      finalGarage: ["B", "A", "C"],
    });
  });

  it("handles complex realistic scenario", () => {
    const garage = ["Car1", "Car2", "Car3", "Car4", "Car5", "Car6"];
    const result = parkingGarageExit(garage, "Car4");
    expect(result).toEqual({
      canExit: true,
      carsToMove: ["Car1", "Car2", "Car3"],
      finalGarage: ["Car5", "Car6", "Car3", "Car2", "Car1"],
    });
  });
});
