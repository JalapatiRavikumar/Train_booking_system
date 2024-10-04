import React, { useState } from 'react';

// Define the props interface for the BookingForm component
interface BookingFormProps {
  // onBook function is passed as a prop, which takes a number representing the number of seats booked
  onBook: (numSeats: number) => void;
}

// Functional component for BookingForm
const BookingForm: React.FC<BookingFormProps> = ({ onBook }) => {
  // State to hold the number of seats, initialized to 1
  const [numSeats, setNumSeats] = useState<number>(1);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the onBook function passed from the parent component with the current number of seats
    onBook(numSeats);
  };

  return (
    // Form element with an onSubmit handler to process the form
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        {/* Label for the number of seats input */}
        <label htmlFor="numSeats" className="mr-4">
          Number of seats:
        </label>
        {/* Input field for number of seats */}
        <input
          type="number" // Input type is number to allow numeric input
          id="numSeats" // Unique identifier for the input field
          min="1" // Minimum value for the input
          max="7" // Maximum value for the input
          value={numSeats} // Controlled component, value is managed by state
          // Update state when input value changes
          onChange={(e) => setNumSeats(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-16 mr-4" // Styling for the input
        />
        {/* Submit button to book the seats */}
        <button
          type="submit" // Specifies that this button submits the form
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" // Button styling
        >
          Book Seats
        </button>
      </div>
    </form>
  );
};

// Export the BookingForm component for use in other parts of the application
export default BookingForm;
