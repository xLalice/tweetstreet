import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api'; 
import Logo from "../assets/logo.png";

// Define the Navbar component with props for controlling visibility
const Navbar: React.FC<{ setShowNavbar: (show: boolean) => void }> = ({ setShowNavbar }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout API service
      setShowNavbar(false); // Hide the navbar after logout
      localStorage.removeItem("authToken"); // Remove authentication token from local storage
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error); // Log any errors encountered during logout
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg w-full z-99"> {/* Navigation bar styles */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          <Link to="/"> {/* Link to the homepage */}
            <img src={Logo} alt="Logo" className='h-20' /> {/* Logo image */}
          </Link>
        </div>

        <div className="flex space-x-4"> {/* Space between navigation items */}
          <Link to="/create-post" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200">
            Schedule Post {/* Link to create a new post */}
          </Link>
          <button
            onClick={handleLogout} // Trigger logout on button click
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
          >
            Logout {/* Button to logout the user */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component for use in other parts of the application
