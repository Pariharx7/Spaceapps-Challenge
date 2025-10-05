import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page px-4 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="hero-section text-center mb-20">
        <h1 className="text-4xl font-bold text-white-700 mb-4">ClimateRisk Dashboard</h1>
        <p className="text-lg text-gray-400 !mb-4">
          Personalized weather probability analysis using NASA Earth observation data
        </p>
        <button
          className="bg-white my-4 text-blue-600 !px-5 !py-4 rounded-md text-base font-semibold hover:bg-gray-400 transition"
          onClick={() => navigate('/dashboard')}
        >
          Launch Dashboard
        </button>
      </section>

      {/* Features Section */}
      <section className="features-section mb-20">
        <h2 className="text-3xl font-semibold text-center !mb-10">What You Can Analyze</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="🌡️"
            title="Temperature Probability"
            description="Likelihood of extreme heat or cold conditions based on historical data"
          />
          <FeatureCard
            icon="🌧️"
            title="Precipitation Forecast"
            description="Rain and snow probability analysis for any location and date"
          />
          <FeatureCard
            icon="💨"
            title="Wind Speed Analysis"
            description="Probability of windy conditions exceeding your thresholds"
          />
          <FeatureCard
            icon="📊"
            title="Data Export"
            description="Download customized climate reports in multiple formats"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="text-3xl font-semibold text-center !my-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<div className="text-5xl font-extrabold text-blue-600">1</div>}
            title="Select Location"
            description="Use map, search, or coordinates to choose your area"
          />
          <FeatureCard
            icon={<div className="text-5xl font-extrabold text-blue-600">2</div>}
            title="Choose Parameters"
            description="Select weather variables and set your thresholds"
          />
          <FeatureCard
            icon={<div className="text-5xl font-extrabold text-blue-600">3</div>}
            title="Get Analysis"
            description="Receive probability charts and risk assessments"
          />
          <FeatureCard
            icon={<div className="text-5xl font-extrabold text-blue-600">4</div>}
            title="Export Data"
            description="Download your customized climate report"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl !p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;
