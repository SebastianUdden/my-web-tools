import React from 'react';
import styled from 'styled-components';

export const Avatar = ({ image, isVisible, size, margin }) => {
  return (
    <AvatarImage
      isVisible={image && isVisible}
      margin={margin}
      src={image}
      size={size}
      alt="Avatar"
    />
  );
};

const AvatarImage = styled.img`
  width: ${p => p.size}rem;
  height: ${p => p.size}rem;
  border-radius: 5rem;
  margin: ${p => p.margin};
  visibility: ${p => (p.isVisible ? 'visible' : 'hidden')};
`;
