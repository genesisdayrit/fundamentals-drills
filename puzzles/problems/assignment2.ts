/**
 * Movie Theater Seating System
 *
 * You are implementing a movie theater seating system. The theater has rows of seats,
 * and customers can request to reserve seats. You need to process reservation requests
 * and determine the final seating arrangement.
 *
 * The theater is represented as a grid where each seat can be "available", "reserved",
 * or "blocked" (unusable). Customers request seats by specifying their preferred row
 * and the number of consecutive seats they need.
 *
 * Rules:
 * - Seats must be consecutive in the same row
 * - Choose the leftmost available group of seats in the requested row
 * - If the requested row doesn't have enough consecutive seats, deny the request
 * - Blocked seats cannot be reserved and break consecutiveness
 *
 * Input: Theater layout (2D array) and list of reservation requests
 * Theater: "A" = available, "R" = reserved, "B" = blocked
 * Requests: { customerId: string, row: number, seatsNeeded: number }
 *
 * Return: Object with successful reservations and final theater state
 *
 * Example:
 * Initial theater: [["A", "A", "B", "A", "A"], ["A", "A", "A", "A", "A"]]
 * Request: { customerId: "customer1", row: 0, seatsNeeded: 2 }
 * Result: Seats 0-1 in row 0 reserved, seats 3-4 still available
 */

type Request = { customerId: string; row: number; seatsNeeded: number };

type SeatState = "A" | "B" | "R";

type Row = SeatState[];

type Theater = Row[];

type Reservation = {
  customerId: string;
  row: number;
  startSeat: number;
  endSeat: number;
};

type Result = {
  successfulReservations: Reservation[];
  finalTheater: Theater;
};

function requestIsValid(req: Request): boolean {
  if (req.row < 0) {
    return false;
  }
  return true;
}

function checkRequestAgainstRow(req: Request, row: Row): Reservation | null {
  if (req.seatsNeeded > row.length) {
    return null;
  }

  // Start at leftmost "A"
  // Check if the next req.seatsNeeded are all A
  // if so, add to reservation and return
  // else continue

  const firstAvailableIndex = row.indexOf("A");
  if (firstAvailableIndex < 0) {
    return null;
  }

  for (let s = 0; s < row.length - req.seatsNeeded + 1; s++) {
    let sliceValid = true;
    let startSeat = firstAvailableIndex + s;
    for (let i = startSeat; i < req.seatsNeeded; i++) {
      if (i >= row.length) {
        sliceValid = false;
        break;
      }

      if (row[i] != "A") {
        sliceValid = false;
        break;
      }
    }
    if (sliceValid) {
      return {
        customerId: req.customerId,
        row: req.row,
        startSeat: startSeat,
        endSeat: startSeat + req.seatsNeeded - 1,
      };
    }
  }

  return null;
}

function applyReservationToTheater(reservation: Reservation, theater: Theater) {
  const newRow = theater[reservation.row];
  for (let r = reservation.startSeat; r <= reservation.endSeat; r++) {
    newRow[r] = "R";
  }
  return structuredClone(theater);
}

export function processReservations(
  initialTheater: Theater,
  requests: Request[]
): Result {
  if (initialTheater.length == 0 || requests.length == 0) {
    return {
      successfulReservations: [],
      finalTheater: initialTheater,
    };
  }

  const reservations: Reservation[] = [];
  // const reservations2 = new Array<Reservation>();
  let currentTheater = structuredClone(initialTheater);

  // Loop through each request,
  // see if it can be satisfied,
  // if so add a reservation and update theater,
  // else continue to next request
  for (let i = 0; i < requests.length; i++) {
    const req = requests[i];
    const row = currentTheater[req.row];

    if (!row) {
      continue;
    }

    if (!requestIsValid(req)) {
      continue;
    }

    // Check the request against each row in the theater
    // If the row satisfies, then add that resy to the array and update theater
    // else continue until no more rows remain
    const maybeReservation = checkRequestAgainstRow(req, row);
    if (maybeReservation) {
      // Add row to the set of reservations and update theater
      reservations.push(maybeReservation);
      currentTheater = applyReservationToTheater(
        maybeReservation,
        currentTheater
      );
    }
  }

  return {
    successfulReservations: reservations,
    finalTheater: currentTheater,
  };
}
