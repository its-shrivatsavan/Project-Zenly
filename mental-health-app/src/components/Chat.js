import React, { useState, useRef } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Chat() {
    const [messages, setMessages] = useState([
        { text: "Hello Siranjeevi! What would you like to talk about today?", type: 'received' }
    ]);
    const [input, setInput] = useState('');
    const audioRef = useRef(null); // Store Audio instance
    const [isPlaying, setIsPlaying] = useState(false); // Track playback status

    const sendMessage = async () => {
        if (input.trim()) {
            const userMessage = { text: input, type: 'sent' };
            setMessages(prev => [...prev, userMessage]);
            const messageText = input;
            setInput('');
    
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/chatbot/", {
                    message: messageText
                });
    
                const aiResponse = res.data.response || "I'm here for you.";
                setMessages(prev => [...prev, { text: aiResponse, type: 'received' }]);
    
                // TTS audio generation
                const ttsRes = await fetch('http://127.0.0.1:8000/api/tts/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: aiResponse })
                });
    
                const blob = await ttsRes.blob();
                const url = URL.createObjectURL(blob);
    
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
                }
    
                const newAudio = new Audio(url);
                newAudio.onended = () => setIsPlaying(false);
                audioRef.current = newAudio;
                setIsPlaying(false);
            } catch (error) {
                console.error("Error sending message:", error);
                setMessages(prev => [...prev, { text: "⚠️ Failed to connect to AI.", type: 'received' }]);
            }
        }
    };
    
    
    

    const toggleTTS = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="chat-container">
            <h2 style={{ textAlign: 'center', margin: '15px 0 5px 0', fontWeight: 'bold' }}>
                Therapeutic Chat
            </h2>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.type === 'received' ? (
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                            msg.text
                        )}
                        {msg.type === 'received' && (
                            <button className="icon-button read-aloud" onClick={toggleTTS}>
                                <Volume2 size={20} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    className="chat-input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button className="icon-button mic-button">
                    <Mic size={20} />
                </button>
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
