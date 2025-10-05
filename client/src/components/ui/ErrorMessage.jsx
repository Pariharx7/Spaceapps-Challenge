import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <strong>Error:</strong> {message}
    </div>
  );
}

export default ErrorMessage;