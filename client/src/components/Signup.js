import React from 'react';
import SignupForm from './SignupForm'; 

function Signup({ onLogin }) {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onLogin={onLogin} />
    </div>
  );
}

export default Signup;
