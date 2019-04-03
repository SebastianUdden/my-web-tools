import React from 'react';
import styled from 'styled-components';

import {defaultImageUrl} from '../../constants/urls';
import { Avatar } from '../users/Avatar';

export const Welcome = ({ currentUser }) => (
  <WelcomeWrapper>
    <Avatar
      image={currentUser.image || defaultImageUrl}
      isVisible={true}
      margin={'0 0.5rem 0 0'}
      size={10}
    />
    <br />
    <br />
    <h2>Welcome {currentUser.username}</h2>
    <p>
      In the tabs above you can see other registered users, <br />
      use MyChat as well as sign out.
    </p>
  </WelcomeWrapper>
);

const WelcomeWrapper = styled.div`
  padding: 5rem;
  text-align: center;
`;
