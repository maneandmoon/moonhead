import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatDate from '../formatDate';

function UserDetail() {
  const { id } = useParams();  // Get the user ID from URL parameters
  const navigate = useNavigate();  // For navigation after delete
  const [user, setuser] = useState(null);  // State to hold the user data
  const [loading, setLoading] = useState(true);  // State for loading indicator

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/users/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then(userData => {
        setuser(userData);  // Store fetched user in state
      })
      .catch(err => {
        console.error("Unable to fetch user details:", err);
      })
      .finally(() => {
        setLoading(false);  // Stop loading once data is fetched
      });
  }, [id]);

//   Delete user by ID

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5555/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          alert("user deleted successfully");
          navigate('/users');  // Redirect to the users list page
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch(err => {
        console.error("Error deleting user:", err);
      });
  };

  if (loading) {
    return <div>Loading user...</div>; 
  }

  if (!user) {
    return <div>No user found.</div>; 
  }

  return (
    <div>
      <ul className="user-card">
      <h2>User Profile</h2>
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Birthdate: {formatDate(user.birthdate)}</p>
      <button 
        onClick={handleDelete} 
        style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Delete</button>
      </ul>
    </div>
  );
}

export default UserDetail;