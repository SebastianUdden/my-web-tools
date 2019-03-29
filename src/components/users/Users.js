import React from 'react';
import { User } from './User';

export const Users = ({ currentUser, users }) => (
  <div>
    {users &&
      Array.isArray(users) &&
      users.map(user => {
        return (
          <User
            isCurrentUser={currentUser.username === user.username}
            user={user}
          />
        );
      })}
  </div>
);
