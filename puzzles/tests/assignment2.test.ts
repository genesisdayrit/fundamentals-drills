import { describe, it, expect } from 'vitest';
import { simulateGarage } from '../problems/assignment2';

describe('simulateGarage', () => {
  it('handles empty events', () => {
    expect(simulateGarage([])).toEqual({
      lane: [],
      departed: [],
      blocked: [],
    });
  });

  it('handles a simple successful departure', () => {
    const events = [
      { type: 'arrive' as const, car: 'ABC123' },
      { type: 'depart' as const, car: 'ABC123' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: [],
      departed: ['ABC123'],
      blocked: [],
    });
  });

  it('blocks a car that tries to leave from the back', () => {
    const events = [
      { type: 'arrive' as const, car: 'CAR1' },
      { type: 'arrive' as const, car: 'CAR2' },
      { type: 'depart' as const, car: 'CAR2' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: ['CAR1', 'CAR2'],
      departed: [],
      blocked: ['CAR2'],
    });
  });

  it('allows sequential departures from the front', () => {
    const events = [
      { type: 'arrive' as const, car: 'CAR1' },
      { type: 'arrive' as const, car: 'CAR2' },
      { type: 'arrive' as const, car: 'CAR3' },
      { type: 'depart' as const, car: 'CAR1' },
      { type: 'depart' as const, car: 'CAR2' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: ['CAR3'],
      departed: ['CAR1', 'CAR2'],
      blocked: [],
    });
  });

  it('handles multiple blocked attempts for the same car', () => {
    const events = [
      { type: 'arrive' as const, car: 'CAR1' },
      { type: 'arrive' as const, car: 'CAR2' },
      { type: 'depart' as const, car: 'CAR2' },
      { type: 'depart' as const, car: 'CAR2' },
      { type: 'depart' as const, car: 'CAR2' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: ['CAR1', 'CAR2'],
      departed: [],
      blocked: ['CAR2'], // Only appears once
    });
  });

  it('handles a realistic scenario with mixed successes and blocks', () => {
    const events = [
      { type: 'arrive' as const, car: 'RED' },
      { type: 'arrive' as const, car: 'BLUE' },
      { type: 'arrive' as const, car: 'GREEN' },
      { type: 'depart' as const, car: 'BLUE' }, // Blocked
      { type: 'depart' as const, car: 'RED' },  // Success
      { type: 'depart' as const, car: 'BLUE' }, // Now succeeds
      { type: 'arrive' as const, car: 'YELLOW' },
      { type: 'depart' as const, car: 'YELLOW' }, // Blocked
      { type: 'depart' as const, car: 'GREEN' }, // Success
    ];
    expect(simulateGarage(events)).toEqual({
      lane: ['YELLOW'],
      departed: ['RED', 'BLUE', 'GREEN'],
      blocked: ['BLUE', 'YELLOW'],
    });
  });

  it('ignores departure of a car not in the garage', () => {
    const events = [
      { type: 'arrive' as const, car: 'CAR1' },
      { type: 'depart' as const, car: 'GHOST' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: ['CAR1'],
      departed: [],
      blocked: [],
    });
  });

  it('handles all cars successfully leaving', () => {
    const events = [
      { type: 'arrive' as const, car: 'A' },
      { type: 'arrive' as const, car: 'B' },
      { type: 'arrive' as const, car: 'C' },
      { type: 'depart' as const, car: 'A' },
      { type: 'depart' as const, car: 'B' },
      { type: 'depart' as const, car: 'C' },
    ];
    expect(simulateGarage(events)).toEqual({
      lane: [],
      departed: ['A', 'B', 'C'],
      blocked: [],
    });
  });
});

