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


/*

example input 1:
const initial = { WH1: { laptop: 10, mouse: 50 } };

example output 1:
{ WH1: { laptop: 10, mouse: 50 } }

basically no actions happened in this example

example input 2:

const initial = { WH1: { laptop: 10, mouse: 50 } };
const operations = [
      { type: 'sell', warehouse: 'WH1', product: 'mouse', quantity: 5 }
    ];

example output 2:
WH1: { laptop: 10, mouse: 45 }

basically if type is sell then we remove the quantity


problem intuition

the rules above tell you what happens with the operations

problem components:

you will be given the initial state and the operations
warehouse operations happen in order

solution components:
you have to loop through the operations and make the changes to the warehouse states

*/


type Item = string 
type ItemStock = number
// type ItemInventory = [key: Item]: ItemStock

// interface Warehouse = {
// }a

export function processInventoryOperations(initialInventory: any, operations: any): any {
  // create a deep copy of the inventory to work with
  const inventory = {};
  for (const warehouse in initialInventory) {
    inventory[warehouse] = { ...initialInventory[warehouse] };
  }
  // console.log('inventory copy:', inventory)
  
  console.log('start:', inventory);
  
  // loop through operations
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    console.log('operation:', operation);
    
    if (operation.type === 'sell') {
      // subtract quantity from warehouse
      const { warehouse, product, quantity } = operation;
      // console.log('warehouse:', warehouse, 'product:', product)
      
      // warehouse needs to exist
      if (!inventory[warehouse]) {
        console.log('no warehouse');
        return null;
      }
      
      // check if enough quantity
      const currentQuantity = inventory[warehouse][product] || 0;
      console.log('current:', currentQuantity, 'selling:', quantity);
      // console.log('checking if enough:', currentQuantity >= quantity)
      
      if (currentQuantity < quantity) {
        console.log('not enough');
        return null;
      }
      
      // do the sell
      inventory[warehouse][product] = currentQuantity - quantity;
      console.log('new quantity:', inventory[warehouse][product]);
      // console.log('inventory after sell:', inventory)
      
    } else if (operation.type === 'transfer') {
      // move product from one warehouse to another
      const { from, to, product, quantity } = operation;
      // console.log('from:', from, 'to:', to)
      
      // source warehouse needs to exist
      if (!inventory[from]) {
        console.log('no source warehouse');
        return null;
      }
      
      // check if enough quantity at source
      const currentQuantity = inventory[from][product] || 0;
      console.log('current:', currentQuantity, 'transferring:', quantity);
      
      if (currentQuantity < quantity) {
        console.log('not enough');
        return null;
      }
      
      // do the transfer
      // bug: forgot to create warehouse if it doesn't exist
      inventory[from][product] = currentQuantity - quantity;
      const destinationQuantity = inventory[to][product] || 0;
      inventory[to][product] = destinationQuantity + quantity;
      console.log('transferred');
      // console.log('from warehouse:', inventory[from])
      // console.log('to warehouse:', inventory[to])
      
    } else if (operation.type === 'restock') {
      // add quantity to warehouse
      const { warehouse, product, quantity } = operation;
      // console.log('restocking at:', warehouse)
      
      // create warehouse if needed
      if (!inventory[warehouse]) {
        console.log('creating warehouse:', warehouse);
        inventory[warehouse] = {};
      }
      
      // add to quantity
      const currentQuantity = inventory[warehouse][product] || 0;
      inventory[warehouse][product] = currentQuantity + quantity;
      console.log('new quantity:', inventory[warehouse][product]);
    }
  }
  
  // console.log('final state:', inventory)
 
  // need to remove zeros
  
  console.log('done:', inventory);
  return inventory;
}

