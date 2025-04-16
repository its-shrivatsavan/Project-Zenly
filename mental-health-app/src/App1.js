/*
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Home, MessageCircle, Smile, BookOpen, LifeBuoy } from "lucide-react"; // Import icons

import Chat from "./components/Chat";
import MoodTracker from "./components/MoodTracker";
import Journal from "./components/Journal";




function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow">
          <Routes>
            
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
            
          </Routes>
        </div>

        
        
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-3 flex gap-6 text-gray-600">
          <NavLink to="/" className="nav-item">
            <Home size={24} /> <span>Home</span>
          </NavLink>
          <NavLink to="/chat" className="nav-item">
            <MessageCircle size={24} /> <span>Chat</span>
          </NavLink>
          <NavLink to="/mood" className="nav-item">
            <Smile size={24} /> <span>Mood</span>
          </NavLink>
          <NavLink to="/journal" className="nav-item">
            <BookOpen size={24} /> <span>Journal</span>
          </NavLink>
          <NavLink to="/help" className="nav-item">
            <LifeBuoy size={24} /> <span>Help</span>
          </NavLink>
        </nav>

        
        
      </div>
    </Router>
  );
}

export default App;

*/
/*
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Home, MessageCircle, Smile, BookOpen, LifeBuoy } from "lucide-react"; // Import icons

import Chat from "./components/Chat";
import MoodTracker from "./components/MoodTracker";
import Journal from "./components/Journal";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        
        <div className="flex-grow">
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>

       
        <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-3 flex gap-6 text-gray-600">
  <NavLink to="/" className="nav-item">
    <Home size={24} /> <span>Home</span>
  </NavLink>
  <NavLink to="/chat" className="nav-item">
    <MessageCircle size={24} /> <span>Chat</span>
  </NavLink>
  <NavLink to="/mood" className="nav-item">
    <Smile size={24} /> <span>Mood</span>
  </NavLink>
  <NavLink to="/journal" className="nav-item">
    <BookOpen size={24} /> <span>Journal</span>
  </NavLink>
  <NavLink to="/help" className="nav-item">
    <LifeBuoy size={24} /> <span>Help</span>
  </NavLink>
</nav>

      </div>
    </Router>
  );
}

export default App;
*/