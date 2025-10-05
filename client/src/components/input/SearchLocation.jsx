// src/components/input/SearchLocation.jsx
import React, { useState } from 'react';

function SearchLocation({ onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  // Common cities with coordinates
  const commonCities = [
    { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 },
    { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729 }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setSearching(true);
    
    try {
      // Try to find in common cities first
      const foundCity = commonCities.find(city => 
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (foundCity) {
        onLocationSelect(foundCity);
        setSearching(false);
        return;
      }
      
      // Use OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        onLocationSelect({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          name: result.display_name
        });
      } else {
        alert('Location not found. Try a more specific search.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleQuickSelect = (city) => {
    setQuery(city.name);
    onLocationSelect(city);
  };

  return (
    <div className="search-location">
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search for a city or address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ 
            width: '100%', 
            padding: '10px', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1em'
          }}
        />
      </div>
      
      <button 
        onClick={handleSearch}
        disabled={searching}
        style={{ 
          width: '100%', 
          padding: '10px', 
          background: searching ? '#ccc' : '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1em',
          cursor: searching ? 'not-allowed' : 'pointer'
        }}
      >
        {searching ? 'Searching...' : 'Search Location'}
      </button>

      <div style={{ marginTop: '15px' }}>
        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
          Or quick select:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {commonCities.map(city => (
            <button
              key={city.name}
              onClick={() => handleQuickSelect(city)}
              style={{
                padding: '8px',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em',
                textAlign: 'left'
              }}
            >
              📍 {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchLocation;