function Post({post}){
    return(
        <li key={post.id} className="post-list-item">
            <strong>User:</strong> {post.user.username}
            <br />
            <strong>Workout:</strong> {post.workout.name}
            <br />
            <strong>Comment:</strong> {post.comments}  
        </li>
    )
}

export default Post;