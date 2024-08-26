import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManagePage from './ManagePage';
import CalendarPage from './CalendarPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Manage</Link></li>
                        <li><Link to="/calendar">Calendar</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<ManagePage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
