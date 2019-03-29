import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { get } from '../../utils/api';
import { LoginInput } from './LoginInput';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';

export const LoginForm = ({ setCurrentUser, setSignup }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState('');
  const [loginAttempt, setLoginAttempt] = useState(0);

  useEffect(() => {
    setTimeout(() => setShowLogin(true), 200);
  }, []);
  useEffect(() => {
    get(`${apiUrl}/users`).then(users => {
      console.log('Login-users: ', users);
      setUsers(users);
    });
  }, [loginAttempt]);

  return (
    <LoginFormWrapper>
      {showLogin && (
        <>
          <h1>Login</h1>
          <LoginInput
            placeholder="Username"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <LoginInput
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <LoginButton
            onClick={() => {
              setLoginAttempt(loginAttempt + 1);
              HandleLogin(username, password, setCurrentUser, users);
            }}
          >
            Login
          </LoginButton>
          {loginAttempt > 0 && (
            <p style={{ color: 'red' }}>Invalid login ({loginAttempt})</p>
          )}
          <p>
            Sign up <Signup onClick={() => setSignup(true)}>here</Signup>
          </p>
        </>
      )}
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const LoginButton = styled.button`
  background-color: ${colors.darkerGrey};
  color: ${colors.white};
  padding: 0.5rem 3rem;
  margin: 1rem;

  :hover {
    background-color: ${colors.grey};
    cursor: pointer;
  }
`;

const Signup = styled.span`
  color: orange;

  :hover {
    color: white;
    cursor: pointer;
  }
`;

const HandleLogin = (username, password, setCurrentUser, users) => {
  localStorage.clear();
  if (
    users &&
    users.find(user => user.username === username && user.password === password)
  ) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setCurrentUser(username);
  } else {
    setCurrentUser(undefined);
    console.log('Set loggedIn: false');
  }
};
