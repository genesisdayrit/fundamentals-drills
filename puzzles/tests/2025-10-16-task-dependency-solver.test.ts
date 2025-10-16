import { describe, it, expect } from 'vitest';
import { calculateCompletionTime } from '../problems/2025-10-16-task-dependency-solver';

describe('calculateCompletionTime', () => {
  it('should return 0 for empty task list', () => {
    expect(calculateCompletionTime({})).toBe(0);
  });

  it('should handle single task with no dependencies', () => {
    const tasks = {
      build: { dependencies: [], duration: 10 }
    };
    expect(calculateCompletionTime(tasks)).toBe(10);
  });

  it('should handle linear dependency chain', () => {
    const tasks = {
      compile: { dependencies: [], duration: 10 },
      test: { dependencies: ['compile'], duration: 5 },
      deploy: { dependencies: ['test'], duration: 3 }
    };
    expect(calculateCompletionTime(tasks)).toBe(18);
  });

  it('should handle parallel tasks that converge', () => {
    const tasks = {
      download: { dependencies: [], duration: 8 },
      parse: { dependencies: ['download'], duration: 3 },
      validate: { dependencies: ['download'], duration: 2 },
      process: { dependencies: ['parse', 'validate'], duration: 5 }
    };
    // download: 0-8, parse: 8-11, validate: 8-10, process waits for parse: 11-16
    expect(calculateCompletionTime(tasks)).toBe(16);
  });

  it('should detect circular dependency between two tasks', () => {
    const tasks = {
      A: { dependencies: ['B'], duration: 1 },
      B: { dependencies: ['A'], duration: 1 }
    };
    expect(calculateCompletionTime(tasks)).toBe(-1);
  });

  it('should detect circular dependency in longer chain', () => {
    const tasks = {
      A: { dependencies: ['B'], duration: 1 },
      B: { dependencies: ['C'], duration: 1 },
      C: { dependencies: ['A'], duration: 1 }
    };
    expect(calculateCompletionTime(tasks)).toBe(-1);
  });

  it('should handle complex parallel execution graph', () => {
    const tasks = {
      fetchData: { dependencies: [], duration: 5 },
      fetchConfig: { dependencies: [], duration: 3 },
      initialize: { dependencies: ['fetchConfig'], duration: 2 },
      processData: { dependencies: ['fetchData', 'initialize'], duration: 4 },
      render: { dependencies: ['processData'], duration: 6 }
    };
    // fetchData: 0-5, fetchConfig: 0-3, initialize: 3-5, processData: 5-9, render: 9-15
    expect(calculateCompletionTime(tasks)).toBe(15);
  });

  it('should handle tasks with zero duration', () => {
    const tasks = {
      instant: { dependencies: [], duration: 0 },
      after: { dependencies: ['instant'], duration: 5 }
    };
    expect(calculateCompletionTime(tasks)).toBe(5);
  });

  it('should handle diamond dependency pattern', () => {
    const tasks = {
      start: { dependencies: [], duration: 2 },
      left: { dependencies: ['start'], duration: 3 },
      right: { dependencies: ['start'], duration: 5 },
      end: { dependencies: ['left', 'right'], duration: 1 }
    };
    // start: 0-2, left: 2-5, right: 2-7, end waits for right: 7-8
    expect(calculateCompletionTime(tasks)).toBe(8);
  });

  it('should handle missing dependency gracefully', () => {
    const tasks = {
      task1: { dependencies: ['nonexistent'], duration: 5 }
    };
    expect(calculateCompletionTime(tasks)).toBe(-1);
  });
});

