import PostForm from "./PostForm"
import PostList from "./PostList"
import SelectedWorkout from "./SelectedWorkout"

function PostsMainPage({posts, workouts, user, handleAddPost, selectedWorkout, handleChangeSelectedWorkout, handleDeletePost, handleUpdatePostComment}){

    const workoutName = selectedWorkout ? selectedWorkout.name : "All"
    
    return(
        <div id="postsMainPageContainerDiv">
            <h1 className="section-headers">Add a Post:</h1>
            <PostForm 
                user={user} 
                workouts={workouts} 
                handleAddPost={handleAddPost}
            />
            {selectedWorkout && <SelectedWorkout selectedWorkout={selectedWorkout}/>}
            <h1 className="section-headers">{workoutName} Posts</h1>
            {selectedWorkout ? <button className="form-button" onClick={e => handleChangeSelectedWorkout(null)}>Show All Post</button> : null}
            <PostList 
                posts={posts} 
                handleDeletePost={handleDeletePost}
                handleUpdatePostComment={handleUpdatePostComment}
            />
        </div>
    )
}

export default PostsMainPage;