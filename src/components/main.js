import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../constants/colors';
import { Chat } from './chat/Chat';
import { LoginForm } from './login/LoginForm';
import { Welcome } from './welcome/Welcome';
import { Habits } from './habits/Habits.js';
import { SignupForm } from './signup/SignupForm';
import { Users } from './users/Users';
import { get } from '../utils/api';
import { apiUrl } from '../constants/urls';

export const Main = () => {
  const [tab, setTab] = useState('Welcome');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [signup, setSignup] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(false);

  useEffect(() => {
    setShowSite(false);
    setTimeout(() => {
      setShowSite(true);
    }, 400);
    get(`${apiUrl}/users`, 'Unauthorized').then(users => {
      setUsers(users);
      setCurrentUser(
        users.find(
          user =>
            user.username === localStorage.getItem('username') &&
            user.password === localStorage.getItem('password')
        )
      );
    });
    setTab(localStorage.getItem('tab') || 'Welcome');
  }, [signUpSuccessful, loginSuccessful, updateUsers]);

  return (
    showSite && (
      <>
        {!currentUser && !signup && (
          <MainWrapper>
            <LoginForm
              setSignup={setSignup}
              signUpSuccessful={signUpSuccessful}
              setLoginSuccessful={setLoginSuccessful}
              setCurrentUser={setCurrentUser}
            />
          </MainWrapper>
        )}
        {!currentUser && signup && (
          <MainWrapper>
            <SignupForm
              setSignUpSuccessful={setSignUpSuccessful}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              setSignup={setSignup}
            />
          </MainWrapper>
        )}
        {currentUser && (
          <>
            <TabWrapper>
              <Tab selected={tab === 'Users'} onClick={() => saveTab('Users', setTab)}>
                Users
              </Tab>
              <Tab selected={tab === 'Chat'} onClick={() => saveTab('Chat', setTab)}>
                Chat
              </Tab>
              <Tab selected={tab === 'Habits'} onClick={() => saveTab('Habits', setTab)}>
                Habits
              </Tab>
              <Tab
                onClick={() => {
                  localStorage.clear();
                  setCurrentUser(undefined);
                  setLoginSuccessful(false);
                }}
              >
                Sign Out
              </Tab>
            </TabWrapper>
            <MainWrapper>
              {tab === 'Welcome' && <Welcome currentUser={currentUser} />}
              {tab === 'Users' && (
                <Users
                  currentUser={currentUser}
                  users={users}
                  updateUsers={updateUsers}
                  setUpdateUsers={setUpdateUsers}
                />
              )}
              {tab === 'Chat' && (
                <Chat users={users} currentUser={currentUser} />
              )}
              {tab === 'Habits' && <Habits />}
            </MainWrapper>
          </>
        )}
      </>
    )
  );
};

const saveTab = (tab,setTab) =>
{
  setTab(tab)
  localStorage.setItem('tab',tab)
}

const MainWrapper = styled.div`
  color: ${colors.white};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: stretch;
`;

const Tab = styled.button`
  background-color: ${p => (p.selected ? colors.brightGrey : colors.darkGrey)};
  color: ${colors.white};
  width: 100%;
  padding: 0.8rem 0;
  margin: 1rem 0.5rem;
  border: none;

  :hover {
    background-color: ${colors.brightGrey};
    cursor: pointer;
  }
`;
