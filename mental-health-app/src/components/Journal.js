import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Journal() {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const navigate = useNavigate();

    // Fetch journal entries from chrome.storage.local on component mount
    useEffect(() => {
        if (window.chrome && window.chrome.storage) {
            chrome.storage.local.get(['zenly-journal-entries'], (result) => {
                const storedEntries = result['zenly-journal-entries'] || [];
                setEntries(storedEntries);
            });
        }
    }, []);

    // Save journal entries to chrome.storage.local whenever entries change
    useEffect(() => {
        if (window.chrome && window.chrome.storage) {
            chrome.storage.local.set({ 'zenly-journal-entries': entries });
        }
    }, [entries]);

    const handleAddEntry = () => {
        if (entry.trim()) {
            const newEntry = {
                text: entry,
                timestamp: new Date().toLocaleString()
            };

            // Update state by prepending the new entry
            setEntries([newEntry, ...entries]);
            setEntry(''); // Clear the input field
        }
    };

    const handleChatSubmit = async () => {
        if (!chatInput.trim()) return;

        const userMsg = { text: chatInput, sender: 'user' };
        setChatMessages(prev => [...prev, userMsg]);
        const userInput = chatInput;
        setChatInput('');

        try {
            const res = await fetch('http://127.0.0.1:8000/api/journal/prompts/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            const data = await res.json();
            const rawString = data.prompts || data.response || "Sorry, I couldn't generate prompts.";

            const splitPrompts = rawString
                .split(/\n|•|-|\d+\./)
                .map(p => p.trim())
                .filter(p => p.length > 0);

            splitPrompts.forEach(prompt => {
                setChatMessages(prev => [...prev, { text: prompt, sender: 'bot' }]);
            });

        } catch (error) {
            console.error("Error:", error);
            setChatMessages(prev => [...prev, { text: "⚠️ Could not connect to AI.", sender: 'bot' }]);
        }
    };

    const handleClearEntries = () => {
        setEntries([]); // Clear state
        if (window.chrome && window.chrome.storage) {
            chrome.storage.local.remove('zenly-journal-entries'); // Remove from chrome.storage.local
        }
    };

    const navigateTo = (path) => navigate(path);

    return (
        <div className="journal-page">
    
            {/* AI Journal Prompt Suggester */}
            <div className="chatbot-box">
                <h3 className="chatbot-title">💡 AI Journal Prompt Suggester</h3>
                <div className="chatbot-messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chatbot-input-container">
                    <input
                        type="text"
                        placeholder="Ask for a prompt..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                    />
                    <button onClick={handleChatSubmit}>Send</button>
                </div>
            </div>
    
            {/* Journal Entry Box */}
            <div className="journal-entry-box">
                <textarea
                    placeholder="Write your journal entry here..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />
                <div className="save-entry-container">
                    <button className="save-entry-btn" onClick={handleAddEntry}>💾 Save Entry</button>
                    <button className="clear-entries-btn" onClick={handleClearEntries}>🗑️ Clear All Entries</button>
                </div>
            </div>
    
            {/* Saved Entries */}
            <div className="journal-entries-list">
                <h3 className="entries-title">📚 Saved Entries</h3>
                {entries.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>No entries yet.</p>
                ) : (
                    entries.map((item, index) => (
                        <div key={index} className="journal-entry">
                            <p>{item.text}</p>
                            <span className="entry-timestamp">{item.timestamp}</span>
                        </div>
                    ))
                )}
            </div>
    
            {/* Navigation */}
            <nav className="bottom-nav">
                <button onClick={() => navigateTo('/home')}>Home</button>
                <button onClick={() => navigateTo('/chat')}>Chat</button>
                <button onClick={() => navigateTo('/mood')}>Mood</button>
                <button onClick={() => navigateTo('/help')}>Help</button>
            </nav>
        </div>
    );    
}

export default Journal;
