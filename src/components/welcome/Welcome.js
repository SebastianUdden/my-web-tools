import React from 'react';
import styled from 'styled-components';

import { defaultImageUrl } from '../../constants/urls';
import { Avatar } from '../users/Avatar';

const Welcome = ({ currentUser }) => (
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
      In the tabs above you can see other registered Users, <br />
      use the Chat, track your Habits and enter new memories into ReMemory.
    </p>
  </WelcomeWrapper>
);

const WelcomeWrapper = styled.div`
  padding: 5rem;
  text-align: center;
`;

export default Welcome;
