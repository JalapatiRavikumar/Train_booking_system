// Define the interface for a Seat
export interface Seat {
  number: number; // The seat number
  isBooked: boolean; // Indicates if the seat is booked
}

// Define the Train class
export class Train {
  seats: Seat[]; // Array to hold the seats in the train

  // Constructor to initialize the train with seats
  constructor(train?: Train) {         
    if (train) {
      // If a train instance is provided, clone its seats to avoid mutating the original
      this.seats = JSON.parse(JSON.stringify(train.seats));
    } else {
      // Otherwise, initialize with 80 seats, all unbooked
      this.seats = Array(80)
        .fill(null) // Fill the array with null values
        .map((_, index) => ({ number: index + 1, isBooked: false })); // Create Seat objects
    }
  }

  // Method to book a specified number of seats
  bookSeats(numSeats: number): number[] {
    // Validate the number of seats requested
    if (numSeats < 1 || numSeats > 7) {
      throw new Error('Invalid number of seats'); // Throw an error if invalid
    }

    const bookedSeats: number[] = []; // Array to hold the numbers of booked seats
    const rows = this.getRows(); // Get the rows of seats

    // Try to book seats in a single row
    for (const row of rows) {
      // Filter available seats in the current row
      const availableSeats = row.filter((seat) => !seat.isBooked);
      if (availableSeats.length >= numSeats) {
        // If enough available seats, book them
        for (let i = 0; i < numSeats; i++) {
          availableSeats[i].isBooked = true; // Mark seat as booked
          bookedSeats.push(availableSeats[i].number); // Add seat number to bookedSeats
        }
        return bookedSeats; // Return the booked seat numbers
      }
    }

    // If not possible in a single row, try to book nearby seats across rows
    let remainingSeats = numSeats; // Keep track of remaining seats to book
    for (const row of rows) {
      // Filter available seats in the current row
      const availableSeats = row.filter((seat) => !seat.isBooked);
      // Calculate how many seats can be booked from the available ones
      const seatsToBook = Math.min(availableSeats.length, remainingSeats);
      for (let i = 0; i < seatsToBook; i++) {
        availableSeats[i].isBooked = true; // Mark seat as booked
        bookedSeats.push(availableSeats[i].number); // Add seat number to bookedSeats
      }
      remainingSeats -= seatsToBook; // Decrement remaining seats to book
      if (remainingSeats === 0) {
        break; // Exit if all seats are booked
      }
    }

    // Check if all requested seats were booked
    if (bookedSeats.length === numSeats) {
      return bookedSeats; // Return the booked seat numbers
    }

    // If not enough seats were available, revert the booking changes
    bookedSeats.forEach((seatNumber) => {
      const seat = this.seats.find((s) => s.number === seatNumber);
      if (seat) {
        seat.isBooked = false; // Mark seat as unbooked
      }
    });

    return []; // Return an empty array to indicate failure to book all requested seats
  }

  // Private method to get rows of seats as a 2D array
  private getRows(): Seat[][] {
    const rows: Seat[][] = []; // Array to hold rows of seats
    for (let i = 0; i < 11; i++) {
      if (i < 10) {
        // For the first 10 rows (0-9), slice 7 seats each
        rows.push(this.seats.slice(i * 7, (i + 1) * 7));
      } else {
        // For the last row, take the remaining seats (70-72)
        rows.push(this.seats.slice(70));
      }
    }
    return rows; // Return the 2D array of seat rows
  }
}
