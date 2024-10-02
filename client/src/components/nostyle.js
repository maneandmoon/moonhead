import styled from 'styled-components';

const colors = {
  newMoon: '#0d0d0d',        // dark, mysterious (new moon)
  fullMoon: '#f5f3ce',       // bright, full moon color
  waxingCrescent: '#8e8e8e', // transitional gray (waxing crescent)
  hair: '#c69c6d',           // warm brown, hair-like
  textDark: '#333',
  textLight: '#f5f5f5',
};

// General container styling with moon theme
export const FormContainer = styled.div`
  background-color: ${colors.newMoon};
  color: ${colors.textLight};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
`;

// Styled form elements
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.hair};
  background-color: ${colors.waxingCrescent};
  color: ${colors.textDark};
  font-size: 1rem;
`;

export const StyledButton = styled.button`
  background-color: ${colors.fullMoon};
  color: ${colors.textDark};
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.waxingCrescent};
    color: ${colors.textLight};
  }
`;

// Form Title
export const FormTitle = styled.h2`
  color: ${colors.fullMoon};
  text-align: center;
  margin-bottom: 20px;
`;

// Error Message Styling
export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
`;

// Adding moon phase background effect
export const BackgroundWrapper = styled.div`
  background: url('https://upload.wikimedia.org/wikipedia/commons/3/3b/Full_Moon.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
