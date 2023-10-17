import {useState} from "react";

function PostForm({workouts, users, handleAddPost}){
    const initialValue = {
        workout_id: '',
        comments: ""
    }
    const [workoutFormData, setWorkoutFormData] = useState(initialValue)

    if (users.length === 0){
        return  <h3>Loading...</h3>
    } else{
        const currUser = users[0]
        const {age, id, password, username } = currUser

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="workout_id">Select a Workout:</label>
                <select name="workout_id" id="workout_id" onChange={handleChange}>
                    <option value=''></option>
                    {workouts.map(workout => {
                        return (
                            <option 
                                key={workout.id} 
                                value={workout.id}>
                                {workout.name}
                            </option>
                        )
                    })}
                </select>
                <label htmlFor="comments">What did you think about the workout?</label>
                <textarea onChange={handleChange} value={workoutFormData.comments} name="comments" id="commments"></textarea>
                <input type="submit"/>
            </form>
        )
    }
}

export default PostForm;