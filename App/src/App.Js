/*
App.js includes the main router to route users to the appropriate pages, as well as the imports for those pages.
It also contains the import for the App.css page which will format the pages for astethic purposes 
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManagePage from './ManagePage';
import CalendarPage from './CalendarPage';
import './App.css';


//html for routing page
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
