import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';

import { colors } from '../constants/colors';
import { Chat } from './chat/Chat';
import { LoginForm } from './login/LoginForm';
import { Welcome } from './welcome/Welcome';
import { Habits } from './habits/Habits.js';
import { SignupForm } from './signup/SignupForm';
import { Users } from './users/Users';
import { get } from '../utils/api';
import { apiUrl } from '../constants/urls';
import { ReMemory } from './reMemory/ReMemory';

const tabs = ['Users', 'Chat', 'Habits', 'ReMemory'];

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
      if (users.error) return;
      setUsers(users);
      // setCurrentUser(
      //   users.find(
      //     user =>
      //       user.username === process.env.MOCK_USER ||
      //       (sessionStorage.getItem('username') &&
      //         user.password === process.env.MOCK_PASSWORD) ||
      //       sessionStorage.getItem('password')
      //   )
      // );
    });
    setTab(sessionStorage.getItem('tab') || 'Welcome');
  }, [signUpSuccessful, loginSuccessful, updateUsers]);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data =>
        showSite && (
          <>
            <Header
              siteTitle={data.site.siteMetadata.title}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setLoginSuccessful={setLoginSuccessful}
            />
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
                  {tabs &&
                    tabs.map(x => (
                      <Tab
                        key={x}
                        selected={tab === x}
                        onClick={() => saveTab(x, setTab)}
                      >
                        {x}
                      </Tab>
                    ))}
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
                  {tab === 'Habits' && (
                    <Habits users={users} currentUser={currentUser} />
                  )}
                  {tab === 'ReMemory' && currentUser.username === 'Sebbe' && (
                    <ReMemory users={users} currentUser={currentUser} />
                  )}
                  {/* {tab === 'Lab' && <Lab />} */}
                </MainWrapper>
              </>
            )}
          </>
        )
      }
    />
  );
};

const saveTab = (tab, setTab) => {
  setTab(tab);
  sessionStorage.setItem('tab', tab);
};

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
  padding: 0.5rem 0.5rem;
  margin: 0rem 0.05rem 0.6rem;
  outline: none;
  border: none;

  :hover {
    background-color: ${colors.brightGrey};
    cursor: pointer;
  }
`;
