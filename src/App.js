import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from './components/LoginButton';
import CallbackHandler from './components/CallbackHandler';
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App bg-dark text-light min-vh-100">
        <header className="bg-black text-white text-center py-5">
          <h1>Wellcome to AutoStudy</h1>
        </header>
        <main className="container mt-5">
          <Routes>
            <Route path="/" element={<LoginButton />} />
            <Route path="/callback" element={<CallbackHandler />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;