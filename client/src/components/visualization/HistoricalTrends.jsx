import React from 'react';

function HistoricalTrends({ data, location }) {
  return (
    <div className="historical-trends" style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4>📈 Historical Trends (1980-2020)</h4>
      <p style={{ marginTop: '10px', color: '#666' }}>
        Historical data analysis would appear here with interactive charts.
      </p>
      <div style={{
        height: '200px',
        background: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        marginTop: '15px',
        border: '2px dashed #dee2e6'
      }}>
        Historical Trends Chart Area
      </div>
    </div>
  );
}

export default HistoricalTrends;