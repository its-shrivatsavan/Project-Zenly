# 💡 Zenly - Your AI Mental Health Companion

Zenly is a therapeutic AI-powered platform designed to support mental wellness through conversational therapy, journaling, and emotional tracking. It seamlessly integrates a React-based frontend, Django backend with an AI engine, and a Chrome Extension for quick access.

---

## 🌐 Live Application

> 📌 Run locally at: `http://localhost:3000`  
> 📌 Django server: `http://127.0.0.1:8000`  
> 📌 Chrome Extension: Load from `/dist` folder

---

## 🔧 Features

### 💬 Therapeutic Chatbot
- LLM-powered empathetic conversational agent
- Risk-level routing (low, medium, high)
- Text-to-Speech (TTS) functionality using EdenAI
- Contextual memory and crisis mode handling

### 📓 Journaling
- Prompt-based self-reflection
- AI-generated journaling prompts
- Journal entry persistence (local storage)

### 📊 Mood Tracker
- Emoji-based mood logging
- Stores mood history
- User reflection and trend tracking

### 🧹 Chrome Extension
- Instant access to journaling and chat
- Mood updates and history tracking
- Syncs with local storage

---

## 🏗️ Tech Stack

| Frontend | Backend | AI & NLP | Utilities |
|----------|---------|----------|-----------|
| React.js | Django  | OpenAI / Groq | EdenAI for TTS |
| Tailwind CSS | Django REST | LangChain | AES-256-GCM Encryption |
| Chrome Extension APIs | SQLite | Session Management | .env Support |

---

## 🔒 Security

- `.env` files for API keys
- AES-256-GCM encryption for session summaries
- No user authentication required (lightweight prototype)

---

## 📁 Project Structure

```
project_zenly/
├── zenly-frontend/         # React app (Chat, Mood, Journal)
├── zenly-backend/          # Django backend with API routes
├── zenly-chrome-extension/ # Chrome Extension source
└── .env / .env.development # Separate env config files
```

---

## 🧪 Local Setup Instructions

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/its-shrivatsavan/Project-Zenly.git
cd Project-Zenly
```

### 2️⃣ Frontend
```bash
cd zenly-frontend
npm install
npm start
```

### 3️⃣ Backend
```bash
cd ../zenly-backend
pip install -r requirements.txt
python manage.py runserver
```

### 4️⃣ Chrome Extension
```bash
cd ../zenly-chrome-extension
npm install
npm run build
```
- Load `/dist` in Chrome → Extensions → Developer Mode → Load Unpacked

---

## 🔑 Environment Variables

Create a `.env` file in both `zenly-backend/`:

### `.env` (for Django)
```
EDEN_API_KEY=your_edenai_key_here
GROQ_API_KEY=your_groq_key
SECRET_KEY=django_secret
```

### `.env` (for Extension if needed)
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## 🧠 AI Routing Logic

- **Low risk**: Standard supportive therapy (RegZenly)
- **Medium risk**: Self-calming & journaling prompts (PM-Zenly)
- **High risk**: Crisis management & helpline referrals (Crisis-Zenly)

Session states persist and switch based on conversation flow.

---

## 📦 Future Enhancements

- User authentication & dashboard
- Centralized mood trend graphs
- Secure cloud sync for journal & chat logs
- Enhanced voice recognition and TTS toggles
- Dark mode support 🌙

---

## 👥 Team & Credits
**Shrivatsavan S** – Project Lead, AI & Backend Engineer
> Led the project, built the AI engine, and implemented Django-based backend integration.

**Siranjeevi B & Srivathsan A** – Frontend Developers
> Developed and styled the React-based UI components and chat interface.

## 📃 License

This project is licensed under the MIT License.

---

> _“Your mental health matters. Take a breath, talk it out, and let Zenly walk with you.” 💙_
