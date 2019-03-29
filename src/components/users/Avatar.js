import React from 'react';
import styled from 'styled-components';

export const Avatar = ({ image, isCurrentUser, isVisible }) => {
  return (
    <AvatarImage
      isCurrentUser={isCurrentUser}
      isVisible={isVisible}
      src={image}
      alt="Avatar"
    />
  );
};

const AvatarImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  margin: ${p =>
      !p.isCurrentUser && p.isVisible
        ? '1.3rem'
        : p.isCurrentUser && p.isVisible
        ? '-0.3rem'
        : 0}
    0.5rem 0 0.5rem;
  visibility: ${p => (p.isVisible ? 'visible' : 'hidden')};
`;
