import React from 'react';
import styled from 'styled-components';
import { User } from './User';

const Users = ({ currentUser, users, updateUsers, setUpdateUsers }) => (
  <UsersWrapper>
    <User
      isCurrentUser={true}
      user={currentUser}
      updateUsers={updateUsers}
      setUpdateUsers={setUpdateUsers}
    />
    {users &&
      Array.isArray(users) &&
      users
        .filter(user => user.username !== currentUser.username)
        .map(user => {
          return (
            <User
              key={user.username}
              isCurrentUser={currentUser.username === user.username}
              user={user}
              updateUsers={updateUsers}
              setUpdateUsers={setUpdateUsers}
            />
          );
        })}
  </UsersWrapper>
);

const UsersWrapper = styled.div`
  margin: 0.5rem;
  padding: 0;
  width: 100%;
`;

export default Users;
