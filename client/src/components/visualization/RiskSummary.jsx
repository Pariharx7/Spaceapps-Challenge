import React from 'react';

function RiskSummary({ data, location, date }) {
  if (!data) return null;

  return (
    <div className="risk-summary" style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>📍 {location?.name} | 📅 {date}</h3>
      <div style={{ marginTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>🌡️ Temperature:</span>
          <strong>68% chance &gt; 90°F</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>🌧️ Precipitation:</span>
          <strong>25% chance of rain</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>💨 Wind Speed:</span>
          <strong>45% chance &gt; 15 mph</strong>
        </div>
      </div>
      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: '#e8f4fd',
        borderRadius: '4px'
      }}>
        <strong>Overall:</strong> High heat risk, good outdoor conditions
      </div>
    </div>
  );
}

export default RiskSummary;