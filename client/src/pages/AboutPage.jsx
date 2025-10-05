import React from "react";

function AboutPage() {
  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-sky-50 !to-blue-100 !py-16 !px-6 !flex !justify-center">
      <div className="!max-w-4xl !bg-white !shadow-2xl !rounded-2xl !p-10 !space-y-12 !transition-all">
        
        {/* Title */}
        <div className="!text-center">
          <h1 className="!text-4xl md:!text-5xl !font-extrabold !text-sky-800">
            About <span className="!text-sky-500">ClimateRisk Dashboard</span>
          </h1>
          <p className="!mt-3 !text-gray-600 !text-lg">
            Harnessing NASA’s data to understand our planet’s changing climate.
          </p>
        </div>

        {/* NASA Data Sources */}
        <section className="!bg-gradient-to-r !from-sky-100 !to-sky-50 !p-6 !rounded-xl !shadow-md hover:!shadow-lg !transition !duration-300">
          <h2 className="!text-2xl !font-semibold !text-sky-700 !border-b-2 !border-sky-400 !inline-block !pb-1">
            NASA Data Sources
          </h2>
          <ul className="!list-disc !list-inside !mt-4 !space-y-2 !text-gray-700">
            <li><strong>NASA POWER</strong> — Temperature & Solar Data</li>
            <li><strong>GPM</strong> — Precipitation Measurements</li>
            <li><strong>MERRA-2</strong> — Wind Speed Analysis</li>
            <li><strong>MODIS</strong> — Air Quality Indicators</li>
          </ul>
        </section>

        {/* Methodology */}
        <section className="!bg-gradient-to-r !from-blue-100 !to-indigo-50 !p-6 !rounded-xl !shadow-md hover:!shadow-lg !transition !duration-300">
          <h2 className="!text-2xl !font-semibold !text-indigo-700 !border-b-2 !border-indigo-400 !inline-block !pb-1">
            Methodology
          </h2>
          <p className="!mt-4 !text-gray-700 !leading-relaxed">
            Our probability calculations are based on decades of NASA Earth observation data.
            We analyze long-term patterns, simulate future scenarios, and visualize climate
            risks to empower informed decisions for communities and policymakers.
          </p>
        </section>

        {/* Team */}
        <section className="!bg-gradient-to-r !from-emerald-100 !to-green-50 !p-6 !rounded-xl !shadow-md hover:!shadow-lg !transition !duration-300 !text-center">
          <h2 className="!text-2xl !font-semibold !text-emerald-700 !border-b-2 !border-emerald-400 !inline-block !pb-1">
            Team
          </h2>
          <p className="!mt-4 !text-gray-700">
            Created for <strong>NASA Space Apps Challenge 2025</strong>
          </p>
          <p className="!text-gray-700 !mt-2 !font-medium">
            Built by <span className="!text-emerald-600 !font-semibold">Agrim</span>,{" "}
            <span className="!text-emerald-600 !font-semibold">Himanshu</span>,{" "}
            <span className="!text-emerald-600 !font-semibold">Arun</span>, and{" "}
            <span className="!text-emerald-600 !font-semibold">Jagmeet</span>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
