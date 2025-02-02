import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in as admin
  const isLoggedIn = localStorage.getItem('token');
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    navigate('/login');
  }

  // Fetch the list of components when the page loads
  useEffect(() => {
    axios.get('/api/environment-components') // Updated to relative URL
      .then((response) => {
        setComponents(response.data);
      })
      .catch((error) => console.error('Error fetching components:', error));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComponent({
      ...newComponent,
      [name]: value,
    });
  };

  // Add a new environmental component
  const handleAddComponent = () => {
    if (!newComponent.name || !newComponent.description) {
      setError('Both fields are required!');
      return;
    }

    axios.post('/api/environment-components', newComponent) // Updated to relative URL
      .then((response) => {
        setComponents([...components, response.data]);
        setNewComponent({ name: '', description: '' });
        setError(''); // Clear error after successful addition
      })
      .catch((error) => {
        console.error('Error adding component:', error);
        setError('Failed to add component, please try again later.');
      });
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Manage Environmental Components</h2>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      <h3>Add New Component</h3>
      <input
        type="text"
        name="name"
        placeholder="Component Name"
        value={newComponent.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={newComponent.description}
        onChange={handleChange}
      />
      <button onClick={handleAddComponent}>Add Component</button>

      <h3>Existing Components</h3>
      <ul>
        {components.map((component) => (
          <li key={component._id}>
            <h4>{component.name}</h4>
            <p>{component.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
