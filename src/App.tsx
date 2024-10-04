import React, { useState, useEffect } from 'react';
import SeatMap from './components/SeatMap'; // Import the SeatMap component
import BookingForm from './components/BookingForm'; // Import the BookingForm component
import { Train } from './lib/Train'; // Import the Train class

// Main functional component for the application
const App: React.FC = () => {
  // State to hold the Train instance
  const [train, setTrain] = useState<Train>(new Train());

  // useEffect to simulate pre-booked seats on component mount
  useEffect(() => {
    // Simulate booking some seats
    train.bookSeats(5); // Book 5 seats
    train.bookSeats(3); // Book another 3 seats
    train.bookSeats(2); // Book another 2 seats
    // Update the train state with a new Train instance to reflect the changes
    setTrain(new Train(train));
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle booking seats
  const handleBooking = (numSeats: number) => {
    // Attempt to book the specified number of seats
    const bookedSeats = train.bookSeats(numSeats);
    if (bookedSeats.length > 0) {
      // If seats were successfully booked, show an alert with the seat numbers
      alert(`Seats booked: ${bookedSeats.join(', ')}`);
      // Update the train state to reflect the new bookings
      setTrain(new Train(train));
    } else {
      // If booking fails, show an alert indicating insufficient seats
      alert('Not enough seats available');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Main title of the application */}
      <h1 className="text-3xl font-bold mb-6">Train Seat Reservation System</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        {/* Booking form for seat reservation */}
        <BookingForm onBook={handleBooking} />
        {/* Seat map to visualize seat availability */}
        <SeatMap seats={train.seats} />
      </div>
    </div>
  );
};

// Export the App component for use in the application
export default App;
