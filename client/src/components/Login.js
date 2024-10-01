import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "16px" }}>
      <h1 style={{ fontFamily: "Sora, monospace", fontSize: "3rem", color: "#D1782E", margin: "8px 0 16px" }}>
        Moonhead
      </h1>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "16px 0" }} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)} style={{ color: "#D1782E", background: "none", border: "none", cursor: "pointer" }}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "16px 0" }} />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)} style={{ color: "#D1782E", background: "none", border: "none", cursor: "pointer" }}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;