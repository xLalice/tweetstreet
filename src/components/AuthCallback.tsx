import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation(); // Hook to access the current location object
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Effect to handle authentication token when component mounts
  useEffect(() => {
    const query = new URLSearchParams(location.search); // Parse query parameters from the URL
    const token = query.get('token'); // Retrieve the 'token' parameter from the query string

    if (token) {
      localStorage.setItem('authToken', token); // Store the token in localStorage for future use
      navigate('/'); // Navigate to the home page after storing the token
    } else {
      console.error('No token found'); // Log an error if no token is present
    }
  }, [location, navigate]); // Dependencies: re-run effect if location or navigate changes

  return <div>Loading...</div>; // Display loading message while processing token
};

export default AuthCallback;
