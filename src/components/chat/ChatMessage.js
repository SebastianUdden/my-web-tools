import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Avatar } from '../users/Avatar';
import { remove } from '../../utils/api';
import { apiUrl } from '../../constants/urls';

export const ChatMessage = ({
  message,
  isFirstMessage,
  users,
  setDbUpdate,
  dbUpdate,
  isCurrentUser,
  currentUser,
}) => {
  const [clicked, setClicked] = useState(false);
  const user = users && users.find(user => user._id === message.user);

  return (
    <>
      <ChatMessageWrapper
        isCurrentUser={isCurrentUser}
        isFirstMessage={isFirstMessage}
      >
        <Avatar
          isCurrentUser={isCurrentUser}
          image={user && user.image}
          isVisible={isFirstMessage}
        />
        <div>
          {!isCurrentUser && isFirstMessage && (
            <Username>{user && user.username}</Username>
          )}
          <Message
            empty={!message.text || !message.text.trim()}
            isCurrentUser={isCurrentUser}
            onClick={() => setClicked(!clicked)}
          >
            {message.text}{' '}
            {isCurrentUser && clicked && (
              <Delete
                onClick={() => {
                  remove(
                    `${apiUrl}/messages/${message._id}`,
                    currentUser.username
                  ).then(response => {
                    console.log('response: ', response);
                    setDbUpdate(!dbUpdate);
                  });
                }}
              >
                &#x2715;
              </Delete>
            )}
          </Message>
          {clicked && (
            <CreatedAt>
              {message.createdAt &&
                new Date(message.createdAt).toLocaleString()}
            </CreatedAt>
          )}
        </div>
      </ChatMessageWrapper>
    </>
  );
};

const ChatMessageWrapper = styled.div`
  color: ${colors.white};
  margin: 0;
  padding: ${p => (p.isFirstMessage ? '1rem' : '0.3rem')} 0.5rem 0 0.5rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: ${p => (p.isCurrentUser ? 'row-reverse' : 'row')};
  max-width: 100%;
  /* border: ${p =>
    p.isFirstMessage ? '1px solid red' : '1px solid green'}; */
`;

const Message = styled.p`
  background-color: ${p =>
    p.isCurrentUser ? colors.darkishGrey : colors.brightGrey};
  margin: 0 0.2rem;
  padding: 0.5rem 0.7rem;
  display: flex;
  justify-content: ${p => (p.empty ? 'flex-end' : 'space-between')};
  align-items: flex-start;
  border-radius: 1rem;
  word-break: break-word;

  :hover {
    background-color: ${colors.brightGrey};
    cursor: pointer;
  }
`;

const CreatedAt = styled.p`
  margin: 0 1rem;
  padding: 0;
  color: ${colors.brightGrey};
`;

const Username = styled.p`
  margin: 0.1rem 0.8rem;
  padding: 0;
  color: ${colors.brightGrey};
`;

const Delete = styled.span`
  background-color: ${colors.brightGrey};
  color: ${colors.white};
  border-radius: 1rem;
  margin-left: 0.5rem;
  padding: 0 0.3rem;
  :hover {
    color: ${colors.white};
  }
`;
