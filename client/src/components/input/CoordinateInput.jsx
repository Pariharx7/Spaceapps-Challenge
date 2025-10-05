import React, { useState } from 'react';

function CoordinateInput({ onLocationSelect }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = () => {
    if (lat && lng) {
      onLocationSelect({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        name: `Coordinates: ${lat}, ${lng}`
      });
    }
  };

  return (
    <div className="coordinate-input">
      <div style={{ marginBottom: '10px' }}>
        <label>Latitude: </label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="40.7128"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Longitude: </label>
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="-74.0060"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button 
        onClick={handleSubmit}
        style={{ width: '100%', padding: '8px' }}
      >
        Use Coordinates
      </button>
    </div>
  );
}

export default CoordinateInput;