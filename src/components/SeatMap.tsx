import React from 'react';
import { Seat } from '../lib/Train'; // Importing the Seat type from the Train module

// Define the props interface for the SeatMap component
interface SeatMapProps {
  // seats prop is an array of Seat objects
  seats: Seat[];
}

// Functional component for SeatMap
const SeatMap: React.FC<SeatMapProps> = ({ seats }) => {
  // Function to get a range of seats from the seats array based on start and end indices
  const getRowSeats = (start: number, end: number) => seats.slice(start, end);

  return (
    <div className="mt-6"> {/* Main container for the seat map */}
      <h2 className="text-xl font-semibold mb-4">Seat Map</h2> {/* Header for the seat map */}
      <div className="grid grid-cols-7 gap-2"> {/* Grid layout for the seats */}
        {/* Create 11 rows of seats */}
        {[...Array(11)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}> {/* Using React.Fragment to group rows without adding extra nodes */}
            {rowIndex < 10 // For the first 10 rows
              ? getRowSeats(rowIndex * 7, (rowIndex + 1) * 7).map((seat) => (
                  <div
                    key={seat.number} // Unique key for each seat
                    className={`p-2 text-center rounded ${
                      seat.isBooked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`} // Conditional styling based on whether the seat is booked
                  >
                    {seat.number} {/* Display the seat number */}
                  </div>
                ))
              : getRowSeats(70, 73).map((seat) => ( // For the last row (seats 70-72)
                  <div
                    key={seat.number} // Unique key for each seat
                    className={`p-2 text-center rounded ${
                      seat.isBooked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`} // Conditional styling based on whether the seat is booked
                  >
                    {seat.number} {/* Display the seat number */}
                  </div>
                ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Export the SeatMap component for use in other parts of the application
export default SeatMap;
