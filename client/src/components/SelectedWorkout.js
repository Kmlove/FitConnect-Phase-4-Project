function SelectedWorkout({selectedWorkout}){
    return (
        <div className="selected-workout">
            <p className="selected-workout-name">
                <strong> Name:</strong> {selectedWorkout.name}
            </p>
            <p className="selected-workout-program">
                <strong>Program: </strong> 
                {selectedWorkout.set_1_name} <span className="sets-reps">{selectedWorkout.set_1_sets} x {selectedWorkout.set_1_reps}</span> |  {selectedWorkout.set_2_name} <span className="sets-reps">{selectedWorkout.set_2_sets} x {selectedWorkout.set_2_reps}</span> | {selectedWorkout.set_3_name} <span className="sets-reps">{selectedWorkout.set_3_sets} x {selectedWorkout.set_3_reps}</span>
            </p>
            <p className="selected-workout-type">
                <strong>Type:</strong> {selectedWorkout.type}
            </p>
        </div>
     )
  }
  
  export default SelectedWorkout;