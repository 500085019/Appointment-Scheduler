import React, { useState } from 'react';
import './AuthForm.css';

const SignupForm = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        onSwitch(); // Switch to login form on successful signup
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Already have an account? <span onClick={onSwitch}>Login</span>
      </p>
    </div>
  );
};

export default SignupForm;
