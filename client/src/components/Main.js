import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import PostsMainPage from './PostsMainPage';
import Workouts from './Workouts';

function Main() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);

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

    // Fetch workouts data
    useEffect(() => {
        fetch('/workouts')
          .then((res) => res.json())
          .then((data) => setWorkouts(data))
          .catch((error) => console.error('Error fetching workouts:', error));
      }, []);
  
  function handleAddPost(new_post){
    setPosts([...posts, new_post])
  }

  return (
    <div id="mainContainer">
      <div id="mainLeft">
        <Profile users={users}/>
        <Workouts workouts={workouts} posts={posts}/>
      </div>
      <div id="mainRight">
        <PostsMainPage users={users} workouts={workouts} posts={posts} handleAddPost={handleAddPost}/>
      </div>
    </div>
  );
}

export default Main;