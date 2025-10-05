import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page px-4 py-12 max-w-full mx-auto">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-8 rounded-xl shadow-lg max-w-7xl mx-auto mb-20">
        <div className="hero-content text-center">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            ClimateRisk Dashboard
          </h1>
          <p className="text-xl max-w-xl mx-auto mb-8 drop-shadow-md">
            Personalized weather probability analysis using NASA Earth observation data
          </p>
          <button
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            onClick={() => navigate('/dashboard')}
          >
            Launch Dashboard
          </button>
        </div>
      </section>


      {/* Features Section */}
      <section className="features-section mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">What You Can Analyze</h2>
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
        <h2 className="text-3xl font-semibold text-center mb-10">How It Works</h2>
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
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;
