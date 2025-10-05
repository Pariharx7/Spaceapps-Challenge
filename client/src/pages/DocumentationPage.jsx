import React from "react";

// --- SVG ICONS for Documentation ---
const MousePointerIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="m13 13 6 6" />
  </svg>
);
const CalendarIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const ChartIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);
const DatabaseIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);
const RocketIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A7.4 7.4 0 0 0 9 15a6.6 6.6 0 0 0 3 2.15c.57.2.57.8.02 1L12 19l-1 1 .02.5c.02.28.23.5.5.5A2.5 2.5 0 0 0 14 18l1-1 .5.02c.28.02.5.23.5.5l.5.02 1-1 1 .02a2.5 2.5 0 0 0 2.5-2.5c.02-.28-.2-.5-.5-.5l-.5-.02-1 1-1-.02a.5.5 0 0 1-.5-.5l-.02-.5 1-1-1-.02c-.57-.02-.8-.52-1-.02A6.6 6.6 0 0 0 15 9a7.4 7.4 0 0 0-1.55-3.5c-.75-.75-2.2-1-3.05-.05Z" />
  </svg>
);

function DocumentationPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="!min-h-screen !bg-gradient-to-br !from-indigo-50 !via-white !to-sky-100 !font-sans !p-4 sm:!p-6 md:!p-8 !flex !items-center !justify-center">
        <div className="!max-w-5xl !mx-auto">
          {/* Header */}
          <header className="!text-center !mb-12">
            <h1 className="!text-4xl md:!text-5xl !font-extrabold !text-gray-800 !tracking-tight">
              User Guide & Documentation
            </h1>
            <p className="!text-lg !text-gray-600 !mt-3">
              Your guide to understanding and utilizing the{" "}
              <span className="!text-indigo-600 !font-semibold">
                Climate Risk Dashboard
              </span>
              .
            </p>
          </header>

          {/* Main Content */}
          <main className="!bg-white/70 !backdrop-blur-sm !p-8 !rounded-2xl !shadow-2xl !border !border-gray-200/80">
            {/* Section Template */}
            {[
              {
                title: "Introduction",
                icon: null,
                text: `The Climate Risk Dashboard provides insights into the likelihood of adverse weather conditions using decades of NASA's satellite data. It helps users assess climate risks like extreme heat, cold, precipitation, and wind. This is a climatological analysis, not a forecast.`,
              },
              {
                title: "Step 1: Select a Location",
                icon: <MousePointerIcon className="!w-6 !h-6" />,
                text: `Choose your area of interest by selecting a city or clicking on the map. The analysis updates automatically with precise coordinates.`,
              },
              {
                title: "Step 2: Choose a Date",
                icon: <CalendarIcon className="!w-6 !h-6" />,
                text: `Use the date picker to select your target day. The dashboard will use data around that date for accurate context.`,
              },
              {
                title: "Interpreting Results",
                icon: <ChartIcon className="!w-6 !h-6" />,
                text: `Each card shows the historical probability of a specific weather condition. For instance, 10% “Very Hot” means that in the past, 1 in 10 days was hotter than the 90th percentile for that time and place.`,
              },
              {
                title: "NASA Data Source",
                icon: <DatabaseIcon className="!w-6 !h-6" />,
                text: `Powered by NASA’s POWER project, which provides decades of global daily observations for temperature, precipitation, and wind. Our models compute percentile-based thresholds for risk categories.`,
              },
              {
                title: "Future Work",
                icon: <RocketIcon className="!w-6 !h-6" />,
                text: `We plan to introduce historical trend visualization, air quality data, and data export tools for researchers.`,
              },
            ].map(({ title, icon, text }, i) => (
              <section key={i} className="!mb-12">
                <div className="!flex !items-start !space-x-4">
                  {icon && (
                    <div className="!flex-shrink-0 !h-12 !w-12 !rounded-full !bg-indigo-100 !text-indigo-600 !flex !items-center !justify-center">
                      {icon}
                    </div>
                  )}
                  <div>
                    <h2 className="!text-2xl !font-bold !text-gray-800 !mb-3 !border-b !pb-2">
                      {title}
                    </h2>
                    <p className="!text-gray-700 !leading-relaxed">{text}</p>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

export default DocumentationPage;
