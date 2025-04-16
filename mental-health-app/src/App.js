import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FaHome, FaComments, FaBook, FaSmile, FaHistory } from 'react-icons/fa';  // Importing icons
/*import Home from './components/Home';*/  // Assuming you already have this
import Chat from './components/Chat';
import Journal from './components/Journal';
import MoodTracker from './components/MoodTracker';
import './styles.css';
import SessionHistory from './components/SessionHistory';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/mood" element={<MoodTracker />} />
                    <Route path="/history" element={<SessionHistory />} />
                </Routes>
                <nav className="bottom-nav">
                    <NavLink to="/" className="nav-link">
                        <FaHome className="nav-icon" />
                        Home
                    </NavLink>
                    <NavLink to="/chat" className="nav-link">
                        <FaComments className="nav-icon" />
                        Chat
                    </NavLink>
                    <NavLink to="/journal" className="nav-link">
                        <FaBook className="nav-icon" />
                        Journal
                    </NavLink>
                    <NavLink to="/mood" className="nav-link">
                        <FaSmile className="nav-icon" />
                        Mood
                    </NavLink>
                    <NavLink to="/history" className="nav-link">
                        <FaHistory className="nav-icon" />
                        History
                    </NavLink>
                </nav>
            </div>
        </Router>
    );
}

export default App;

