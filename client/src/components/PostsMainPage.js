import PostForm from "./PostForm"
import PostList from "./PostList"

function PostsMainPage({posts, workouts, users, handleAddPost}){

    return(
        <div>
            <h1>Add a Post:</h1>
            <PostForm users={users} workouts={workouts} handleAddPost={handleAddPost}/>
            <h1>Posts</h1>
            <PostList posts={posts}/>
        </div>
    )
}

export default PostsMainPage;