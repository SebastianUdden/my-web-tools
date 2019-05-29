import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { Avatar } from '../users/Avatar';
import { update, remove } from '../../utils/api';
import { apiUrl, defaultImageUrl } from '../../constants/urls';

export const ChatMessage = ({
  message,
  isFirstMessage,
  users,
  setDbUpdate,
  dbUpdate,
  isCurrentUser,
  currentUser,
}) => {
  const wrapperRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [messageText, setMessageText] = useState(message.text);
  const user = users && users.find(user => user._id === message.user);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, false);
  }, []);

  const handleClickOutside = e => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target) &&
      e.target.id !== 'EditButton'
    ) {
      setEditMode(false);
    }
  };

  return (
    <>
      <ChatMessageWrapper
        isCurrentUser={isCurrentUser}
        isFirstMessage={isFirstMessage}
        ref={wrapperRef}
      >
        <Avatar
          image={(user && user.image) || defaultImageUrl}
          isVisible={isFirstMessage}
          margin={`${
            !isCurrentUser && isFirstMessage
              ? '1.6rem'
              : isCurrentUser && isFirstMessage
              ? '-0.11rem'
              : 0
          } 0.5rem 0 0.3rem`}
          size={2.5}
        />
        <div>
          {!isCurrentUser && isFirstMessage && (
            <Username>{user && user.username}</Username>
          )}
          <Message
            empty={!message.text || !message.text.trim()}
            isCurrentUser={isCurrentUser}
            onClick={() => !editMode && setClicked(!clicked)}
          >
            {!editMode && messageText}
            {editMode && (
              <EditText
                value={messageText}
                onChange={e => {
                  setMessageText(e.target.value);
                }}
              />
            )}
            {isCurrentUser && clicked && (
              <>
                {!editMode && (
                  <MessageButton
                    id="EditButton"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditMode(true);
                    }}
                  >
                    &#x270E;
                  </MessageButton>
                )}
                {editMode && (
                  <MessageButton
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditMode(false);
                      update(
                        `${apiUrl}/messages/${message._id}`,
                        {
                          text: messageText,
                        },
                        currentUser.username
                      ).then(response => {
                        setDbUpdate(!dbUpdate);
                      });
                    }}
                  >
                    &#10003;
                  </MessageButton>
                )}
                <MessageButton
                  onClick={e => {
                    e.preventDefault();
                    remove(
                      `${apiUrl}/messages/${message._id}`,
                      currentUser.username
                    ).then(response => {
                      setDbUpdate(!dbUpdate);
                    });
                  }}
                >
                  &#x2715;
                </MessageButton>
              </>
            )}
          </Message>
          {clicked && (
            <CreatedAt>
              {message.createdAt &&
                new Date(
                  message.updatedAt ? message.updatedAt : message.createdAt
                ).toLocaleString()}
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

const MessageButton = styled.span`
  color: ${colors.white};
  border-radius: 1rem;
  margin-left: 0.5rem;
  padding: 0 0.3rem;
  :hover {
    color: ${colors.white};
  }
`;

const EditText = styled.textarea`
  background-color: inherit;
  outline: none;
  color: ${colors.white};
  margin: 1rem;
  padding: 1.5rem 0.5rem;
`;
