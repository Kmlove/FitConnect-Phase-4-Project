import {useState} from "react";

function PostForm({workouts, user, handleAddPost}){
    const initialValue = {
        workout_id: '',
        comments: ""
    }
    const [workoutFormData, setWorkoutFormData] = useState(initialValue)

    if (user.length === 0){
        return  <h3>Loading...</h3>
    } else{
        const currUser = user
        const {age, id,  username } = currUser

        function handleChange(e){
            const { name, value } = e.target;
            setWorkoutFormData(
                {
                    ...workoutFormData,
                    [name]: value
                }
            )
        }

        function handleSubmit(e){
            e.preventDefault()
            if (workoutFormData.workout_id === ""){
                alert("Please select a workout before submiting a post")
            } else if(workoutFormData.comments === ""){
                alert("Please write a comment before submiting a post")
            } else{
                const new_post = {
                    ...workoutFormData,
                    user_id: id
                }
    
                fetch('/posts', {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(new_post)
                })
                .then(res => res.json())
                .then(data => {
                    handleAddPost(data)
                    document.getElementById("workout_id").value=""
                    setWorkoutFormData(initialValue)
                })
            }
        }

        return(
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-elements">
                    <label htmlFor="workout_id" className="form-label">
                        Select a Workout:
                    </label>
                    <select
                        className="form-select"
                        name="workout_id"
                        id="workout_id"
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        {workouts.map((workout) => {
                        return (
                            <option key={workout.id} value={workout.id}>
                            {workout.name}
                            </option>
                        );
                        })}
                    </select>
                </div>
                <div className="form-element">
                    <label htmlFor="comments" className="form-label">
                        What did you think about the workout?
                    </label>
                    <textarea
                        className="form-textarea"
                        onChange={handleChange}
                        value={workoutFormData.comments}
                        name="comments"
                        id="comments"
                    ></textarea>
                </div>
                <input type="submit" className="form-button" />
            </form>
        )
    }
}

export default PostForm;