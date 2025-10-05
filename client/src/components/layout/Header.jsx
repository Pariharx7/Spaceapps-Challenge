// src/components/layout/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const currentPath = useLocation().pathname;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🌍 ClimateRisk Dashboard
        </Link>
        
        <nav className="navigation">
          <Link 
            to="/" 
            className={currentPath === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={currentPath === '/dashboard' ? 'nav-link active' : 'nav-link'}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className={currentPath === '/about' ? 'nav-link active' : 'nav-link'}
          >
            About
          </Link>
          <Link 
            to="/docs" 
            className={currentPath === '/docs' ? 'nav-link active' : 'nav-link'}
          >
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;