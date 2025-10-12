import { describe, it, expect } from 'vitest';
import { findTopPatron } from '../problems/assignment1';

describe('findTopPatron', () => {
  it('should return the patron with the most checkouts', () => {
    const records = [
      { patron: "Alice", book: "1984" },
      { patron: "Bob", book: "Dune" },
      { patron: "Alice", book: "Brave New World" },
      { patron: "Alice", book: "Foundation" }
    ];
    expect(findTopPatron(records)).toBe("Alice");
  });

  it('should return alphabetically first patron in case of tie', () => {
    const records = [
      { patron: "Charlie", book: "Foundation" },
      { patron: "Bob", book: "Neuromancer" },
      { patron: "Alice", book: "1984" }
    ];
    expect(findTopPatron(records)).toBe("Alice");
  });

  it('should handle empty input', () => {
    expect(findTopPatron([])).toBe("");
  });

  it('should handle single record', () => {
    const records = [{ patron: "Alice", book: "1984" }];
    expect(findTopPatron(records)).toBe("Alice");
  });

  it('should handle multiple patrons with same book count', () => {
    const records = [
      { patron: "Zoe", book: "Book1" },
      { patron: "Zoe", book: "Book2" },
      { patron: "Alice", book: "Book3" },
      { patron: "Alice", book: "Book4" },
      { patron: "Bob", book: "Book5" },
      { patron: "Bob", book: "Book6" }
    ];
    expect(findTopPatron(records)).toBe("Alice");
  });

  it('should count duplicate book checkouts by same patron', () => {
    const records = [
      { patron: "Alice", book: "1984" },
      { patron: "Alice", book: "1984" },
      { patron: "Bob", book: "Dune" }
    ];
    expect(findTopPatron(records)).toBe("Alice");
  });

  it('should handle case-sensitive patron names', () => {
    const records = [
      { patron: "alice", book: "Book1" },
      { patron: "Alice", book: "Book2" },
      { patron: "ALICE", book: "Book3" }
    ];
    expect(findTopPatron(records)).toBe("ALICE");
  });

  it('should work with large dataset', () => {
    const records = [];
    for (let i = 0; i < 100; i++) {
      records.push({ patron: "Alice", book: `Book${i}` });
    }
    for (let i = 0; i < 99; i++) {
      records.push({ patron: "Bob", book: `Book${i}` });
    }
    expect(findTopPatron(records)).toBe("Alice");
  });
});