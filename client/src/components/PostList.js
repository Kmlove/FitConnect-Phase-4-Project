import Post from "./Post";

function PostList({posts, handleDeletePost}){

    if (posts.length === 0){
        return null
    } else {
        return (
            <ul>
                {posts.map(post => <Post key={post.id} post={post} handleDeletePost={handleDeletePost}/> )}
            </ul>
        )
    }
}

export default PostList;