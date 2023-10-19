import React, { useState } from 'react';

function WorkoutForm({ handleAddWorkout, handleChangeWorkoutAdd }) {

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
      .then(response => response.json())
      .then(data => handleAddWorkout(data))
      .catch(error => {
        console.error('An error occurred:', error);
      });

    setWorkoutData(initialValue);
    handleChangeWorkoutAdd();
  };
  
  return (
    <div id='workout-form-container'>
      <form className='workout-form' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Name of Workout'
            id="name"
            required={true}
            name="name"
            className='workout-form-name'
            value={workoutData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="type"
            required={true}
            placeholder='Type of Workout'
            name="type"
            className='workout-form-type'
            value={workoutData.type}
            onChange={handleInputChange}
          />
        <div className='workout-form-row'>
              <div className= 'workout-form-cols'>
                <input
                  type="text"
                  id="set1Name"
                  required={true}
                  placeholder='Set 1 Name'
                  name="set1Name"
                  className='form-set-input'
                  value={workoutData.set1Name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  id="set1Sets"
                  required={true}
                  placeholder='Set 1 Sets'
                  name="set1Sets"
                  className='form-set-input'
                  value={workoutData.set1Sets}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  placeholder='Set 1 Reps'
                  id="set1Reps"
                  required={true}
                  name="set1Reps"
                  className='form-set-input'
                  value={workoutData.set1Reps}
                  onChange={handleInputChange}
                />
              </div>
              <div className= 'workout-form-cols'>
                    <input
                      type="text"
                      id="set2Name"
                      placeholder='Set 2 Name (Optional)'
                      name="set2Name"
                      className='form-set-input'
                      value={workoutData.set2Name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      id="set2Sets"
                      placeholder='Set 2 Sets (Optional)'
                      name="set2Sets"
                      className='form-set-input'
                      value={workoutData.set2Sets}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder='Set 2 Reps (Optional)'
                      id="set2Reps"
                      name="set2Reps"
                      className='form-set-input'
                      value={workoutData.set2Reps}
                      onChange={handleInputChange}
                    />
              </div>
              <div className= 'workout-form-cols'>
                  <input
                    type="text"
                    id="set3Name"
                    placeholder='Set 3 Name (Optional)'
                    name="set3Name"
                    className='form-set-input'
                    value={workoutData.set3Name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    id="set3Sets"
                    placeholder='Set 3 Sets (Optional)'
                    name="set3Sets"
                    className='form-set-input'
                    value={workoutData.set3Sets}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    placeholder='Set 3 Reps (Optional)'
                    id="set3Reps"
                    name="set3Reps"
                    className='form-set-input'
                    value={workoutData.set3Reps}
                    onChange={handleInputChange}
                  />
            </div>
        </div>
          <button type="submit">Add Workout</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
