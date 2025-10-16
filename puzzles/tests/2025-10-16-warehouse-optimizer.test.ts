import { describe, it, expect } from 'vitest';
import { processInventoryOperations } from '../problems/2025-10-16-warehouse-optimizer';

describe('processInventoryOperations', () => {
  it('should return initial inventory when no operations', () => {
    const initial = { WH1: { laptop: 10, mouse: 50 } };
    expect(processInventoryOperations(initial, [])).toEqual({ WH1: { laptop: 10, mouse: 50 } });
  });

  it('should handle empty initial inventory with no operations', () => {
    expect(processInventoryOperations({}, [])).toEqual({});
  });

  it('should process a simple sell operation', () => {
    const initial = { WH1: { laptop: 10, mouse: 50 } };
    const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'mouse', quantity: 5 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 10, mouse: 45 }
    });
  });

  it('should return null when selling more than available', () => {
    const initial = { WH1: { laptop: 5 } };
    const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'laptop', quantity: 10 }
    ];
    expect(processInventoryOperations(initial, operations)).toBeNull();
  });

  it('should process a transfer between warehouses', () => {
    const initial = { WH1: { laptop: 10 }, WH2: { mouse: 20 } };
    const operations = [
      { type: 'transfer', from: 'WH1', to: 'WH2', product: 'laptop', quantity: 5 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 5 },
      WH2: { mouse: 20, laptop: 5 }
    });
  });

  it('should return null when transferring more than available', () => {
    const initial = { WH1: { laptop: 3 }, WH2: {} };
    const operations = [
      { type: 'transfer', from: 'WH1', to: 'WH2', product: 'laptop', quantity: 5 }
    ];
    expect(processInventoryOperations(initial, operations)).toBeNull();
  });

  it('should process a restock operation', () => {
    const initial = { WH1: { laptop: 10 } };
    const operations = [
      { type: 'restock', warehouse: 'WH1', product: 'laptop', quantity: 5 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 15 }
    });
  });

  it('should handle restocking a new product', () => {
    const initial = { WH1: { laptop: 10 } };
    const operations = [
      { type: 'restock', warehouse: 'WH1', product: 'keyboard', quantity: 15 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 10, keyboard: 15 }
    });
  });

  it('should omit products with zero quantity', () => {
    const initial = { WH1: { laptop: 5 } };
    const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'laptop', quantity: 5 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: {}
    });
  });

  it('should handle complex sequence of operations', () => {
    const initial = {
      WH1: { laptop: 20, mouse: 50 },
      WH2: { keyboard: 30 }
    };
    const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'mouse', quantity: 10 },
      { type: 'transfer', from: 'WH1', to: 'WH2', product: 'laptop', quantity: 5 },
      { type: 'restock', warehouse: 'WH2', product: 'monitor', quantity: 12 },
      { type: 'sell', warehouse: 'WH2', product: 'keyboard', quantity: 10 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 15, mouse: 40 },
      WH2: { keyboard: 20, laptop: 5, monitor: 12 }
    });
  });

  it('should create new warehouse on first use in operations', () => {
    const initial = { WH1: { laptop: 10 } };
    const operations = [
      { type: 'restock', warehouse: 'WH2', product: 'mouse', quantity: 20 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 10 },
      WH2: { mouse: 20 }
    });
  });

  it('should handle transfer to new warehouse', () => {
    const initial = { WH1: { laptop: 10 } };
    const operations = [
      { type: 'transfer', from: 'WH1', to: 'WH2', product: 'laptop', quantity: 3 }
    ];
    expect(processInventoryOperations(initial, operations)).toEqual({
      WH1: { laptop: 7 },
      WH2: { laptop: 3 }
    });
  });

  it('should return null if any operation in sequence is invalid', () => {
    const initial = { WH1: { laptop: 10 } };
    const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'laptop', quantity: 5 },  // valid: 10 -> 5
      { type: 'sell', warehouse: 'WH1', product: 'laptop', quantity: 3 },  // valid: 5 -> 2
      { type: 'sell', warehouse: 'WH1', product: 'laptop', quantity: 5 }   // invalid: only 2 left
    ];
    expect(processInventoryOperations(initial, operations)).toBeNull();
  });
});

