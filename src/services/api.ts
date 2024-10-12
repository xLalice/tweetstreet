import axios from 'axios'; // Import the Axios library for making HTTP requests

// Define the structure of post data using an interface
interface PostData {
    content: string; // The content of the post
    scheduledTime: string; // The scheduled time for the post
}

// Base URL for the API, using environment variable or defaulting to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Function to retrieve the authentication token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Axios interceptor to attach the Authorization header to each request
axios.interceptors.request.use((config) => {
  const token = getAuthToken(); // Get the auth token
  if (token) {
    // If the token exists, set it in the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // Return the modified config
});

// Function to fetch scheduled posts from the API
export const fetchScheduledPosts = async () => {
  const response = await axios.get(`${BASE_URL}/api/posts`); // Make GET request to fetch posts
  return response.data; // Return the data from the response
};

// Function to create a new post, including the token in the Authorization header
export const createPost = async (postData: PostData) => {
  const response = await axios.post(`${BASE_URL}/api/posts/schedule`, postData); // POST request to create a new post
  return response.data; // Return the data from the response
};

// Function to update an existing post, including the token in the Authorization header
export const updatePost = async (postId: number, postData: PostData) => {
  const response = await axios.put(`${BASE_URL}/api/posts/${postId}`, postData); // PUT request to update a post
  return response.data; // Return the data from the response
};

// Function to verify user authentication
export const verifyAuth = async () => {
  const response = await axios.get(`${BASE_URL}/auth/verify`); // GET request to verify authentication
  return response.data; // Return the data from the response
};

// Function to log out the user
export const logoutUser = async () => {
  const response = await axios.post(`${BASE_URL}/auth/logout`); // POST request to log out
  return response.data; // Return the data from the response
};
