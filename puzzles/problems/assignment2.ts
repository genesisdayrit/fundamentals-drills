/*
 * Comedy Club Booking System
 *
 * You're managing bookings for Andrew's over-ambitious comedy club startup.
 * The club has multiple shows per night, each with limited seating capacity.
 * Process booking requests in order and assign guests to shows based on availability.
 * If a show is full, add guests to that show's waitlist.
 *
 * Input:
 * - shows: Array of show objects with { name: string, capacity: number }
 * - bookings: Array of booking requests with { guest: string, showName: string }
 *
 * Output:
 * - Object with show names as keys, each containing:
 *   - confirmed: Array of guest names who got seats
 *   - waitlist: Array of guest names on the waitlist
 *
 * Examples:
 * - Shows: [{ name: "Stand-up Night", capacity: 2 }]
 * - Bookings: [{ guest: "Alice", showName: "Stand-up Night" }, { guest: "Bob", showName: "Stand-up Night" }, { guest: "Charlie", showName: "Stand-up Night" }]
 * - Result: { "Stand-up Night": { confirmed: ["Alice", "Bob"], waitlist: ["Charlie"] } }
 */
export function processComedyClubBookings(shows, bookings) {
  return {} // TODO!
}