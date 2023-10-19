import Post from "./Post";

function PostList({posts, user, handleDeletePost, handleUpdatePostComment}){
    
    if (posts.length === 0){
        return null
    } else {
        return (
            <ul >
                {posts.sort((a,b) => b.id - a.id).map(post => (
                    <Post 
                    key={post.id} 
                    post={post} 
                    user={user}
                    handleDeletePost={handleDeletePost} 
                    handleUpdatePostComment={handleUpdatePostComment}
                    />))
                }
            </ul>
        )
    }
}

export default PostList;