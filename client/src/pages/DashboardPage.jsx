import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
// The 'pigeon-maps' library could not be resolved. We will use vanilla Leaflet instead.
// IMPORTANT: For this to work, you MUST add these 2 lines to the <head> of your public/index.html file:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

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

// Available parameters for user selection, including metadata for UI
const AVAILABLE_PARAMETERS = [
    { id: 'very_hot', name: 'Very Hot', icon: '🥵' },
    { id: 'very_cold', name: 'Very Cold', icon: '🥶' },
    { id: 'very_wet', name: 'Very Wet', icon: '💧' },
    { id: 'very_windy', name: 'Very Windy', icon: '💨' },
    { id: 'uncomfortable', name: 'Uncomfortable', icon: '😩' },
];

// --- HELPER FUNCTIONS ---
const dateToDayOfYear = (dateString) => {
  const date = new Date(dateString);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// --- DATA EXPORT HELPERS ---
const downloadJson = (data, location) => {
    const exportData = {
        metadata: {
            source: "NASA POWER Project via Climate Risk Dashboard",
            units: {
                temperature: "Celsius",
                precipitation: "mm/day",
                wind_speed: "m/s"
            },
            input_query: {
                latitude: location[0],
                longitude: location[1],
                day_of_year: data.query.day_of_year,
            },
        },
        analysis_results: data.analysis,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `climate_risk_data_${location[0]}_${location[1]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const downloadCsv = (data, location) => {
    let csvContent = "parameter,probability,description\n";
    Object.entries(data.analysis.likelihoods).forEach(([key, value]) => {
        const description = value.description.replace(/"/g, '""'); // Escape double quotes for CSV
        csvContent += `${key},${value.probability},"${description}"\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `climate_risk_data_${location[0]}_${location[1]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- MAIN DASHBOARD COMPONENT ---
function DashboardPage() {
  const [location, setLocation] = useState(TOP_CITIES[0].coords);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedParams, setSelectedParams] = useState(AVAILABLE_PARAMETERS.map(p => p.id));
  
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for managing the Leaflet map instance
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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
        throw new Error('Network response failed. Please check your inputs and try again.');
      }
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [location, date]);
  
  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  // Effect to initialize the map, runs only once
  useEffect(() => {
    const initMap = () => {
        if (mapRef.current || !mapContainerRef.current) return;
        if (window.L) {
            mapRef.current = window.L.map(mapContainerRef.current).setView(location, 5);
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapRef.current);
            markerRef.current = window.L.marker(location).addTo(mapRef.current);
            mapRef.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setLocation([parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4))]);
            });
        } else {
            setTimeout(initMap, 100);
        }
    };
    initMap();
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []); // Empty dependency array ensures this runs only once

  // Effect to update map view when location state changes
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
        markerRef.current.setLatLng(location);
        mapRef.current.panTo(location);
    }
  }, [location]);

  const handleParamChange = (paramId) => {
    setSelectedParams(prev => 
        prev.includes(paramId) ? prev.filter(p => p !== paramId) : [...prev, paramId]
    );
  };
  
  const filteredLikelihoods = apiData?.analysis?.likelihoods
    ? Object.entries(apiData.analysis.likelihoods).filter(([key]) => selectedParams.includes(key))
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-screen-xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Advanced Climate Dashboard</h1>
            <p className="text-lg text-gray-600 mt-3 max-w-3xl mx-auto">Select a location, date, and desired parameters to analyze historical weather risks from NASA data.</p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls Column */}
            <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">Controls</h2>
              <div className="space-y-6">
                 <div>
                    <label className="font-semibold text-gray-700 block mb-2">Location</label>
                    <div ref={mapContainerRef} className="h-52 w-full rounded-lg overflow-hidden border border-gray-200" style={{ zIndex: 0 }}>
                        {/* Vanilla Leaflet map will be rendered here by the useEffect hook */}
                    </div>
                 </div>
                 <div>
                    <label className="font-semibold text-gray-700 block mb-2">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                 </div>
                 <div>
                    <label className="font-semibold text-gray-700 block mb-2">Weather Parameters</label>
                    <div className="grid grid-cols-2 gap-2">
                        {AVAILABLE_PARAMETERS.map(param => (
                            <label key={param.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                                <input type="checkbox" checked={selectedParams.includes(param.id)} onChange={() => handleParamChange(param.id)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                <span>{param.name}</span>
                            </label>
                        ))}
                    </div>
                 </div>
                 <button onClick={fetchApiData} disabled={isLoading} className="w-full p-3 mt-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">
                    {isLoading ? 'Analyzing...' : 'Re-Analyze'}
                 </button>
              </div>
            </aside>

            {/* Results Column */}
            <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Analysis & Visualizations</h2>
                {apiData && !apiData.message && !isLoading && (
                    <div className="flex space-x-2">
                        <button onClick={() => downloadJson(apiData, location)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Download JSON</button>
                        <button onClick={() => downloadCsv(apiData, location)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Download CSV</button>
                    </div>
                )}
              </div>

              {isLoading ? (
                <div className="text-center py-20"><div className="w-12 h-12 mx-auto rounded-full animate-spin border-4 border-solid border-indigo-500 border-t-transparent"></div></div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200">{error}</div>
              ) : apiData ? (
                apiData.message ? (
                    <div className="p-4 bg-amber-50 text-amber-800 rounded-xl">{apiData.message}</div>
                ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">Displaying <strong>{filteredLikelihoods.length} of {Object.keys(apiData.analysis.likelihoods).length}</strong> available metrics for <strong>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</strong>.</p>
                  {filteredLikelihoods.map(([key, value]) => {
                      const paramInfo = AVAILABLE_PARAMETERS.find(p => p.id === key);
                      return (
                          <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center mb-2">
                                <span className="text-2xl mr-3">{paramInfo?.icon}</span>
                                <h3 className="text-lg font-semibold text-gray-800">{paramInfo?.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{value.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3"><div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${value.probability * 100}%` }}></div></div>
                                <span className="font-semibold text-indigo-600">{(value.probability * 100).toFixed(0)}%</span>
                              </div>
                          </div>
                      );
                  })}
                  {filteredLikelihoods.length === 0 && <p className="text-center text-gray-500 py-8">Select one or more parameters to see the results.</p>}
                </div>
                )
              ) : null}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;

