// src/context/ClimateDataContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ClimateDataContext = createContext();

export function ClimateDataProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState('07-15');
  const [parameters, setParameters] = useState(['temperature']);
  const [climateData, setClimateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from NASA APIs
  const fetchClimateData = async (location, date, params) => {
    setLoading(true);
    setError(null);
    
    try {
      // SIMULATE API DELAY - remove this when you have real backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // MOCK DATA - replace this with real API call later
      const mockData = generateMockClimateData(location, date, params);
      setClimateData(mockData);
      
      // UNCOMMENT THIS WHEN YOU HAVE REAL BACKEND:
      /*
      const response = await fetch('/api/climate-probability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
          date: date,
          parameters: params
        })
      });
      
      if (!response.ok) throw new Error('Failed to fetch climate data');
      
      const data = await response.json();
      setClimateData(data);
      */
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching climate data:', err);
      
      // Even on error, provide mock data for demo
      const mockData = generateMockClimateData(location, date, params);
      setClimateData(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate realistic mock data
  const generateMockClimateData = (location, date, params) => {
    const data = {};
    const baseProb = Math.floor(Math.random() * 40) + 30; // 30-70% base probability
    
    if (params.includes('temperature')) {
      data.temperature = {
        probability: baseProb + 10, // 40-80%
        range: { min: 65, max: 105 },
        average: 85,
        threshold: 90,
        historicalDistribution: Array.from({ length: 40 }, (_, i) => ({
          year: 1980 + i,
          value: 75 + Math.random() * 25
        }))
      };
    }
    
    if (params.includes('precipitation')) {
      data.precipitation = {
        probability: baseProb - 15, // 15-55%
        range: { min: 0, max: 2.8 },
        average: 0.15,
        threshold: 0.1,
        historicalDistribution: Array.from({ length: 40 }, (_, i) => ({
          year: 1980 + i,
          value: Math.random() * 2
        }))
      };
    }
    
    if (params.includes('windspeed')) {
      data.windspeed = {
        probability: baseProb - 5, // 25-65%
        range: { min: 3, max: 28 },
        average: 8.5,
        threshold: 15,
        historicalDistribution: Array.from({ length: 40 }, (_, i) => ({
          year: 1980 + i,
          value: 5 + Math.random() * 15
        }))
      };
    }
    
    if (params.includes('airquality')) {
      data.airquality = {
        probability: baseProb - 20, // 10-50%
        range: { min: 20, max: 180 },
        average: 75,
        threshold: 100,
        historicalDistribution: Array.from({ length: 40 }, (_, i) => ({
          year: 1980 + i,
          value: 50 + Math.random() * 80
        }))
      };
    }
    
    data.historicalTrends = {
      location: location?.name || 'Selected Location',
      period: '1980-2020',
      totalYears: 40
    };
    
    return data;
  };

  const value = {
    location,
    setLocation,
    selectedDate,
    setSelectedDate,
    parameters,
    setParameters,
    climateData,
    loading,
    error,
    fetchClimateData
  };

  return (
    <ClimateDataContext.Provider value={value}>
      {children}
    </ClimateDataContext.Provider>
  );
}

// Custom hook to use the context
export function useClimateData() {
  const context = useContext(ClimateDataContext);
  if (!context) {
    throw new Error('useClimateData must be used within ClimateDataProvider');
  }
  return context;
}