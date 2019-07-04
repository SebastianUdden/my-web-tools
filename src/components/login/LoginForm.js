import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { get, update } from '../../utils/api';
import { LoginInput } from './LoginInput';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';

const LoginForm = ({
  setCurrentUser,
  setSignup,
  signUpSuccessful,
  setLoginSuccessful,
}) => {
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
      if (users.error) return;
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
              HandleLogin(
                username,
                password,
                setCurrentUser,
                users,
                setLoginSuccessful
              );
              setTimeout(() => setLoginAttempt(loginAttempt + 1), 200);
            }}
          >
            Login
          </LoginButton>
          {loginAttempt > 0 && (
            <p style={{ color: 'red' }}>Invalid login ({loginAttempt})</p>
          )}
          {!signUpSuccessful && (
            <p>
              Sign up <Signup onClick={() => setSignup(true)}>here</Signup>
            </p>
          )}
          <br />
          {signUpSuccessful && (
            <p>
              Sign up successful! You can now log in with your new username and
              password.
            </p>
          )}
        </>
      )}
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20rem;
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

const HandleLogin = (
  username,
  password,
  setCurrentUser,
  users,
  setLoginSuccessful
) => {
  sessionStorage.clear();
  const currentUser =
    users &&
    users.find(
      user => user.username === username && user.password === password
    );
  if (currentUser) {
    update(
      `${apiUrl}/users/${currentUser._id}`,
      {
        ...currentUser,
        updatedAt: new Date(),
      },
      currentUser.username
    ).then(response => {
      setLoginSuccessful(true);
      setCurrentUser(response);
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('password', response.password);
    });
  }
};

export default LoginForm;
