import React, { useEffect, useState } from 'react';

function SessionHistory() {
    const [sessions, setSessions] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sessions/')
            .then(res => res.json())
            .then(data => setSessions(data.sessions || []))
            .catch(err => console.error('Failed to load session history:', err));
    }, []);

    const handleDecrypt = async (session_id) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/sessions/decrypt/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id })
            });
            const data = await res.json();

            if (data.decrypted_summary) {
                setSelectedSummary(data.decrypted_summary);
            } else {
                console.error("Decryption failed:", data.message);
                setSelectedSummary("Failed to decrypt session summary.");
            }
        } catch (err) {
            console.error("Failed to decrypt:", err);
        }
    };

    
const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all session history?")) return;

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/sessions/clear/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        alert(data.message || "History cleared.");
        setSessions([]);         // Reset the local state
        setSelectedSummary(null);
    } catch (err) {
        console.error("Failed to clear history:", err);
        alert("Failed to clear session history.");
    }
    };

    return (
        <div className="session-history-container">
            <h2 style={{ textAlign: 'center', margin: '20px 10px', fontWeight: 'bold'}}>
                Session History
            </h2>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button className="clear-history-button" onClick={handleClearHistory}>
        🗑️ Clear Session History
            </button>
            </div>

            <div className="session-list">
                {sessions.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>No past sessions found.</p>
                ) : (
                    sessions.map((s, index) => (
                        <div key={index} className="session-item">
                            <div className="session-details">
                                <strong>ID:</strong> {s.session_id} <br />
                                <strong>Time:</strong> {s.timestamp}
                            </div>
                            <button className="icon-button decrypt-button" onClick={() => handleDecrypt(s.session_id)}>
                                🔓 Decrypt
                            </button>
                        </div>
                    ))
                )}
            </div>

            {selectedSummary && (
                <div className="summary-popup">
                    <h3 style={{ marginTop: '10px' }}>📝 Decrypted Summary</h3>
                    <pre className="summary-box">{selectedSummary}</pre>
                    <button className="close-button" onClick={() => setSelectedSummary(null)}> X Close</button>
                </div>
            )}
        </div>
    );
}

export default SessionHistory;
