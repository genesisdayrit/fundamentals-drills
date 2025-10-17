import { describe, it, expect } from 'vitest';
import { findWinner } from '../problems/2025-10-17-lvl1-count-votes';

describe('findWinner', () => {
  it('returns the candidate with the most votes', () => {
    expect(findWinner(['Alice', 'Bob', 'Alice', 'Alice'])).toBe('Alice');
    expect(findWinner(['Bob', 'Bob', 'Alice'])).toBe('Bob');
  });

  it('handles a single vote', () => {
    expect(findWinner(['Alice'])).toBe('Alice');
  });

  it('returns null for empty votes', () => {
    expect(findWinner([])).toBe(null);
  });

  it('breaks ties alphabetically', () => {
    expect(findWinner(['Alice', 'Bob'])).toBe('Alice');
    expect(findWinner(['Zoe', 'Alice', 'Bob'])).toBe('Alice');
    expect(findWinner(['Charlie', 'Bob', 'Charlie', 'Bob'])).toBe('Bob');
  });

  it('handles all votes for the same candidate', () => {
    expect(findWinner(['Alice', 'Alice', 'Alice'])).toBe('Alice');
  });

  it('handles many candidates with various counts', () => {
    const votes = [
      'Alice', 'Bob', 'Charlie', 'Alice', 
      'Diana', 'Bob', 'Alice', 'Eve'
    ];
    expect(findWinner(votes)).toBe('Alice');
  });

  it('handles case-sensitive names', () => {
    expect(findWinner(['alice', 'Alice', 'ALICE'])).toBe('ALICE');
  });
});

