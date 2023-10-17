import React, { useState, useEffect } from 'react';

function Workouts({workouts, posts}) {
  
  const [selectedWorkout, setSelectedWorkout] = useState(null);
 
  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };
  
  if (workouts === undefined){
    return <h3>Loading...</h3>
  } else {
      return (
        <div id="workoutsContainerDiv">
          <h2>Workouts:</h2>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id} onClick={() => handleWorkoutClick(workout)}>
                <strong>Name:</strong> {workout.name}
                <br />
                <strong>Type:</strong> {workout.type}
              </li>
            ))}
          </ul>
    
          {selectedWorkout && (
            <div>
              <h2>Selected Workout:</h2>
              <p>
                <strong>Name:</strong> {selectedWorkout.name}
              </p>
              <p>
                <strong>Type:</strong> {selectedWorkout.type}
              </p>
              <p>
                {selectedWorkout.set_1_name} {selectedWorkout.set_1_sets}
                <br />
                {selectedWorkout.set_1_reps}
                <br />
                {selectedWorkout.set_2_name} {selectedWorkout.set_2_sets}
                <br />
                {selectedWorkout.set_2_reps}
                <br />
                {selectedWorkout.set_3_name} {selectedWorkout.set_3_sets}
                <br />
                {selectedWorkout.set_3_reps}
              </p>
    
              <h2>Comments:</h2>
              <ul>
                {posts
                  .filter((post) => post.workout_id === selectedWorkout.id)
                  .map((post) => (
                    <li key={post.id}>
                        <strong>User ID:</strong> {post.user_id}
                        <br />
                        <strong>Comments:</strong> {post.comments}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
}

export default Workouts;
