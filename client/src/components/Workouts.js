import { useState } from "react";
import WorkoutForm from './WorkoutForm';
import "./Workouts.css"
function Workouts({workouts, selectedWorkout, handleChangeSelectedWorkout, handleAddWorkout}) {

  const [addWorkout, setAddWorkout] = useState(false)
 
  const handleWorkoutClick = (workout) => {
    if (selectedWorkout === null){
      console.log(workout)
      handleChangeSelectedWorkout(workout)
    } else if (selectedWorkout.id === workout.id){
      console.log(workout)
      handleChangeSelectedWorkout(null)
    } else {
      console.log(workout)
      handleChangeSelectedWorkout(workout)
    }
  };

  function handleChangeWorkoutAdd() {
    setAddWorkout(!addWorkout)
  }

  const workoutsUl = <ul>
                      {workouts.map((workout) => (
                        <li key={workout.id} onClick={() => handleWorkoutClick(workout)} className='workout-list-item'>
                          <strong>Workout:</strong> {workout.name}
                          <br />
                          <strong>Type:</strong> {workout.type}
                        </li>
                      ))}
                    </ul>
  
  if (workouts === undefined){
    return <h3>Loading...</h3>
  } else {
      return (
        <div id="workoutsContainerDiv">
          <div className="workouts-title">
                <h1 className='section-headers'>{addWorkout ? 'Add Workout' : 'Workouts'}</h1>
                <p className='workouts-plus-btn' onClick={handleChangeWorkoutAdd}>{addWorkout ? '-' : '+'}</p>
          </div>
          {addWorkout ? <WorkoutForm handleAddWorkout={handleAddWorkout} /> : workoutsUl}
        </div>
      );
    }
}

export default Workouts;
