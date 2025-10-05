// src/components/layout/Footer.jsx
import React from 'react';
import './Footer.css'; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">🌍 ClimateRisk Dashboard</h3>
          <p className="footer-description">
            Personalized weather probability analysis using NASA Earth observation data
          </p>
        </div>
        
        <div className="footer-section">
          <h4>NASA Space Apps 2025</h4>
          <p>Created for the NASA International Space Apps Challenge</p>
        </div>
        
        <div className="footer-section">
          <h4>Data Sources</h4>
          <div className="data-sources">
            <span className="data-source">🌡️ NASA POWER</span>
            <span className="data-source">🌧️ GPM</span>
            <span className="data-source">💨 MERRA-2</span>
            <span className="data-source">🌫️ MODIS</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-links">
            <a href="/about" className="footer-link">About</a>
            <a href="/docs" className="footer-link">Documentation</a>
            <a href="https://www.spaceappschallenge.org/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="footer-link">
              NASA Space Apps
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 ClimateRisk Dashboard - NASA Space Apps Challenge
        </div>
        <div className="footer-note">
          Made with ❤️ for a better understanding of our planet
        </div>
      </div>
    </footer>
  );
}

export default Footer;