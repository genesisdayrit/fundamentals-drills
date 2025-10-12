import { describe, it, expect } from 'vitest';
import { processComedyClubBookings } from '../problems/assignment2';

describe('processComedyClubBookings', () => {
  it('should handle empty shows and bookings', () => {
    const result = processComedyClubBookings([], []);
    expect(result).toEqual({});
  });

  it('should handle shows with no bookings', () => {
    const shows = [
      { name: 'Stand-up Night', capacity: 2 },
      { name: 'Improv Hour', capacity: 5 }
    ];
    const result = processComedyClubBookings(shows, []);
    expect(result).toEqual({
      'Stand-up Night': { confirmed: [], waitlist: [] },
      'Improv Hour': { confirmed: [], waitlist: [] }
    });
  });

  it('should assign guests to available seats', () => {
    const shows = [{ name: 'Stand-up Night', capacity: 2 }];
    const bookings = [
      { guest: 'Alice', showName: 'Stand-up Night' },
      { guest: 'Bob', showName: 'Stand-up Night' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Stand-up Night': { confirmed: ['Alice', 'Bob'], waitlist: [] }
    });
  });

  it('should add guests to waitlist when show is full', () => {
    const shows = [{ name: 'Stand-up Night', capacity: 2 }];
    const bookings = [
      { guest: 'Alice', showName: 'Stand-up Night' },
      { guest: 'Bob', showName: 'Stand-up Night' },
      { guest: 'Charlie', showName: 'Stand-up Night' },
      { guest: 'Diana', showName: 'Stand-up Night' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Stand-up Night': { confirmed: ['Alice', 'Bob'], waitlist: ['Charlie', 'Diana'] }
    });
  });

  it('should handle multiple shows with different capacities', () => {
    const shows = [
      { name: 'Stand-up Night', capacity: 1 },
      { name: 'Improv Hour', capacity: 3 },
      { name: 'Open Mic', capacity: 0 }
    ];
    const bookings = [
      { guest: 'Alice', showName: 'Stand-up Night' },
      { guest: 'Bob', showName: 'Improv Hour' },
      { guest: 'Charlie', showName: 'Stand-up Night' },
      { guest: 'Diana', showName: 'Improv Hour' },
      { guest: 'Eve', showName: 'Open Mic' },
      { guest: 'Frank', showName: 'Improv Hour' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Stand-up Night': { confirmed: ['Alice'], waitlist: ['Charlie'] },
      'Improv Hour': { confirmed: ['Bob', 'Diana', 'Frank'], waitlist: [] },
      'Open Mic': { confirmed: [], waitlist: ['Eve'] }
    });
  });

  it('should ignore bookings for non-existent shows', () => {
    const shows = [{ name: 'Stand-up Night', capacity: 2 }];
    const bookings = [
      { guest: 'Alice', showName: 'Stand-up Night' },
      { guest: 'Bob', showName: 'Non-existent Show' },
      { guest: 'Charlie', showName: 'Stand-up Night' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Stand-up Night': { confirmed: ['Alice', 'Charlie'], waitlist: [] }
    });
  });

  it('should process realistic full scenario with Andrews comedy club', () => {
    const shows = [
      { name: 'Headliner Special', capacity: 3 },
      { name: 'New Talent Night', capacity: 2 },
      { name: 'Late Show', capacity: 1 }
    ];
    const bookings = [
      { guest: 'Sarah', showName: 'Headliner Special' },
      { guest: 'Mike', showName: 'New Talent Night' },
      { guest: 'Jenny', showName: 'Headliner Special' },
      { guest: 'Tom', showName: 'Late Show' },
      { guest: 'Lisa', showName: 'New Talent Night' },
      { guest: 'Alex', showName: 'Headliner Special' },
      { guest: 'Rachel', showName: 'Headliner Special' },
      { guest: 'David', showName: 'New Talent Night' },
      { guest: 'Emma', showName: 'Late Show' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Headliner Special': {
        confirmed: ['Sarah', 'Jenny', 'Alex'],
        waitlist: ['Rachel']
      },
      'New Talent Night': {
        confirmed: ['Mike', 'Lisa'],
        waitlist: ['David']
      },
      'Late Show': {
        confirmed: ['Tom'],
        waitlist: ['Emma']
      }
    });
  });

  it('should handle zero capacity shows', () => {
    const shows = [{ name: 'Sold Out Show', capacity: 0 }];
    const bookings = [
      { guest: 'Alice', showName: 'Sold Out Show' },
      { guest: 'Bob', showName: 'Sold Out Show' }
    ];
    const result = processComedyClubBookings(shows, bookings);
    expect(result).toEqual({
      'Sold Out Show': { confirmed: [], waitlist: ['Alice', 'Bob'] }
    });
  });
});