import React from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Avatar } from './Avatar';

export const User = ({ user, isCurrentUser }) => {
  return (
    <UserWrapper isCurrentUser={isCurrentUser}>
      <AvatarWrapper>
        <Avatar image={user.image} isCurrentUser={false} isVisible={true} />
        <Username>{user.username}</Username>
      </AvatarWrapper>
      <Info>
        Full name: {user.firstname} {user.lastname}
      </Info>
      <Info>Location: {user.location}</Info>
      <Info>Signed up: {new Date(user.createdAt).toLocaleString()}</Info>
      <Info>Latest log in: {new Date(user.createdAt).toLocaleString()}</Info>
    </UserWrapper>
  );
};

const UserWrapper = styled.div`
  background-color: ${colors.darkGrey};
  border-radius: 0.5rem;
  padding: 1rem 1rem 2.5rem;
  margin: 1rem;
  border: ${p => (p.isCurrentUser ? '1px solid white' : 'none')};
`;

const Username = styled.h2`
  margin: 0;
`;

const Info = styled.p`
  margin: 0.2rem 0;
`;

const AvatarWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
`;
