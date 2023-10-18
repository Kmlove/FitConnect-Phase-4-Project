import React from 'react';
import Blank from '../Images/HeadshotBlank.jpg';

function Profile({ user, onLogout }) {
  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 204) {

          onLogout();
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  };

  return (
    <div id="profileContainerDiv">
      <img id="headshot" src={Blank} alt={`Image of ${user.username}`} />
      <h2>{user.username}</h2>
      <h3>Age: {user.age}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
