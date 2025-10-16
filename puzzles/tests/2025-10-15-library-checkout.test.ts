import { describe, it, expect } from "vitest";
import { getCurrentlyCheckedOut } from "../problems/2025-10-15-library-checkout";

describe("getCurrentlyCheckedOut", () => {
  it("returns empty array when no events", () => {
    expect(getCurrentlyCheckedOut([])).toEqual([]);
  });

  it("returns book that was checked out but not returned", () => {
    const events = [{ title: "1984", action: "checkout" as const }];
    expect(getCurrentlyCheckedOut(events)).toEqual(["1984"]);
  });

  it("returns empty array when book is checked out and returned", () => {
    const events = [
      { title: "1984", action: "checkout" as const },
      { title: "1984", action: "return" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual([]);
  });

  it("handles multiple books with different statuses", () => {
    const events = [
      { title: "1984", action: "checkout" as const },
      { title: "Dune", action: "checkout" as const },
      { title: "1984", action: "return" as const },
      { title: "Brave New World", action: "checkout" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual([
      "Brave New World",
      "Dune",
    ]);
  });

  it("handles multiple copies of the same book", () => {
    const events = [
      { title: "1984", action: "checkout" as const },
      { title: "1984", action: "checkout" as const },
      { title: "1984", action: "return" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual(["1984"]);
  });

  it("handles all copies returned", () => {
    const events = [
      { title: "1984", action: "checkout" as const },
      { title: "1984", action: "checkout" as const },
      { title: "1984", action: "return" as const },
      { title: "1984", action: "return" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual([]);
  });

  it("returns sorted array of checked out books", () => {
    const events = [
      { title: "Zebra Tales", action: "checkout" as const },
      { title: "Ancient History", action: "checkout" as const },
      { title: "Middle Earth Guide", action: "checkout" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual([
      "Ancient History",
      "Middle Earth Guide",
      "Zebra Tales",
    ]);
  });

  it("handles complex scenario with multiple books and copies", () => {
    const events = [
      { title: "Harry Potter", action: "checkout" as const },
      { title: "Lord of the Rings", action: "checkout" as const },
      { title: "Harry Potter", action: "checkout" as const },
      { title: "The Hobbit", action: "checkout" as const },
      { title: "Harry Potter", action: "return" as const },
      { title: "Lord of the Rings", action: "return" as const },
      { title: "The Hobbit", action: "return" as const },
    ];
    expect(getCurrentlyCheckedOut(events)).toEqual(["Harry Potter"]);
  });
});
