/*
 * Parking Garage Exit Validator
 * 
 * You are managing a single-lane parking garage where cars park in a line.
 * Cars can only exit from the front of the garage. When a car wants to leave,
 * you need to determine if it can exit, and if so, which cars must temporarily
 * move out of the way.
 * 
 * The garage has a temporary holding area where cars can wait while others exit.
 * 
 * Rules:
 * 1. Cars are parked in order from front (index 0) to back
 * 2. Only the front car can exit directly
 * 3. To get a car out from position N, all cars in positions 0 to N-1 must
 *    temporarily move to the holding area
 * 4. After the target car exits, the cars from holding return in reverse order
 *    (last out, first back in)
 * 
 * Input: 
 *   - garage: array of car IDs (strings) from front to back
 *   - carToExit: the ID of the car that wants to leave
 * 
 * Output:
 *   - If the car is not in the garage, return { canExit: false }
 *   - If the car can exit, return:
 *     {
 *       canExit: true,
 *       carsToMove: array of car IDs that must move (in order they move out),
 *       finalGarage: array of car IDs remaining after exit (in final order)
 *     }
 * 
 * Examples:
 * 
 * garage = ["A", "B", "C"], carToExit = "A"
 * → { canExit: true, carsToMove: [], finalGarage: ["B", "C"] }
 * 
 * garage = ["A", "B", "C"], carToExit = "C"
 * → { canExit: true, carsToMove: ["A", "B"], finalGarage: ["B", "A"] }
 * 
 * garage = ["A", "B", "C"], carToExit = "D"
 * → { canExit: false }
 * 
 * Edge cases:
 * - Empty garage: car cannot exit
 * - Car not in garage: cannot exit
 * - Single car in garage: can exit directly with no moves
 * - Multiple cars with same ID: only the first occurrence is considered
 */

export function parkingGarageExit(garage, carToExit) {
  // TODO: Implement this function
  throw new Error("Not implemented");
}
