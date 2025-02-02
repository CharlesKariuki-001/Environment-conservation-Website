// Function to fetch environmental components from the backend
export const getEnvironmentComponents = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/environment-components');  // The local API endpoint from the Flask backend
    if (!response.ok) {
      throw new Error('Failed to fetch components');
    }
    const data = await response.json();  // Parse the response as JSON
    return data;  // Return the data to be used in the frontend
  } catch (error) {
    console.error('Error fetching environment components:', error);
    return [];  // Return an empty array in case of an error
  }
};
