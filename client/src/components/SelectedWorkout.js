function SelectedWorkout({selectedWorkout}){
    return (
        <div className="selected-workout">
            <h1 className="section-headers">Selected Workout</h1>
            <p>
                <strong> Name:</strong> {selectedWorkout.name}
            </p>
            <p>
                <strong>Type:</strong> {selectedWorkout.type}
            </p>
            <p>
                <strong>Program: </strong> 
                {selectedWorkout.set_1_name} <span className="sets-reps">{selectedWorkout.set_1_sets} x {selectedWorkout.set_1_reps}</span> |  {selectedWorkout.set_2_name} <span className="sets-reps">{selectedWorkout.set_2_sets} x {selectedWorkout.set_2_reps}</span> | {selectedWorkout.set_3_name} <span className="sets-reps">{selectedWorkout.set_3_sets} x {selectedWorkout.set_3_reps}</span>
            </p>
        </div>
     )
}

export default SelectedWorkout;