import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { get, create } from '../../utils/api';
import { LoginInput } from '../login/LoginInput';
import { colors } from '../../constants/colors';
import { apiUrl } from '../../constants/urls';

export const SignupForm = ({ setSignup }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [users, setUsers] = useState('');
  const [signupAttempt, setSignupAttempt] = useState(0);

  useEffect(() => {
    setTimeout(() => setShowSignup(true), 200);
  }, []);
  useEffect(() => {
    get(`${apiUrl}/users`, 'Unauthorized').then(users => {
      console.log('Signup-users: ', users);
      setUsers(users);
    });
  }, [signupAttempt]);

  return (
    <SignupFormWrapper>
      {showSignup && (
        <>
          <h1>Sign Up</h1>
          <LoginInput
            placeholder="Username"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <LoginInput
            placeholder="E-mail"
            type="text"
            value={email}
            setValue={setEmail}
          />
          <LoginInput
            placeholder="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <LoginInput
            placeholder="First name"
            type="text"
            value={firstname}
            setValue={setFirstname}
          />
          <LoginInput
            placeholder="Last name"
            type="text"
            value={lastname}
            setValue={setLastname}
          />
          <LoginInput
            placeholder="Location"
            type="text"
            value={location}
            setValue={setLocation}
          />
          <LoginInput
            placeholder="Image url"
            type="text"
            value={image}
            setValue={setImage}
          />
          <SignupButton
            onClick={() => {
              setSignupAttempt(signupAttempt + 1);
              HandleSignup(
                {
                  username,
                  email,
                  password,
                  firstname,
                  lastname,
                  location,
                  image,
                },
                users
              );
              localStorage.clear();
              setSignup(false);
            }}
          >
            Sign Up
          </SignupButton>
          {signupAttempt > 0 && (
            <p style={{ color: 'red' }}>Invalid sign up ({signupAttempt})</p>
          )}
        </>
      )}
    </SignupFormWrapper>
  );
};

const SignupFormWrapper = styled.div`
  text-align: center;
`;

const SignupButton = styled.button`
  background-color: ${colors.darkerGrey};
  color: ${colors.white};
  padding: 0.5rem 3rem;
  margin: 1rem;

  :hover {
    background-color: ${colors.grey};
    cursor: pointer;
  }
`;

const HandleSignup = (signupData, users) => {
  if (
    users &&
    users.find(
      user =>
        user.username === signupData.username || user.email === signupData.email
    )
  ) {
    return undefined;
  } else {
    create(`${apiUrl}/users`, signupData, 'Unauthorized').then(response => {
      console.log('USER-CREATE-response: ', response);
    });
  }
};
