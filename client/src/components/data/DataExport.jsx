import React from 'react';

function DataExport({ data, location, date, parameters }) {
  const handleExport = (format) => {
    alert(`Exporting data as ${format} format!\nThis would download your climate data.`);
  };

  return (
    <div className="data-export" style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>📥 Export Data</h3>
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
        <button 
          onClick={() => handleExport('CSV')}
          style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', background: '#28a745', color: 'white', cursor: 'pointer' }}
        >
          Download CSV
        </button>
        <button 
          onClick={() => handleExport('JSON')}
          style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', background: '#17a2b8', color: 'white', cursor: 'pointer' }}
        >
          Download JSON
        </button>
        <button 
          onClick={() => handleExport('PDF')}
          style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', background: '#dc3545', color: 'white', cursor: 'pointer' }}
        >
          Generate PDF
        </button>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input type="checkbox" defaultChecked /> Include raw historical data
        </label>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          <input type="checkbox" defaultChecked /> Include probability calculations
        </label>
        <label style={{ display: 'block' }}>
          <input type="checkbox" /> Include visualization charts
        </label>
      </div>
    </div>
  );
}

export default DataExport;