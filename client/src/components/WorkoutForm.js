import React, { useState } from 'react';

function WorkoutForm({ handleAddWorkout }) {

    const initialValue = {
        name: '',
        type: '',
        set1Name: '',
        set1Sets: '',
        set1Reps: '',
        set2Name: '',
        set2Sets: '',
        set2Reps: '',
        set3Name: '',
        set3Sets: '',
        set3Reps: '',
    }
  const [workoutData, setWorkoutData] = useState(initialValue);

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = (event) => {
    handleAddWorkout(workoutData);
    event.preventDefault();
    const formData = {
      name: workoutData.name,
      type: workoutData.type,
      set_1_name: workoutData.set1Name,
      set_1_sets: workoutData.set1Sets,
      set_1_reps: workoutData.set1Reps,
      set_2_name: workoutData.set2Name,
      set_2_sets: workoutData.set2Sets,
      set_2_reps: workoutData.set2Reps,
      set_3_name: workoutData.set3Name,
      set_3_sets: workoutData.set3Sets,
      set_3_reps: workoutData.set3Reps,
    };
  
    // Send a POST request to the Flask server
    fetch('/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.status === 201) {
          console.log('Workout created successfully');
        } else if (response.status === 400) {
          console.error('Validation errors');
        } else {
          console.error('An error occurred');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });

    setWorkoutData(initialValue);
  };
  
  return (
    <div>
      <h2>Add a New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={workoutData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={workoutData.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="set1Name">Set 1 Name:</label>
          <input
            type="text"
            id="set1Name"
            name="set1Name"
            value={workoutData.set1Name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="set1Sets">Set 1 Sets:</label>
          <input
            type="number"
            id="set1Sets"
            name="set1Sets"
            value={workoutData.set1Sets}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="set1Reps">Set 1 Reps:</label>
          <input
            type="number"
            id="set1Reps"
            name="set1Reps"
            value={workoutData.set1Reps}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <button type="submit">Add Workout</button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
