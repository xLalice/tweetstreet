import { useState } from 'react'; // Import useState hook for managing component state
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components for routing
import OAuthLogin from "./components/auth/OAuthLogin"; // Import the OAuth login component
import CalendarView from "./components/Calendar"; // Import the calendar view component
import PostForm from "./components/PostForm"; // Import the form for creating posts
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route component
import Navbar from "./components/Navbar"; // Import the navigation bar component
import AuthCallback from './components/AuthCallback'; // Import the auth callback component

function App() {
  const [showNavbar, setShowNavbar] = useState(false); // State to manage the visibility of the navbar

  return (
    <Router>
      {/* Conditionally render the Navbar if showNavbar is true */}
      {showNavbar && <Navbar setShowNavbar={setShowNavbar} />} 

      <Routes>
        {/* Public routes accessible to everyone */}
        <Route path="/login" element={<OAuthLogin />} /> {/* Route for login using OAuth */}
        <Route path="/auth/callback" element={<AuthCallback />} /> {/* Route for handling OAuth callback */}

        {/* Protected routes accessible only to authenticated users */}
        <Route element={<ProtectedRoute setShowNavbar={setShowNavbar} />}>
          <Route path="/" element={<CalendarView />} /> {/* Main route displaying the calendar view */}
          <Route path="/create-post" element={<PostForm />} /> {/* Route for creating a new post */}
        </Route>

        {/* 404 Route to handle unknown paths */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} /> {/* Display a message for unknown routes */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component for use in other parts of the application
