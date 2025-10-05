// src/pages/DashboardPage.jsx
import React, { Component } from 'react';
import { useClimateData } from '../context/ClimateDataContext';
import LocationSelector from '../components/input/LocationSelector';
import DateSelector from '../components/input/DateSelector';
import ParameterSelector from '../components/input/ParameterSelector';
import RiskSummary from '../components/visualization/RiskSummary';
import ProbabilityCharts from '../components/visualization/ProbabilityCharts';
import HistoricalTrends from '../components/visualization/HistoricalTrends';
import DataExport from '../components/data/DataExport';

// ErrorBoundary component for catching render errors in child components
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`Error in component ${this.props.fallbackName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 bg-red-100 border border-red-600 rounded mb-4 text-red-700 font-semibold">
          Component {this.props.fallbackName} failed to load. Please check the import.
        </div>
      );
    }
    return this.props.children;
  }
}

const SafeComponent = ({ component: Component, fallbackName, ...props }) => (
  <ErrorBoundary fallbackName={fallbackName}>
    <Component {...props} />
  </ErrorBoundary>
);

function DashboardPage() {
  const {
    location,
    selectedDate,
    parameters,
    climateData,
    loading,
    error,
    fetchClimateData,
    setLocation,
    setSelectedDate,
    setParameters,
  } = useClimateData();

  const handleAnalyze = () => {
    if (location) {
      fetchClimateData(location, selectedDate, parameters);
    }
  };

  return (
    <div className="dashboard-page min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="dashboard-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Input Sidebar */}
        <aside className="input-sidebar md:w-80 bg-white p-6 rounded-lg shadow-md flex-shrink-0">
          <SafeComponent
            component={LocationSelector}
            fallbackName="LocationSelector"
            location={location}
            onLocationChange={setLocation}
          />

          <SafeComponent
            component={DateSelector}
            fallbackName="DateSelector"
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            className="mt-6"
          />

          <SafeComponent
            component={ParameterSelector}
            fallbackName="ParameterSelector"
            selectedParams={parameters}
            onParamsChange={setParameters}
            className="mt-6"
          />

          <button
            className={`mt-6 w-full py-3 rounded-lg text-white text-lg font-semibold transition-colors ${
              !location || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleAnalyze}
            disabled={!location || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Climate Probability'}
          </button>
        </aside>

        {/* Main Visualization Area */}
        <main className="visualization-area flex-grow bg-white p-6 rounded-lg shadow-md min-w-0">
          {error && (
            <div className="p-4 mb-6 bg-red-100 border border-red-600 rounded text-red-700 font-semibold">
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="mx-auto mb-5 w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-700 text-lg">Loading climate data from NASA...</p>
            </div>
          )}

          {!climateData && !loading && <WelcomeMessage />}

          {climateData && !loading && (
            <>
              <SafeComponent
                component={RiskSummary}
                fallbackName="RiskSummary"
                data={climateData}
                location={location}
                date={selectedDate}
              />

              <div className="charts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {parameters.map((param) => (
                  <SafeComponent
                    key={param}
                    component={ProbabilityCharts}
                    fallbackName="ProbabilityCharts"
                    parameter={param}
                    data={{ parameters: climateData }}
                  />
                ))}
              </div>

              <SafeComponent
                component={HistoricalTrends}
                fallbackName="HistoricalTrends"
                data={climateData.historicalTrends}
                location={location}
              />

              <SafeComponent
                component={DataExport}
                fallbackName="DataExport"
                data={climateData}
                location={location}
                date={selectedDate}
                parameters={parameters}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="welcome-message text-center p-12 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Welcome to ClimateRisk Dashboard</h2>
      <p className="text-gray-600 text-lg mb-10">
        Select a location and parameters to analyze climate probabilities
      </p>
      <div className="welcome-steps grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="step p-6 bg-blue-100 rounded-lg">
          <div className="text-4xl font-bold mb-3">1</div>
          <h3 className="text-xl font-semibold mb-1">Choose Location</h3>
          <p className="text-gray-700">Use map, search, or coordinates</p>
        </div>
        <div className="step p-6 bg-blue-100 rounded-lg">
          <div className="text-4xl font-bold mb-3">2</div>
          <h3 className="text-xl font-semibold mb-1">Select Parameters</h3>
          <p className="text-gray-700">Pick weather variables to analyze</p>
        </div>
        <div className="step p-6 bg-blue-100 rounded-lg">
          <div className="text-4xl font-bold mb-3">3</div>
          <h3 className="text-xl font-semibold mb-1">Get Analysis</h3>
          <p className="text-gray-700">View probability charts</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
