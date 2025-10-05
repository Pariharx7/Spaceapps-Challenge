import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Map, Marker } from "pigeon-maps";

// --- CONFIGURATION ---
const API_BASE_URL = 'https://spaceapps-challenge-flax.vercel.app/api/weather/likelihood';

const TOP_CITIES = [
  { name: 'Jammu', coords: [32.72, 74.87] },
  { name: 'Mumbai', coords: [19.07, 72.87] },
  { name: 'Delhi', coords: [28.70, 77.10] },
  { name: 'New York, USA', coords: [40.71, -74.00] },
  { name: 'Los Angeles, USA', coords: [34.05, -118.24] },
  { name: 'London, UK', coords: [51.50, -0.12] },
];

// --- HELPER FUNCTIONS ---
const dateToDayOfYear = (dateString) => {
  const date = new Date(dateString);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const getRiskIcon = (key) => {
  const icons = {
    very_hot: '🥵', very_cold: '🥶', very_wet: '💧',
    very_windy: '💨', uncomfortable: '😩',
  };
  return icons[key] || '📊';
};


// --- UI COMPONENTS ---
const Loader = () => (
  <div className="flex flex-col items-center justify-center h-full py-10">
    <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent"></div>
    <p className="mt-4 text-gray-600">Analyzing NASA Data...</p>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
    <strong>Error:</strong> {message}
  </div>
);

const ResultsDisplay = ({ data }) => {
  if (data.message) {
    return <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">{data.message}</div>;
  }

  return (
    <div className="animate-fade-in space-y-3">
      <p className="text-sm text-gray-600 pb-2">
        Analysis based on <strong>{data.analysis.total_historical_days_analyzed}</strong> historical records for day <strong>{data.query.day_of_year}</strong>.
      </p>
      {Object.entries(data.analysis.likelihoods).map(([key, value]) => (
        <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-3">{getRiskIcon(key)}</span>
            <h3 className="text-lg font-semibold text-gray-800">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{value.description}</p>
          <div title={`${(value.probability * 100).toFixed(0)}% Chance`} className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value.probability * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
function DashboardPage() {
  const [location, setLocation] = useState(TOP_CITIES[0].coords);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCity, setSelectedCity] = useState(JSON.stringify(TOP_CITIES[0].coords));
  
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiData = useCallback(async () => {
    if (!location) return;
    setIsLoading(true);
    setError(null);

    const [lat, lng] = location;
    const dayOfYear = dateToDayOfYear(date);
    const url = `${API_BASE_URL}?lat=${lat}&lon=${lng}&day_of_year=${dayOfYear}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'An unknown error occurred.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [location, date]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchApiData();
    }, 500); // Debounce API calls
    return () => clearTimeout(handler);
  }, [fetchApiData]);

  const handleCityChange = (e) => {
    const coords = JSON.parse(e.target.value);
    setSelectedCity(e.target.value);
    setLocation(coords);
  };

  const handleMapClick = ({ latLng }) => {
    setSelectedCity(''); // Deselect city dropdown
    setLocation([parseFloat(latLng[0].toFixed(4)), parseFloat(latLng[1].toFixed(4))]);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Climate Risk Dashboard</h1>
          <p className="text-md md:text-lg text-gray-600 mt-2">Analyze adverse weather likelihood using historical NASA data</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Controls Column */}
          <aside className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-600 block mb-1">Top Cities</label>
                <select value={selectedCity} onChange={handleCityChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  {TOP_CITIES.map(city => (
                    <option key={city.name} value={JSON.stringify(city.coords)}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium text-gray-600 block mb-1">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6 h-80 w-full rounded-lg overflow-hidden border border-gray-200">
              <Map center={location} zoom={5} onClick={handleMapClick}>
                <Marker width={40} anchor={location} color="#1d4ed8" />
              </Map>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Click on the map to select a custom location</p>
          </aside>

          {/* Results Column */}
          <section className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Analysis Results</h2>
            {isLoading && <Loader />}
            {error && !isLoading && <ErrorDisplay message={error} />}
            {weatherData && !isLoading && <ResultsDisplay data={weatherData} />}
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;

