import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import PostsMainPage from './PostsMainPage';

function Main() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch users data
  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch posts data
  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);
  
  function handleAddPost(new_post){
    setPosts([...posts, new_post])
  }

  return (
    <div>
      
      <Profile users={users}/>

      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <strong>Name:</strong> {workout.name}
            <br />
            <strong>Type:</strong> {workout.type}
          </li>
        ))}
      </ul>

      <PostsMainPage users={users} workouts={workouts} posts={posts} handleAddPost={handleAddPost}/>
      
    </div>
  );
}

export default Main;