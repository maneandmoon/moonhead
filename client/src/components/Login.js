import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }} >
      <h1>
        Moonhead
      </h1>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)} >
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <hr style={{ border: "none", borderBottom: "2px solid #ccc", margin: "18px 0" }} />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;