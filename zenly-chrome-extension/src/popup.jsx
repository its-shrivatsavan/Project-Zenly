import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const moods = [
  { icon: '😊', title: 'Happy' },
  { icon: '😌', title: 'Calm' },
  { icon: '😔', title: 'Sad' },
  { icon: '😫', title: 'Stressed' },
  { icon: '😡', title: 'Angry' }
];

export default function Popup() {
  const [username, setUsername] = useState('Friend');
  const [currentMood, setCurrentMood] = useState('😊');
  const [moodHistory, setMoodHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [reasonInput, setReasonInput] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('zenly-username') || 'Srivathsan';
    setUsername(name);

    const moodData = JSON.parse(localStorage.getItem('zenly-mood-history')) || [];
    if (moodData.length > 0) setCurrentMood(moodData[0].mood);
    setMoodHistory(moodData);
  }, []);

  const updateMood = (mood) => {
    setSelectedMood(mood);
    setReasonInput('');
    setShowModal(true);
  };

  const saveMood = () => {
    const newEntry = {
      mood: selectedMood,
      reason: reasonInput || 'No reason provided',
      date: new Date().toLocaleString()
    };
    const updatedHistory = [newEntry, ...moodHistory].slice(0, 7);
    localStorage.setItem('zenly-mood-history', JSON.stringify(updatedHistory));
    setMoodHistory(updatedHistory);
    setCurrentMood(selectedMood);
    setShowModal(false);

    chrome.runtime.sendMessage({
      type: 'moodUpdate',
      mood: selectedMood,
      reason: reasonInput,
      timestamp: Date.now()
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('zenly-mood-history');
    setMoodHistory([]);
  };

  const openJournal = () => {
    chrome.tabs.create({ url: 'http://localhost:3000/journal' });
  };

  const openChatbot = () => {
    chrome.tabs.create({ url: 'http://localhost:3000/chat' });
  };

  return (
    <div className="relative w-[350px] h-[500px] overflow-hidden bg-[#f8fafc] font-sans">
      <div className="w-full h-full bg-white rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold logo" style={{ fontFamily: 'Brody Script, cursive' }}>Zenly</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => chrome.tabs.create({ url: 'http://localhost:3000/' })}
                className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100"
              >
                Login
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100" title="Settings">⚙️</button>
              <button className="p-1 rounded-full hover:bg-gray-100" title="Help">❓</button>
            </div>
          </div>
        </header>
  
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Hello, <span className="text-blue-600">{username}</span>!</h2>
            <p className="text-sm text-gray-500">How are you feeling today?</p>
          </div>
  
          {/* Mood Tracker */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-medium mb-2">Select Your Current Mood</h3>
            <div className="flex justify-between text-2xl mb-3">
              {moods.map(({ icon, title }) => (
                <span
                  key={icon}
                  className="cursor-pointer transition-transform transform hover:scale-125"
                  title={title}
                  onClick={() => updateMood(icon)}
                >
                  {icon}
                </span>
              ))}
            </div>
            <div className="text-center text-3xl py-2">{currentMood}</div>
          </div>
  
          {/* Mood History */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Your Mood History</h3>
              <button onClick={clearHistory} className="text-red-500 text-xs hover:underline">Clear</button>
            </div>
            <div className="max-h-[120px] overflow-y-auto text-sm">
              {moodHistory.length === 0 ? (
                <div className="text-gray-500 italic">Your mood history will appear here</div>
              ) : (
                moodHistory.map((entry, idx) => (
                  <div key={idx} className="py-2 border-b border-gray-100">
                    <div className="flex justify-between mb-1">
                      <span className="text-xl">{entry.mood}</span>
                      <span className="text-xs text-gray-500">{entry.date}</span>
                    </div>
                    <div className="text-xs text-gray-600 truncate" title={entry.reason}>{entry.reason}</div>
                  </div>
                ))
              )}
            </div>
          </div>
  
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={openJournal}
              className="bg-blue-50 text-blue-600 p-3 rounded-lg flex flex-col items-center"
            >
              <span className="text-2xl mb-1">📔</span>
              <span className="text-sm">Journal</span>
            </button>
            <button
              onClick={openChatbot}
              className="bg-purple-50 text-purple-600 p-3 rounded-lg flex flex-col items-center"
            >
              <span className="text-2xl mb-1">💬</span>
              <span className="text-sm">Chat</span>
            </button>
          </div>
  
          {/* Emergency Resources */}
          <details className="bg-red-50 rounded-lg overflow-hidden mb-4">
            <summary className="p-3 text-red-600 font-medium cursor-pointer flex justify-between items-center">
              <span>Emergency Resources</span>
              <span className="text-lg">▼</span>
            </summary>
            <div className="p-3 pt-0 space-y-4 text-sm text-red-700">
              <div>
                <div className="font-medium">📞 Crisis Hotline</div>
                <p>Call <a className="underline font-semibold">+91-9152987821</a> - available 24/7 for emotional support.</p>
              </div>
              <div>
                <div className="font-medium">🧘 Breathing Exercises</div>
                <p>Try the <a href="https://youtu.be/SNqYG95j_UQ?feature=shared&t=28" target="_blank" rel="noopener noreferrer" className="underline">JPMR technique</a> to calm your body and mind.</p>
              </div>
              <div>
                <div className="font-medium">🧍 Grounding Techniques</div>
                <p>Use the <strong>5-4-3-2-1</strong> method: notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.</p>
              </div>
            </div>
          </details>
        </main>
      </div>
  
      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-72 shadow-xl">
            <h3 className="font-semibold text-lg mb-2">Why are you feeling {selectedMood}?</h3>
            <textarea
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="Enter your reason here..."
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveMood}
                className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
  }

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Popup />);
