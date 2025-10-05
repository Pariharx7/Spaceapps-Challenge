function DocumentationPage() {
  return (
    <div className="flex flex items-start justify-center bg-white px-4 py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12 border-b pb-4">
          User Guide
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            How to Use the Dashboard
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-2">
                Step 1: Select Location
              </h3>
              <p className="text-gray-700">
                Use the map, search bar, or enter coordinates to choose your area of interest.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-2">
                Step 2: Choose Date
              </h3>
              <p className="text-gray-700">
                Select the day of year you're interested in (month and day).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-2">
                Step 3: Set Parameters
              </h3>
              <p className="text-gray-700">
                Select which weather variables to analyze and set your thresholds.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Interpreting Results
          </h2>
          <p className="text-gray-700 mb-2 text-center">
            Learn how to read probability charts and risk assessments...
          </p>
          <p className="text-gray-700 text-center">
            And be ready for our future work...
          </p>
        </section>
      </div>
    </div>
  );
}

export default DocumentationPage;
