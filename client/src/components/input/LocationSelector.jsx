// src/components/input/LocationSelector.jsx
import React, { useState } from 'react';
import MapInterface from './MapInterface';
import SearchLocation from './SearchLocation';
import CoordinateInput from './CoordinateInput';

function LocationSelector({ location, onLocationChange }) {
  const [inputMethod, setInputMethod] = useState('map');

  const handleLocationSelect = (newLocation) => {
    onLocationChange(newLocation);
  };

  const handleMethodChange = (method) => {
    setInputMethod(method);
  };

  const methods = [
    { id: 'map', name: '🗺️ Map Pin', description: 'Click on map' },
    { id: 'search', name: '🔍 Search', description: 'Find by name' },
    { id: 'coordinates', name: '📐 Coordinates', description: 'Enter lat/lng' }
  ];

  return (
    <div className="location-selector">
      <h3>📍 Select Location</h3>
      
      <div className="input-methods">
        {methods.map(method => (
          <button
            key={method.id}
            className={`method-btn ${inputMethod === method.id ? 'active' : ''}`}
            onClick={() => handleMethodChange(method.id)}
            title={method.description}
          >
            {method.name}
          </button>
        ))}
      </div>
      
      <div className="method-content">
        {inputMethod === 'map' && (
          <MapInterface 
            onLocationSelect={handleLocationSelect}
            currentLocation={location}
          />
        )}
        
        {inputMethod === 'search' && (
          <SearchLocation onLocationSelect={handleLocationSelect} />
        )}
        
        {inputMethod === 'coordinates' && (
          <CoordinateInput onLocationSelect={handleLocationSelect} />
        )}
      </div>
      
      {location && (
        <div className="selected-location" style={{
          marginTop: '15px',
          padding: '10px',
          background: '#e8f5e8',
          border: '1px solid #4caf50',
          borderRadius: '4px',
          fontSize: '0.9em'
        }}>
          <strong>✅ Location Selected:</strong><br />
          📍 {location.name}<br />
          {location.lat && location.lng && (
            <span>📐 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default LocationSelector;