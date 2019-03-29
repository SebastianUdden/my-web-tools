import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get } from '../../utils/api';
import { apiUrl } from '../../constants/urls';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';

export const Chat = ({ users, currentUser }) => {
  const [messages, setMessages] = useState(undefined);
  const [dbUpdate, setDbUpdate] = useState(false);
  // const currentUser =
  //   users &&
  //   users.find(user => localStorage.getItem('username') === user.username);
  // console.log('currentUser: ', currentUser);

  useEffect(() => {
    // if (
    //   users &&
    //   Array.isArray(users) &&
    //   users.length !== 0 &&
    //   !users.find(user => localStorage.getItem('username') === user.username)
    // ) {
    //   setLoggedIn(false);
    // }
    get(`${apiUrl}/messages`, currentUser.username).then(messages => {
      console.log('messages: ', messages);
      setMessages(messages);
    });
  }, [dbUpdate]);

  return (
    <ChatWrapper>
      <ChatBox>
        {messages &&
          Array.isArray(messages) &&
          messages.map((message, index) => {
            return (
              <ChatMessage
                key={message._id}
                message={message}
                isFirstMessage={
                  index === 0 ? true : messages[index - 1].user !== message.user
                }
                users={users}
                setDbUpdate={setDbUpdate}
                dbUpdate={dbUpdate}
                isCurrentUser={currentUser._id === message.user}
                currentUser={currentUser}
              />
            );
          })}
        <ChatInput
          userId={currentUser._id}
          messages={messages}
          setMessages={setMessages}
          setDbUpdate={setDbUpdate}
          dbUpdate={dbUpdate}
          currentUser={currentUser}
        />
      </ChatBox>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  padding: 0.5rem 0.8rem 4rem;
`;
const ChatBox = styled.div`
  min-height: 50vh;
`;
