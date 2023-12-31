import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import PostsMainPage from './PostsMainPage';
import Workouts from './Workouts';
import WorkoutForm from './WorkoutForm';
import { useNavigate } from 'react-router-dom';

function Main({user,setUser}) {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

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

  function handleDisplayToast(){
    const toast = document.querySelector('.Toastify__toast-container div[id="1"]')
    if(toast){
        toast.style.display = 'flex'
    }
  }

  function handleAddPost(new_post){
    setPosts([...posts, new_post])
  }

  function handleChangeSelectedWorkout(workout){
    setSelectedWorkout(workout)
  }

  function handleDeletePost(deletedPost){
    const updatedPosts = posts.filter(post => post.id !== deletedPost.id)
    setPosts(updatedPosts)
  }

  function handleUpdatePostComment(updatedPost){
    const updatedPosts = posts.map(post => {
      if (post.id === updatedPost.id){
        return updatedPost
      } else {
        return post
      }
    })
    setPosts(updatedPosts)
  }

  let postsToDisplay
  if (selectedWorkout === null){
    postsToDisplay = posts
  } else {
    postsToDisplay = posts.filter((post) => post.workout_id === selectedWorkout.id)
  }

  const handleLogout = () => {
      setUser(null);
      handleDisplayToast()
      navigate('/')
  };

  return (
    <div id="mainContainer">
      <div id="mainLeft">
        <Profile user={user} onLogout={handleLogout} />
        <Workouts
          workouts={workouts}
          selectedWorkout={selectedWorkout}
          handleChangeSelectedWorkout={handleChangeSelectedWorkout}
          handleAddWorkout={handleAddWorkout}
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
          handleDeletePost={handleDeletePost}
          handleUpdatePostComment={handleUpdatePostComment}
        />
      </div>
    </div>
  );
}

export default Main;