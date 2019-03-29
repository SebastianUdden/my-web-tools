import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const LoginInput = ({ placeholder, type, value, setValue }) => {
  return (
    <Input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

const Input = styled.input`
  display: flex;
  background-color: ${colors.darkerGrey};
  border: none;
  border-bottom: 1px solid ${colors.white};
  outline: none;
  color: ${colors.white};
  margin: 1rem;
  padding: 0.5rem;
`;
