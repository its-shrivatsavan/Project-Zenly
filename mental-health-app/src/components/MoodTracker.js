import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState('');
    const [reason, setReason] = useState('');
    const [moodHistory, setMoodHistory] = useState(() => {
      const storedHistory = localStorage.getItem("moodHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
  });
  

    const navigate = useNavigate();

    const moods = [
        { emoji: '😊', label: 'Happy' },
        { emoji: '😔', label: 'Sad' },
        { emoji: '😡', label: 'Angry' },
        { emoji: '😌', label: 'Calm' },
        { emoji: '😰', label: 'Anxious' }
    ];

    // 🔁 Load saved mood history from localStorage on component mount
    useEffect(() => {
        const storedHistory = localStorage.getItem('moodHistory');
        if (storedHistory) {
            setMoodHistory(JSON.parse(storedHistory));
        }
    }, []);

    // 💾 Save updated mood history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }, [moodHistory]);

    const saveMood = () => {
        if (selectedMood) {
            const newEntry = {
                mood: selectedMood,
                reason,
                timestamp: new Date().toLocaleString()
            };
            setMoodHistory([newEntry, ...moodHistory]);
            setReason('');
            setSelectedMood('');
        }
    };

    const clearMoodHistory = () => {
      localStorage.removeItem("moodHistory");
      setMoodHistory([]);
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="moodtracker-page">
            

            <div className="mood-box">
            <h2>Mood Tracker</h2>
                <div className="mood-options">
                    {moods.map(({ emoji, label }) => (
                        <button
                            key={label}
                            className={`mood-btn ${selectedMood === label ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(label)}
                        >
                            {emoji} {label}
                        </button>
                    ))}
                </div>

                {selectedMood && (
                    <div className="mood-reason-box">
                        <label>Why are you feeling {selectedMood.toLowerCase()}?</label>
                        <textarea
                            placeholder="Share your thoughts..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                )}

                <div className="save-mood-container">
                    <button className="save-mood-btn" onClick={saveMood}>Save Mood</button>
                </div>
            </div>

            
            <div className="mood-history">
            <h3>Mood History</h3>
                {moodHistory.map((entry, index) => (
                    <div key={index} className="mood-entry">
                        <p><strong>{entry.mood}</strong> - {entry.reason}</p>
                        <span>{entry.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className="clear-history-container">
          <button className="clear-history-btn" onClick={clearMoodHistory}>
          🗑️ Clear Mood History
          </button>
            </div>

            <nav className="bottom-nav">
                <button onClick={() => navigateTo('/')}>Home</button>
                <button onClick={() => navigateTo('/chat')}>Chat</button>
                <button onClick={() => navigateTo('/journal')}>Journal</button>
                <button onClick={() => navigateTo('/help')}>Help</button>
            </nav>
        </div>
    );
}

export default MoodTracker;
