import styled, { css } from 'styled-components';

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const textCenter = css`
  text-align: center;
`;

export const Wrapper = styled.div`
  ${center}
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #0d1216;

  ${center}
  flex-direction: column;
  overflow: hidden;
`;

export const Container = styled(Wrapper)`
  max-width: 1024px;
  margin: 0 auto;
`;

export const Input = styled.input`
  max-width: 100%;
  width: 100%;
  height: 44px;
  background-color: #05060f0a;
  border-radius: 0.5rem;
  padding: 0 1rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
    background 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;

  &:focus {
    color: #05060fc2;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: #05060f99;
  transition: color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
`;

export const InputGroup = styled.div`
  margin: 1.2rem 0px;
  &:hover,
  ${Label}, ${Input}:focus {
    outline: none;
    border-color: #05060f;
  }
`;

export const FormWrapper = styled.div`
  width: 50%;
  box-shadow: 0px 0px 31px -3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 0px 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-weight: 500;
  font-size: 17px;
  padding: 0.8em 1.3em 0.8em 0.9em;
  color: white;
  background: #ad5389;
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  border: none;
  letter-spacing: 0.05em;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  svg {
    margin-right: 3px;
    transform: rotate(30deg);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  &:hover svg {
    transform: translateX(5px) rotate(90deg);
  }
  span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }
  &:hover span {
    transform: translateX(7px);
  }
`;

export const LinkComponent = styled.a`
  text-decoration: none;
`;
export const Para = styled.p`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 10px 0.5rem;
`;

export const Heading = styled.h1``;
