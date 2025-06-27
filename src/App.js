// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <HomePage />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;