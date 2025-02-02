import React from 'react';

const EnvironmentComponents = ({ components }) => {
  return (
    <div className="components">
      {components.length === 0 ? (
        <p>No components to display yet.</p>  // Handles both loading and empty state
      ) : (
        components.map((component) => (
          <div key={component._id} className="component-card">
            <h3>{component.name || 'Unnamed Component'}</h3>
            <p>{component.description || 'No description available.'}</p>
            <p>Importance: {component.importance || 'Not specified'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EnvironmentComponents;
