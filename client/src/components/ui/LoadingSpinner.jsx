import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading climate data from NASA...</p>
    </div>
  );
}

export default LoadingSpinner;