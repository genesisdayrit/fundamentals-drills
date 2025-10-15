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


/* problem intution

single lane parking garage, so there is a car order
only the front can move out, so front needs to be represented by the first index or last index

need to determine which cars need to temporarily move out

after the target car leaves, the cars return to the garage in the order that they left

input is garage array of cars and carToExit which is the target

solution components

need to add cars back in to the front of the array not push to back
need to check if the car is in the garage
need to id the position of the target car to move
if the index of the target car to move is not 0, you need to id the cars that need to be moved out

create a new array of carsToTemporarily move, in order from first car until index of the carToMove
unshift the cars back to the front
probably can use shift to get the cars out up until the index length

*/

type Garage = string[]
type CarToExit = string
type CanExit = boolean | undefined
type CarsToMove = string[]
type FinalGarage = string[]

type Result = {
  canExit: CanExit
  carsToMove?: CarsToMove
  finalGarage?: FinalGarage
}

export function parkingGarageExit(garage: string[], carToExit: string): Result {
  
  let result: Result = {
    canExit: undefined,
    // carsToMove: [],
    // finalGarage: garage
  }


  // find the index of the target car
  let targetCarIndex = garage.findIndex((car) => car === carToExit)
  console.log('targetCarIndex:', targetCarIndex)

  // if the car doesn't exist
  if (targetCarIndex === -1) {
    console.log('Car does not exist in garage')
    result = {
      canExit: false
    }
  }

  // if targetCarIndex is index 0
  if (targetCarIndex === 0) {
    let finalGarage = garage.shift()  
    result = {
      canExit: true,
      carsToMove: [],
      finalGarage: garage,
    }
  }

  if (targetCarIndex > 0) {
    // slice the cars up until the index position
    let tempGarage = garage
    let carsToMove = tempGarage.slice(0, targetCarIndex)
    console.log('cars moved out:', carsToMove)
    let carsToMoveReversed = structuredClone(carsToMove).reverse()

    // take the cars out including target car
    let targetCarRemoved = tempGarage.splice(0, targetCarIndex+1)
    
    // let tempGarage = garage.shift(targetCarIndex)
    console.log('temp garage:', tempGarage)
    console.log('cars back in reverse:', carsToMove)

    // add the cars back into the garage after removing the target car

    let finalGarage = [...tempGarage, ...carsToMoveReversed]
    console.log('final garage:', finalGarage)

    // let finalGarage = tempGarage.unshift(carsToMove)
    // console.log('final garage:', finalGarage)

    result = {
      canExit: true, 
      carsToMove: carsToMove,
      finalGarage: finalGarage
    }

  }
  console.log('result:', result)
  return result
} 
