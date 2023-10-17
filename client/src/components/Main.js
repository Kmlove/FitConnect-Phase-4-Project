import React, { useState, useEffect } from 'react';
import Profile from './Profile';

function Main() {
  const [workouts, setWorkouts] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch workouts data
  useEffect(() => {
    fetch('/workouts')
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error('Error fetching workouts:', error));
  }, []);

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
  
  return (
    <div>
      <h1>Users</h1>
      <Profile imageURL={"*"} name={users}/>
    
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username}
            <br />
            <strong>Age:</strong> {user.age}
          </li>
        ))}
      </ul>

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

      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>Comments:</strong> {post.comments}
            <br />
            <strong>Workout ID:</strong> {post.workout_id}
            <br />
            <strong>User ID:</strong> {post.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;