// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import { ClimateDataProvider } from './context/ClimateDataContext';
import './App.css';

function App() {
  return (
    <ClimateDataProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/docs" element={<DocumentationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClimateDataProvider>
  );
}

export default App;