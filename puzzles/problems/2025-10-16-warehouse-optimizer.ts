/**
 * Warehouse Inventory Optimizer
 * 
 * You are managing inventory across multiple warehouses. Products can be moved
 * between warehouses, sold from warehouses, and restocked. Given an initial
 * inventory state and a sequence of operations, determine the final inventory
 * state across all warehouses.
 * 
 * Input: 
 * - initialInventory: An object where keys are warehouse IDs and values are
 *   objects mapping product names to quantities
 * - operations: An array of operation objects, each containing:
 *   - type: "transfer" | "sell" | "restock"
 *   - For "transfer": { from: warehouseId, to: warehouseId, product: string, quantity: number }
 *   - For "sell": { warehouse: warehouseId, product: string, quantity: number }
 *   - For "restock": { warehouse: warehouseId, product: string, quantity: number }
 * 
 * Output: An object with the same structure as initialInventory, showing final
 *         quantities. Include warehouses even if empty. Omit products with 0 quantity.
 *         Return null if any operation is invalid (insufficient inventory, unknown warehouse).
 * 
 * Rules:
 * - Operations are processed in order
 * - Transfers move inventory from one warehouse to another
 * - Sales decrease inventory at a warehouse
 * - Restocks increase inventory at a warehouse
 * - All quantities must be positive integers
 * - Cannot transfer/sell more than available inventory (return null for entire result)
 * - Cannot operate on non-existent warehouses (return null for entire result)
 * - New products can be restocked even if not in initial inventory
 * - Warehouses can be referenced in operations even if not in initial inventory
 *   (they are created on first use)
 * 
 * Examples:
 * 
 * Input:
 *   initialInventory: { WH1: { laptop: 10, mouse: 50 } }
 *   operations: [{ type: "sell", warehouse: "WH1", product: "mouse", quantity: 5 }]
 * Output: { WH1: { laptop: 10, mouse: 45 } }
 * 
 * Input:
 *   initialInventory: { WH1: { laptop: 5 } }
 *   operations: [{ type: "sell", warehouse: "WH1", product: "laptop", quantity: 10 }]
 * Output: null (insufficient inventory)
 * 
 * Input:
 *   initialInventory: { WH1: { laptop: 10 }, WH2: { mouse: 20 } }
 *   operations: [
 *     { type: "transfer", from: "WH1", to: "WH2", product: "laptop", quantity: 5 },
 *     { type: "restock", warehouse: "WH1", product: "keyboard", quantity: 15 }
 *   ]
 * Output: { WH1: { laptop: 5, keyboard: 15 }, WH2: { mouse: 20, laptop: 5 } }
 */

export function processInventoryOperations(initialInventory: any, operations: any): any {
  // Deep clone the initial inventory
  const inventory: Record<string, Record<string, number>> = {};
  
  for (const warehouse in initialInventory) {
    inventory[warehouse] = { ...initialInventory[warehouse] };
  }
  
  // Process each operation
  for (const op of operations) {
    if (op.type === 'sell') {
      const { warehouse, product, quantity } = op;
      
      if (!inventory[warehouse]) {
        return null;
      }
      
      const currentQuantity = inventory[warehouse][product] || 0;
      if (currentQuantity < quantity) {
        return null;
      }
      
      inventory[warehouse][product] = currentQuantity - quantity;
      
      // Remove product if quantity is 0
      if (inventory[warehouse][product] === 0) {
        delete inventory[warehouse][product];
      }
    } else if (op.type === 'transfer') {
      const { from, to, product, quantity } = op;
      
      if (!inventory[from]) {
        return null;
      }
      
      const currentQuantity = inventory[from][product] || 0;
      if (currentQuantity < quantity) {
        return null;
      }
      
      // Decrease from source
      inventory[from][product] = currentQuantity - quantity;
      if (inventory[from][product] === 0) {
        delete inventory[from][product];
      }
      
      // Increase at destination
      if (!inventory[to]) {
        inventory[to] = {};
      }
      inventory[to][product] = (inventory[to][product] || 0) + quantity;
    } else if (op.type === 'restock') {
      const { warehouse, product, quantity } = op;
      
      if (!inventory[warehouse]) {
        inventory[warehouse] = {};
      }
      
      inventory[warehouse][product] = (inventory[warehouse][product] || 0) + quantity;
    }
  }
  
  return inventory;
}

