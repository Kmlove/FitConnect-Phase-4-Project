function Workouts({workouts, selectedWorkout, handleChangeSelectedWorkout}) {
 
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
  
  if (workouts === undefined){
    return <h3>Loading...</h3>
  } else {
      return (
        <div id="workoutsContainerDiv">
          <h1 className='section-headers'>Workouts</h1>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id} onClick={() => handleWorkoutClick(workout)} className='workout-list-item'>
                <strong>Name:</strong> {workout.name}
                <br />
                <strong>Type:</strong> {workout.type}
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

export default Workouts;
