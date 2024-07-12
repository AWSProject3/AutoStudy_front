import React, { useState } from 'react';

const CreateProfile = ({ onProfileCreated }) => {
  const [language, setLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onProfileCreated(language);
    } catch (err) {
      console.error('Error creating profile:', err);
      alert('Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Create Profile</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="language" className="form-label">Preferred Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;