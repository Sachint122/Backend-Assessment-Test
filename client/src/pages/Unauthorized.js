import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '100px',
      color: '#ff6b6b'
    }}>
      <h1>🚫 Unauthorized Access</h1>
      <p>You must be logged in to view this page.</p>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'underline' }}>
        Go to Login
      </Link>
    </div>
  );
}
