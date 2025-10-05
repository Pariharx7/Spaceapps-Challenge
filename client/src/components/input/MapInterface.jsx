// src/components/input/MapInterface.jsx
import React, { useState, useRef, useEffect } from 'react';

function MapInterface({ onLocationSelect, currentLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapInitializedRef = useRef(false); // Use ref instead of state

  // Initialize OpenStreetMap with Leaflet
  useEffect(() => {
    // Early return if already initialized or no container
    if (mapInitializedRef.current || !mapRef.current) {
      return;
    }

    const loadLeaflet = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix for default markers
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Check if container already has a map
        if (mapRef.current._leaflet_id) {
          console.log('Map container already has a map, skipping initialization');
          return;
        }

        const initialCenter = currentLocation 
          ? [currentLocation.lat, currentLocation.lng] 
          : [20, 0];
        
        const initialZoom = currentLocation ? 10 : 2;

        // Create the map
        const leafletMap = L.map(mapRef.current).setView(initialCenter, initialZoom);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(leafletMap);

        // Add click event
        leafletMap.on('click', (e) => {
          handleMapClick(e.latlng, L, leafletMap);
        });

        // Add existing marker if location exists
        if (currentLocation) {
          const existingMarker = L.marker([currentLocation.lat, currentLocation.lng])
            .addTo(leafletMap)
            .bindPopup(currentLocation.name);
          setMarker(existingMarker);
        }

        setMap(leafletMap);
        mapInitializedRef.current = true; // Mark as initialized
        
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    loadLeaflet();

    // Cleanup function - only remove if we created the map
    return () => {
      if (map && mapInitializedRef.current) {
        try {
          map.remove();
          mapInitializedRef.current = false;
        } catch (error) {
          console.log('Cleanup error (can be ignored):', error);
        }
      }
    };
  }, [currentLocation]); // Remove map from dependencies

  const handleMapClick = async (latlng, L, mapInstance) => {
    const lat = latlng.lat;
    const lng = latlng.lng;

    // Remove existing marker
    if (marker) {
      mapInstance.removeLayer(marker);
    }

    // Add new marker
    const newMarker = L.marker([lat, lng])
      .addTo(mapInstance)
      .bindPopup('Selected Location')
      .openPopup();

    setMarker(newMarker);

    // Get location name using OpenStreetMap Nominatim
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      const data = await response.json();
      
      let locationName = `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
      if (data && data.display_name) {
        locationName = data.display_name.split(',').slice(0, 3).join(',');
      }

      const locationData = {
        lat: lat,
        lng: lng,
        name: locationName
      };

      setSelectedLocation(locationData);
      onLocationSelect(locationData);
    } catch (error) {
      const locationData = {
        lat: lat,
        lng: lng,
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      };
      setSelectedLocation(locationData);
      onLocationSelect(locationData);
    }
  };

  const handleQuickSelect = (city) => {
    if (!map) return;

    const L = window.L;
    map.setView([city.lat, city.lng], 10);
    
    // Remove existing marker
    if (marker) {
      map.removeLayer(marker);
    }

    // Add new marker
    const newMarker = L.marker([city.lat, city.lng])
      .addTo(map)
      .bindPopup(city.name)
      .openPopup();

    setMarker(newMarker);

    const locationData = {
      lat: city.lat,
      lng: city.lng,
      name: city.name
    };

    setSelectedLocation(locationData);
    onLocationSelect(locationData);
  };

  // Popular cities for quick selection
  const popularCities = [
    { name: "New York, USA", lat: 40.7128, lng: -74.0060, emoji: "🗽" },
    { name: "London, UK", lat: 51.5074, lng: -0.1278, emoji: "🇬🇧" },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, emoji: "🗼" },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, emoji: "🦘" },
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, emoji: "🇮🇳" },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729, emoji: "💃" },
    { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, emoji: "🐫" },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, emoji: "🦁" }
  ];

  return (
    <div className="map-interface">
      <h4>🗺️ Interactive World Map</h4>
      <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>
        Click anywhere on the map to select a location • <strong>100% FREE</strong>
      </p>

      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          height: '400px',
          width: '100%',
          borderRadius: '12px',
          border: '3px solid #2C3E50',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      />

      {/* Quick Select Cities */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <h5 style={{ marginBottom: '12px', color: '#2C3E50' }}>🏙️ Quick Select Cities:</h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px'
        }}>
          {popularCities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleQuickSelect(city)}
              style={{
                padding: '12px',
                background: selectedLocation?.name === city.name ? '#4CAF50' : 'white',
                color: selectedLocation?.name === city.name ? 'white' : '#333',
                border: `2px solid ${selectedLocation?.name === city.name ? '#4CAF50' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9em',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '1.2em', marginBottom: '5px' }}>{city.emoji}</div>
              {city.name.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Map Instructions */}
      <div style={{
        padding: '12px',
        background: '#e3f2fd',
        borderRadius: '8px',
        fontSize: '0.85em',
        marginBottom: '15px'
      }}>
        <strong>🎮 Map Controls:</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
          <li><strong>Click</strong> anywhere on the map to select a location</li>
          <li><strong>Scroll</strong> to zoom in/out</li>
          <li><strong>Drag</strong> to pan around the map</li>
          <li><strong>Use quick select</strong> for popular cities</li>
        </ul>
      </div>

      {/* Free Service Notice */}
      <div style={{
        padding: '10px',
        background: '#d4edda',
        borderRadius: '6px',
        border: '1px solid #c3e6cb',
        fontSize: '0.8em',
        color: '#155724',
        textAlign: 'center',
        marginBottom: '15px'
      }}>
        <strong>🆓 100% Free Service:</strong> Powered by OpenStreetMap • No API Key Required • No Payments
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #E8F5E8, #C8E6C9)',
          borderRadius: '12px',
          border: '3px solid #4CAF50',
          boxShadow: '0 4px 20px rgba(76, 175, 80, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ fontSize: '2em', marginRight: '12px' }}>✅</span>
            <div>
              <div style={{ color: '#2E7D32', fontSize: '1.2em', fontWeight: 'bold' }}>
                Location Selected!
              </div>
              <div style={{ fontSize: '0.9em', color: '#555' }}>
                Ready for climate analysis
              </div>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ fontSize: '1.5em', marginRight: '10px' }}>📍</span>
              <div>
                <strong style={{ fontSize: '1.1em' }}>{selectedLocation.name}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', color: '#555' }}>
              <span style={{ marginRight: '8px' }}>📐</span>
              <strong>Coordinates:</strong> 
              <span style={{ marginLeft: '5px', fontFamily: 'monospace' }}>
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapInterface;