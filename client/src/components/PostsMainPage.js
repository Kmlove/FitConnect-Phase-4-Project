import PostForm from "./PostForm"
import PostList from "./PostList"
import SelectedWorkout from "./SelectedWorkout"

function PostsMainPage({ posts, workouts, user, handleAddPost, selectedWorkout, handleChangeSelectedWorkout, handleDeletePost, handleUpdatePostComment }) {
  const workoutName = selectedWorkout ? selectedWorkout.name : "All";

  return (
    <div id="postsMainPageContainerDiv">
      <h1 className="section-headers">{workoutName} Posts</h1>
      {selectedWorkout ? <button onClick={e => handleChangeSelectedWorkout(null)} className="form-button">Show All Post</button> : null}
      {selectedWorkout && <SelectedWorkout selectedWorkout={selectedWorkout} />}
      <PostForm
        user={user}
        workouts={workouts}
        handleAddPost={handleAddPost}
      />
      <PostList handleDeletePost={handleDeletePost} user={user} posts={posts} handleUpdatePostComment={handleUpdatePostComment}/>
    </div>
  )
}

export default PostsMainPage;
