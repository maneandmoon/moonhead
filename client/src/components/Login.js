import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { StyledButton } from "./styles";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

    if (!user) return <Login onLogin={setUser} />;

  return (
    <Wrapper>
      <Logo>Projectify</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <StyledButton color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </StyledButton>
          </p>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <StyledButton color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </StyledButton>
          </p>
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: "Sora", monospace;
  font-size: 3rem;
  color: #D1782E;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;