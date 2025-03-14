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
      <h1>Users and Appointments</h1>
      {users.length > 0 ? (
        <ul className="user-list">
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