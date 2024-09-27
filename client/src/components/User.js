// If anyone is having struggles passing around props for the current user I suggest looking into useContext / redux.  
// I wouldn't look into it too long though - maybe do a couple of tutorials and see if its in your bandwith.  
// Its supposed to make state easier to access from any component (almost like a global state).

import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default User;