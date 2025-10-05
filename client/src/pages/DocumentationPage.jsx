import React from 'react';

// --- SVG ICONS for Documentation ---
const MousePointerIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>;
const CalendarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const ChartIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const DatabaseIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
const RocketIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A7.4 7.4 0 0 0 9 15a6.6 6.6 0 0 0 3 2.15c.57.2.57.8.02 1L12 19l-1 1 .02.5c.02.28.23.5.5.5A2.5 2.5 0 0 0 14 18l1-1 .5.02c.28.02.5.23.5.5l.5.02 1-1 1 .02a2.5 2.5 0 0 0 2.5-2.5c.02-.28-.2-.5-.5-.5l-.5-.02-1 1-1-.02a.5.5 0 0 1-.5-.5l-.02-.5 1-1-1-.02c-.57-.02-.8-.52-1-.02A6.6 6.6 0 0 0 15 9a7.4 7.4 0 0 0-1.55-3.5c-.75-.75-2.2-1-3.05-.05Z"/></svg>;


function DocumentationPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-100 font-sans p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              User Guide & Documentation
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              Your guide to understanding and utilizing the Climate Risk Dashboard.
            </p>
          </header>

          <main className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200/80">
            
            {/* Introduction Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed pt-6">
                The Climate Risk Dashboard is a tool designed to provide insights into the likelihood of adverse weather conditions for any location on Earth. By leveraging decades of NASA's satellite data, this application calculates historical probabilities for conditions like extreme heat, cold, precipitation, and wind. This is not a weather forecast, but a powerful climatological analysis to help you plan for outdoor activities, risk assessments, or research.
              </p>
            </section>

            {/* How to Use Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">How to Use the Dashboard</h2>
              <div className="space-y-8 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <MousePointerIcon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Step 1: Select a Location</h3>
                    <p className="text-gray-700 mt-1">
                      You have two easy ways to choose your area of interest. Either select a major city from the "Top Cities" dropdown for quick access, or click directly anywhere on the interactive map to get precise coordinates for a custom location. The analysis will automatically update for your selection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Step 2: Choose a Date</h3>
                    <p className="text-gray-700 mt-1">
                      Use the date picker to select the specific day of the year you are interested in. The dashboard will analyze historical data centered around this date to provide the most relevant climatological context.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Interpreting Results Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Interpreting the Results</h2>
              <div className="flex items-start mt-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <ChartIcon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Understanding Probabilities</h3>
                    <p className="text-gray-700 mt-1">
                        Each card in the results represents the historical probability of a specific weather event. For example, a 10% chance of "Very Hot" means that in the past, for the selected date and location, temperatures exceeded the 90th percentile (the top 10% of historical highs) on one out of every ten days. The progress bar provides a quick visual gauge of this likelihood.
                    </p>
                </div>
              </div>
            </section>
            
            {/* Data Source Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Data Source & Methodology</h2>
              <div className="flex items-start mt-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <DatabaseIcon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">NASA POWER Project</h3>
                    <p className="text-gray-700 mt-1">
                        This application is powered by data from NASA's Prediction of Worldwide Energy Resources (POWER) project. We access decades of daily, global satellite observations for variables such as temperature, precipitation, and wind speed. Our backend processes this data to calculate the percentile-based thresholds that define "very hot," "very cold," etc., for the specific location and time of year you select.
                    </p>
                </div>
              </div>
            </section>

             {/* Future Work Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Future Work</h2>
              <div className="flex items-start mt-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <RocketIcon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
                    <p className="text-gray-700 mt-1">
                        We plan to enhance the dashboard by incorporating historical trend analysis to show how these probabilities have changed over time. Additionally, we aim to add more variables, such as air quality data, and provide data export functionality for researchers and analysts.
                    </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}

export default DocumentationPage;

