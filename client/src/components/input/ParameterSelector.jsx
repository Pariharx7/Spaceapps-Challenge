// src/components/input/ParameterSelector.jsx
import React from 'react';
import { useClimateData } from '../../context/ClimateDataContext';

function ParameterSelector({ selectedParams, onParamsChange }) {
  const { setParameters } = useClimateData();
  
  const parameters = [
    { 
      id: 'temperature', 
      name: 'Temperature', 
      icon: '🌡️',
      unit: '°F', 
      defaultThreshold: 90,
      description: 'Probability of extreme heat or cold'
    },
    { 
      id: 'precipitation', 
      name: 'Precipitation', 
      icon: '🌧️',
      unit: 'inches', 
      defaultThreshold: 0.1,
      description: 'Chance of rainfall'
    },
    { 
      id: 'windspeed', 
      name: 'Wind Speed', 
      icon: '💨',
      unit: 'mph', 
      defaultThreshold: 15,
      description: 'Likelihood of windy conditions'
    },
    { 
      id: 'airquality', 
      name: 'Air Qualityxx', 
      icon: '🌫️',
      unit: 'AQI', 
      defaultThreshold: 100,
      description: 'Probability of poor air quality'
    }
  ];

  const toggleParameter = (paramId) => {
    const newParams = selectedParams.includes(paramId)
      ? selectedParams.filter(p => p !== paramId)
      : [...selectedParams, paramId];
    onParamsChange(newParams);
    setParameters(newParams);
  };

  const updateThreshold = (paramId, threshold) => {
    // This would update thresholds in context
    console.log(`Update ${paramId} threshold to ${threshold}`);
  };

  return (
    <div className="parameter-selector">
      <h3>📊 Weather Parameters</h3>
      <p className="selector-description">Choose parameters to analyze</p>
      
      <div className="parameters-list">
        {parameters.map(param => (
          <div 
            key={param.id} 
            className={`parameter-item ${selectedParams.includes(param.id) ? 'selected' : ''}`}
            onClick={() => toggleParameter(param.id)}
          >
            <div className="parameter-header">
              <span className="parameter-icon">{param.icon}</span>
              <div className="parameter-info">
                <span className="parameter-name">{param.name}</span>
                <span className="parameter-desc">{param.description}</span>
              </div>
              <input
                type="checkbox"
                checked={selectedParams.includes(param.id)}
                onChange={() => toggleParameter(param.id)}
                className="parameter-checkbox"
              />
            </div>
            
            {selectedParams.includes(param.id) && (
              <div className="threshold-setting">
                <label>Alert threshold:</label>
                <div className="threshold-input">
                  <input 
                    type="number" 
                    defaultValue={param.defaultThreshold}
                    onChange={(e) => updateThreshold(param.id, e.target.value)}
                    placeholder={param.defaultThreshold}
                  />
                  <span className="unit">{param.unit}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParameterSelector;