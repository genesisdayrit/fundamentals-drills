/**
 * Package Delivery Route Optimizer
 * 
 * You are building a system for a delivery driver who needs to pick up and deliver
 * packages along a single route. Each package has a pickup location and a delivery
 * location (both represented as positions along a 1D route, like mile markers).
 * 
 * The driver starts at position 0 and can only move forward along the route (cannot
 * go backwards). The driver must pick up a package before delivering it, and can
 * carry multiple packages at once.
 * 
 * Your task is to determine:
 * 1. Whether all packages can be successfully delivered given the constraints
 * 2. The optimal order to pick up and deliver packages to minimize total distance
 * 3. The total distance traveled
 * 
 * Rules:
 * - Driver starts at position 0
 * - Driver can only move forward (increasing positions)
 * - Must pick up a package before delivering it
 * - If a delivery location is before its pickup location, that package cannot be delivered
 * - Driver must visit all pickup/delivery locations in increasing order
 * 
 * Input: An array of packages, where each package has:
 *   - id: string identifier
 *   - pickup: number (position where package is picked up)
 *   - delivery: number (position where package is delivered)
 * 
 * Output: An object with:
 *   - success: boolean (whether all packages can be delivered)
 *   - route: array of events in order, each event is { position: number, type: "pickup" | "delivery", packageId: string }
 *   - totalDistance: number (total distance traveled, or 0 if not successful)
 *   - undeliverable: array of package IDs that cannot be delivered (empty if all can be delivered)
 * 
 * Examples:
 * 
 * Input: [
 *   { id: "A", pickup: 5, delivery: 10 },
 *   { id: "B", pickup: 3, delivery: 8 }
 * ]
 * Output: {
 *   success: true,
 *   route: [
 *     { position: 3, type: "pickup", packageId: "B" },
 *     { position: 5, type: "pickup", packageId: "A" },
 *     { position: 8, type: "delivery", packageId: "B" },
 *     { position: 10, type: "delivery", packageId: "A" }
 *   ],
 *   totalDistance: 10,
 *   undeliverable: []
 * }
 * 
 * Input: [
 *   { id: "A", pickup: 10, delivery: 5 }  // Delivery before pickup!
 * ]
 * Output: {
 *   success: false,
 *   route: [],
 *   totalDistance: 0,
 *   undeliverable: ["A"]
 * }
 */

/*

problem intuition

starts position 0
only moves forward
pickup packages before delivering
must pickup/deliver all packages in increasing order
want to minimize total distance traveled

*/

type Success = Boolean
type Route = {
  position: number
  type: string
  packageId: string
}

type Routes = Route[]
type TotalDistance = number
type Undeliverable = []

type Package = {
  id: string
  pickup: number
  delivery: number
}


export function optimizeDeliveryRoute(packages: any): any {
  // handle empty list of packages

  let result: any = {}
  let routes: Routes = []
  let optimizedRoute: [] = []

  // if no packages
  if (packages.length === 0) {
    result = {
      success: true,
      route: [],
      totalDistance: 0,
      undeliverable: []
    }
  }

  // if single package
  if (packages.length > 0) {
    // get the pickup and delivery route
    for (let i = 0; i < packages.length; i++) {
      let packageRoute = packages[i]
      const {id, pickup, delivery } = packageRoute
      console.log('package:', packageRoute)
      console.log('package pickup:', pickup)
      console.log('package delivery:', delivery)

      let pickupRoute = {
        position: pickup, 
        type: 'pickup', 
        packageId: id
      }

      let deliveryRoute = {
        position: delivery, 
        type: 'delivery',
        packageId: id
      }
      
      // push the pickup and delivery to the optimized route
      optimizedRoute.push(pickupRoute)
      optimizedRoute.push(deliveryRoute)

      optimizedRoute.sort((a, b) => a - b)
      console.log('optimized route:', optimizedRoute)

      // for each route calculate the distance from the starting point
      let distanceTraveled = 0
      let initialPosition = 0
      
      for (let j = 0; j < optimizedRoute.length; j++) {
        let pathStop = optimizedRoute[j]
        let endPosition = pathStop.position
        console.log('route stop:', pathStop)
        let routeDiff = endPosition - initialPosition
        
        initialPosition = endPosition
        distanceTraveled += routeDiff
        console.log('Distance traveled:', distanceTraveled) 
      }

      result = {
        success: true,
        route: optimizedRoute, 
        totalDistance: distanceTraveled,
        undeliverable: []
      }
    }
  }


  return result
}
