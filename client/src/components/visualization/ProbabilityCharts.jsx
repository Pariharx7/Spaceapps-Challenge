// src/components/visualization/ProbabilityCharts.jsx
import React from 'react';

function ProbabilityCharts({ data, parameter }) {
  if (!data || !data.parameters || !data.parameters[parameter]) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'center',
        color: '#666'
      }}>
        No data available for {parameter}
      </div>
    );
  }

  const paramData = data.parameters[parameter];
  const probability = paramData.probability;

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h4 style={{ 
        marginBottom: '15px', 
        color: '#2C3E50',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {getParameterIcon(parameter)} {parameter.charAt(0).toUpperCase() + parameter.slice(1)} Probability
      </h4>

      {/* Probability Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.9em',
          color: '#666'
        }}>
          <span>Probability of exceeding threshold</span>
          <span style={{ 
            fontWeight: 'bold', 
            color: getProbabilityColor(probability),
            fontSize: '1.1em'
          }}>
            {probability}%
          </span>
        </div>
        <div style={{
          height: '25px',
          background: '#e9ecef',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${probability}%`,
            background: getProbabilityColor(probability),
            borderRadius: '12px',
            transition: 'width 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '10px',
            color: 'white',
            fontSize: '0.8em',
            fontWeight: 'bold'
          }}>
            {probability}%
          </div>
        </div>
      </div>

      {/* Historical Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '4px' }}>Average</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            {paramData.historicalData.mean}{getParameterUnit(parameter)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '4px' }}>Range</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            {paramData.historicalData.min}-{paramData.historicalData.max}{getParameterUnit(parameter)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8em', color: '#666', marginBottom: '4px' }}>Trend</div>
          <div style={{ 
            fontWeight: 'bold', 
            fontSize: '1.1em',
            color: getTrendColor(paramData.trend)
          }}>
            {paramData.trend} ↗
          </div>
        </div>
      </div>

      {/* Confidence Level */}
      <div style={{
        padding: '10px',
        background: '#e8f4fd',
        borderRadius: '6px',
        fontSize: '0.85em',
        textAlign: 'center'
      }}>
        <strong>Confidence Level:</strong> {Math.round(paramData.confidence * 100)}% 
        <span style={{ color: '#666', marginLeft: '8px' }}>
          (based on {data.analysis.totalYears} years of NASA data)
        </span>
      </div>
    </div>
  );
}

// Helper functions
const getParameterIcon = (parameter) => {
  const icons = {
    temperature: '🌡️',
    precipitation: '🌧️',
    windspeed: '💨',
    airquality: '🌫️'
  };
  return icons[parameter] || '📊';
};

const getParameterUnit = (parameter) => {
  const units = {
    temperature: '°F',
    precipitation: ' inches',
    windspeed: ' mph',
    airquality: ' AQI'
  };
  return units[parameter] || '';
};

const getProbabilityColor = (probability) => {
  if (probability < 30) return '#28a745'; // Green
  if (probability < 60) return '#ffc107'; // Yellow
  if (probability < 80) return '#fd7e14'; // Orange
  return '#dc3545'; // Red
};

const getTrendColor = (trend) => {
  const colors = {
    increasing: '#dc3545',
    decreasing: '#28a745',
    stable: '#6c757d',
    variable: '#ffc107'
  };
  return colors[trend] || '#6c757d';
};

export default ProbabilityCharts;