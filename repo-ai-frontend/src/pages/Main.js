import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Welcome to RepoAi</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
        <h3>User Information</h3>
        <p><strong>Email:</strong> {currentUser?.email}</p>
        <p><strong>Display Name:</strong> {currentUser?.displayName || 'Not set'}</p>
        <p><strong>User ID:</strong> {currentUser?.uid}</p>
      </div>
      
      <div>
        <h2>Primary Application Area</h2>
        <p>This is where your main application content will go.</p>
        <p>You are now authenticated and can access protected features.</p>
      </div>
    </main>
  );
}

export default Main;



