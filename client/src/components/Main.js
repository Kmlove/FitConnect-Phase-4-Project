import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import PostsMainPage from './PostsMainPage';
import Workouts from './Workouts';

function Main({user}) {
  // const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Fetch users data
  // useEffect(() => {
  //   fetch('/users')
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.error('Error fetching users:', error));
  // }, []);

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

  function handleChangeSelectedWorkout(workout){
    setSelectedWorkout(workout)
  }

  let postsToDisplay
  if (selectedWorkout === null){
    postsToDisplay = posts
  } else {
    postsToDisplay = posts.filter((post) => post.workout_id === selectedWorkout.id)
  }

  return (
    <div id="mainContainer">
      <div id="mainLeft">
        <Profile user={user}/>
        <Workouts 
          workouts={workouts} 
          selectedWorkout={selectedWorkout} 
          handleChangeSelectedWorkout={handleChangeSelectedWorkout}
        />
      </div>
      <div id="mainRight">
        <PostsMainPage 
          user={user} 
          workouts={workouts} 
          posts={postsToDisplay} 
          handleAddPost={handleAddPost} 
          selectedWorkout={selectedWorkout}
          handleChangeSelectedWorkout={handleChangeSelectedWorkout}
        />
      </div>
    </div>
  );
}

export default Main;