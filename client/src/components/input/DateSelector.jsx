import React from 'react';

function DateSelector({ selectedDate, onDateChange }) {
  return (
    <div className="date-selector">
      <h3>📅 Select Date</h3>
      <p>Choose day of year (month and day)</p>
      <input
        type="date"
        value={`2024-${selectedDate}`} // Using 2024 as placeholder year
        onChange={(e) => {
          const date = new Date(e.target.value);
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          onDateChange(`${month}-${day}`);
        }}
        style={{ width: '100%', padding: '8px', marginTop: '10px' }}
      />
      <p style={{ marginTop: '5px', fontSize: '0.9em', color: '#666' }}>
        Selected: {selectedDate}
      </p>
    </div>
  );
}

export default DateSelector;