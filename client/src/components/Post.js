function Post({post, handleDeletePost}){
    function handleClick(e){
        fetch(`/posts/${post.id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.status === 204){
                handleDeletePost(post)
            } else {
                console.log('Delete operation failed')
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <li key={post.id} className="post-list-item">
            <strong>User:</strong> {post.user.username}
            <br />
            <strong>Workout:</strong> {post.workout.name}
            <br />
            <strong>Comment:</strong> {post.comments}
            <button onClick={handleClick}>X</button>  
        </li>
    )
}

export default Post;