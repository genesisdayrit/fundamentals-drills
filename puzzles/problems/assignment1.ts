/*
 * Library Checkout Tracker
 * 
 * You are managing a library's checkout system. Given a log of checkout events,
 * determine which books are currently checked out (not yet returned).
 * 
 * Input: An array of checkout events, where each event has:
 *   - title: string (book title)
 *   - action: "checkout" | "return"
 * Events are processed in order. A book can be checked out multiple times
 * (e.g., multiple copies), but each checkout must be matched with a return.
 * 
 * Output: A sorted array of book titles that are currently checked out.
 * If a book has multiple unreturned checkouts, include it only once.
 * 
 * Examples:
 *   Input: [
 *     { title: "1984", action: "checkout" },
 *     { title: "Dune", action: "checkout" },
 *     { title: "1984", action: "return" }
 *   ]
 *   Output: ["Dune"]
 * 
 *   Input: [
 *     { title: "1984", action: "checkout" },
 *     { title: "1984", action: "checkout" },
 *     { title: "1984", action: "return" }
 *   ]
 *   Output: ["1984"] (one copy still out)
 */


/* game intuition
- library with books
- book availability
- books can either be available or checked out
- checkout events
- books can have multiple copies

- output is a sorted array of book titles that are currently checked out
- books with multiple checked out should only be checked out once

-- based on the example, it loks like we only return the array of book titles that are checked out
-- so it looks like we check for each book if its associated last event is return or checked out

*/

type Event = {
  title: string
  action: "checkout" | "return"
}

type Events = Event[]

export function getCurrentlyCheckedOut(events: Events) {

  // push each distinct booked where the last action is checked out
  let checkedOutBooks: string[] = []
  // let distinctBooks: string[] = []

  for (let i = 0; i < events.length; i++) {
    let event = events[i]
    let eventTitle = event.title
    console.log('event title:', eventTitle)
    let eventAction = event.action
    console.log('event action:', eventAction)

    if (eventAction === "checkout") {
      checkedOutBooks.push(eventTitle)
      console.log('checkedOutBooks:', checkedOutBooks)
    } else if (eventAction === "return") {
      const bookIndexPosition: number = checkedOutBooks.findIndex((bookTitle) => bookTitle === eventTitle)
      console.log('bookIndexPosition:', bookIndexPosition)
      checkedOutBooks.splice(bookIndexPosition, 1)
      console.log('New Checked Out Books:', checkedOutBooks)
    }
  }

  checkedOutBooks.sort()
  
  return checkedOutBooks
}
  
