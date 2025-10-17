/**
 * Single-Lane Parking Garage
 * 
 * You are managing a single-lane parking garage where cars enter and park in a line.
 * Because it's a single lane, cars can only exit from the front. If a car wants to 
 * leave but is not at the front, it cannot exit and remains stuck.
 * 
 * Given a series of events, simulate the garage and return the final state.
 * 
 * Rules:
 * - "arrive" event: A car enters and parks at the back of the lane
 * - "depart" event: A car attempts to leave. It can only leave if it's at the front.
 *   If it's not at the front, the departure fails and the car stays in place.
 * - Cars are identified by their license plate (string)
 * - Process events in order
 * 
 * Input: An array of event objects. Each event has:
 *   - type: "arrive" or "depart"
 *   - car: string (license plate)
 * 
 * Output: An object with:
 *   - lane: array of cars currently in the garage (front to back)
 *   - departed: array of cars that successfully left (in order of departure)
 *   - blocked: array of cars that tried to leave but were blocked (in order of failed attempts, unique)
 * 
 * Examples:
 *   Input: [
 *     { type: "arrive", car: "ABC123" },
 *     { type: "arrive", car: "XYZ789" },
 *     { type: "depart", car: "ABC123" }
 *   ]
 *   Output: {
 *     lane: ["XYZ789"],
 *     departed: ["ABC123"],
 *     blocked: []
 *   }
 * 
 *   Input: [
 *     { type: "arrive", car: "CAR1" },
 *     { type: "arrive", car: "CAR2" },
 *     { type: "depart", car: "CAR2" }
 *   ]
 *   Output: {
 *     lane: ["CAR1", "CAR2"],
 *     departed: [],
 *     blocked: ["CAR2"]
 *   }
 */

type Event = {
  type: "arrive" | "depart";
  car: string;
};

type GarageState = {
  lane: string[];
  departed: string[];
  blocked: string[];
};

export function simulateGarage(events: Event[]): GarageState {
  // TODO: Implement this function
  throw new Error('Not implemented');
}

