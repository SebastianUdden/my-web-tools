import React, { useState } from 'react';
import styled from 'styled-components';

import { update } from '../../utils/api';
import { colors } from '../../constants/colors';
import { Avatar } from './Avatar';
import { apiUrl, defaultImageUrl } from '../../constants/urls';

export const User = ({ user, isCurrentUser, updateUsers, setUpdateUsers }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [location, setLocation] = useState(user.location);
  const [image, setImage] = useState(user.image);

  return (
    <UserWrapper
      isCurrentUser={isCurrentUser}
      expandedView={expandedView}
      onClick={() => setExpandedView(!expandedView)}
    >
      <AvatarWrapper>
        <Avatar
          image={user.image || defaultImageUrl}
          isVisible={true}
          margin={'0 0.5rem 0 0'}
          size={expandedView ? 5 : 3}
        />
        <Username>{username}</Username>
        {!editMode && isCurrentUser && (
          <MessageButton
            id="EditButton"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setExpandedView(true);
              setEditMode(true);
            }}
          >
            &#x270E;
          </MessageButton>
        )}
        {editMode && (
          <>
            <MessageButton
              onClick={() => {
                setEditMode(false);
                setUsername(user.username);
                setFirstname(user.firstname);
                setLastname(user.lastname);
                setLocation(user.location);
                setImage(user.image);
              }}
            >
              &#8592;
            </MessageButton>
            <MessageButton
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setEditMode(false);
                update(
                  `${apiUrl}/users/${user._id}`,
                  {
                    ...user,
                    username,
                    firstname,
                    lastname,
                    location,
                    image,
                  },
                  user.username
                ).then(response => {
                  localStorage.setItem('username', username);
                  console.log('CHAT-UPDATE-BUTTON-response: ', response);
                  setUpdateUsers(!updateUsers);
                });
              }}
            >
              &#10003;
            </MessageButton>
          </>
        )}
      </AvatarWrapper>
      {expandedView && (
        <>
          {!editMode && (
            <>
              <Info>
                <EditLabel>Full name:</EditLabel> {firstname} {lastname}
              </Info>
              <Info>
                <EditLabel>Location:</EditLabel> {location}
              </Info>
              <Info>
                <EditLabel>Signed up:</EditLabel>{' '}
                {new Date(user.createdAt).toLocaleString()}
              </Info>
              <Info>
                <EditLabel>Latest log in:</EditLabel>{' '}
                {new Date(user.updatedAt).toLocaleString()}
              </Info>
            </>
          )}
          {editMode && (
            <EditWrapper>
              <EditLabel>Username</EditLabel>
              <EditText
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
              <EditLabel>First name</EditLabel>
              <EditText
                value={firstname}
                onChange={e => {
                  setFirstname(e.target.value);
                }}
              />
              <EditLabel>Last name</EditLabel>
              <EditText
                value={lastname}
                onChange={e => {
                  setLastname(e.target.value);
                }}
              />
              <EditLabel>Location</EditLabel>
              <EditText
                value={location}
                onChange={e => {
                  setLocation(e.target.value);
                }}
              />
              <EditLabel>Image URL</EditLabel>
              <EditText
                value={image}
                onChange={e => {
                  setImage(e.target.value);
                }}
              />
              <Avatar
                image={image || defaultImageUrl}
                isVisible={true}
                margin={'0 auto'}
                size={10}
              />
            </EditWrapper>
          )}
        </>
      )}
    </UserWrapper>
  );
};

const UserWrapper = styled.div`
  background-color: ${colors.darkGrey};
  border-radius: 0.5rem;
  padding: ${p => (p.expandedView ? '1rem 0.6rem' : '0 0.5rem')};
  margin: 0.5rem auto;
  border: ${p => (p.isCurrentUser ? '1px solid white' : 'none')};
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  :hover {
    color: ${colors.orange};
  }
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

const MessageButton = styled.span`
  color: ${colors.white};
  border-radius: 1rem;
  margin-left: 0.5rem;
  padding: 0 0.3rem;
  cursor: pointer;
  :hover {
    color: ${colors.orange};
  }
`;

const EditLabel = styled.label`
  color: ${colors.brightGrey};
`;

const EditText = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.white};
  margin: 0 0 1rem 0;
  padding: 0.5rem 0.5rem;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
