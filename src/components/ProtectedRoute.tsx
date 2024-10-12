import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyAuth } from '../services/api'; // Import the function to verify authentication status
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader for loading state

// Define the ProtectedRoute component with a prop to control navbar visibility
const ProtectedRoute: React.FC<{ setShowNavbar: (show: boolean) => void }> = ({ setShowNavbar }) => {
  // State to hold authentication status, initialized as null
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Function to check authentication status asynchronously
    const checkAuth = async () => {
      try {
        // Call the API to verify authentication
        const result = await verifyAuth();
        // Update state based on the result
        setIsAuthenticated(result.authenticated);
        // Show/hide navbar based on authentication status
        setShowNavbar(result.authenticated);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        // If there's an error, set authenticated state to false
        setIsAuthenticated(false);
        // Ensure navbar is hidden in case of an error
        setShowNavbar(false);
      }
    };

    // Execute the authentication check
    checkAuth();
  }, [setShowNavbar]); // Dependency array ensures this effect runs only when setShowNavbar changes

  // If authentication status is still being determined, show a loading spinner
  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#3498db" loading={true} size={50} /> {/* Loading spinner */}
      </div>
    );
  }

  // Render child routes if authenticated; otherwise, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute; // Export the ProtectedRoute component
