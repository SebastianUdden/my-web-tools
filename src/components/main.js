import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';

import SignupForm from './signup/SignupForm';
import LoginForm from './login/LoginForm';
import Welcome from './welcome/Welcome';
import Users from './users/Users';
import Chat from './chat/Chat';
import Habits from './habits/Habits.js';
import ReMemory from './reMemory/ReMemory';
import StockPickersMonthly from './stockPickersMonthly/StockPickersMonthly';
import { colors } from '../constants/colors';
import { get } from '../utils/api';
import { apiUrl } from '../constants/urls';
import { TabWrapper, Tab, saveTab } from './shared/commonComponents';

const tabs = ['Users', 'Chat', 'Habits', 'ReMemory', 'SPM'];

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
      setCurrentUser(
        users.find(
          user =>
            user.username === sessionStorage.getItem('username') &&
            user.password === sessionStorage.getItem('password')
        )
      );
    });
    setTab(sessionStorage.getItem('main-tab') || 'Spm');
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
                        onClick={() => saveTab('main', x, setTab)}
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
                  {tab === 'SPM' && currentUser.username === 'Sebbe' && (
                    <StockPickersMonthly
                      users={users}
                      currentUser={currentUser}
                    />
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

const MainWrapper = styled.div`
  color: ${colors.white};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;
