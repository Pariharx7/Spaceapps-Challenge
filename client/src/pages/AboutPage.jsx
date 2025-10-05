function AboutPage() {
  return (
    <div className="about-page" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>About ClimateRisk Dashboard</h1>

      <section style={{ marginTop: '30px' }}>
        <h2>NASA Data Sources</h2>
        <ul>
          <li><strong>NASA POWER</strong> - Temperature & Solar Data</li>
          <li><strong>GPM</strong> - Precipitation Measurements</li>
          <li><strong>MERRA-2</strong> - Wind Speed Analysis</li>
          <li><strong>MODIS</strong> - Air Quality Indicators</li>
        </ul>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Methodology</h2>
        <p>
          Our probability calculations are based on historical NASA Earth observation data spanning
          multiple decades. We analyze trends and generate predictive models to help users understand
          climate risks and variability in their chosen locations.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Team</h2>
        <p>Created for NASA Space Apps Challenge 2025</p>
        <p>Work done by Agrim, Himanshu, Arun, and Jagmeet</p>
      </section>
    </div>
  );
}

export default AboutPage;
