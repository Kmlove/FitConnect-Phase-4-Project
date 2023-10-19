import React, { useState, useEffect } from 'react';
import Blank from '../Images/HeadshotBlank.jpg';

function Profile({ user, onLogout }) {
  const [randomImageStyle, setRandomImageStyle] = useState({
    backgroundImage: `url('https://example.com/default-image.jpg')`,  // Replace with your default image URL
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  });
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

  useEffect(() => {
    // Fetch random images and update the state after the component is mounted
    const images = [
      'url(https://m.media-amazon.com/images/I/71t2iMRG+rL._AC_UF894,1000_QL80_.jpg)',
      'url(https://us.123rf.com/450wm/h4ckermodify/h4ckermodify2304/h4ckermodify230400207/201878018-gym-or-fitness-with-sunset-light-background-for-web-design-template-website.jpg?ver=6)',
      'url(https://i.pinimg.com/originals/b9/91/0d/b9910d35962fa812ee1dc7b25bc8d547.jpg)',
      'url(https://img.freepik.com/premium-photo/cartoon-gym-with-blue-background-blue-background_927978-2409.jpg)',
      'url(https://img.freepik.com/premium-photo/gym-with-purple-background-that-says-gym-it_902639-28881.jpg)',
      'url(https://img.freepik.com/premium-photo/gym-with-blue-background-man-standing-middle-it_927978-2498.jpg)',
      'url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlOF8zZF9jYXJ0b29uX3N0eWxlX3JlbmRlcl9vZl9maXRuZXNzX3NjZW5lX3dpdGhvdV8xZDAxNDQwYy03OWU2LTQ1NGUtODg1OS0yMjgwMjkzYmUwNmZfMS5qcGc.jpg)',
      'url(https://us.123rf.com/450wm/nsit0108/nsit01082307/nsit0108230701193/208046115-gym-empty-space-interior-workout-generate-ai.jpg)',
      'url(https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVtcHR5JTIwZ3ltfGVufDB8fDB8fHww&w=1000)',
      'url(https://cdn.shopify.com/s/files/1/0337/7469/files/Gym_Wall_Mural_Promo.jpg?v=1608137468)',
      'url(https://png.pngtree.com/thumb_back/fh260/background/20220428/pngtree-cartoon-gym-interior-room-with-sport-fitness-equipment-image_1111031.jpg)'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    setRandomImageStyle({
      ...randomImageStyle,
      backgroundImage: randomImage,
    });
  }, []); 

  return (
    <div id="profileContainerDiv" style={randomImageStyle}>
      <div className='profile-details-container'>
          <img id="headshot" src='https://picsum.photos/788/861' alt='profile photo' />
          <div>
              <h2 className='prof-name'>{user.username}</h2>
              <h3 className='prof-age'>Age: {user.age}</h3>
          </div>
      </div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;


