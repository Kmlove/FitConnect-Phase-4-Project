import PostForm from "./PostForm"
import PostList from "./PostList"
import SelectedWorkout from "./SelectedWorkout"

function PostsMainPage({posts, workouts, users, handleAddPost, selectedWorkout, handleChangeSelectedWorkout}){
    const workoutName = selectedWorkout ? posts[0].workout.name : "All"

    return(
        <div id="postsMainPageContainerDiv">
            <h1 className="section-headers">Add a Post:</h1>
            <PostForm 
                users={users} 
                workouts={workouts} 
                handleAddPost={handleAddPost}
            />
            {selectedWorkout && <SelectedWorkout selectedWorkout={selectedWorkout}/>}
            <h1 className="section-headers">{workoutName} Posts</h1>
            {selectedWorkout ? <button onClick={e => handleChangeSelectedWorkout(null)}>Show All Post</button> : null}
            <PostList posts={posts}/>
        </div>
    )
}

export default PostsMainPage;