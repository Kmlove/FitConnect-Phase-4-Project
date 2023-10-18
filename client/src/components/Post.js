import { useState } from "react"
import EditPostForm from './EditPostForm.js'

function Post({post, handleDeletePost, handleUpdatePostComment}){
    const [edit, setEdit] = useState(false)

    function handleDeleteClick(e){
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

    function handleEditClick(e){
        setEdit(edit => !edit)
    }

    return(
        <li key={post.id} className="post-list-item">
            <div>
                <strong>User:</strong> {post.user.username}
                <br />
                <strong>Workout:</strong> {post.workout.name}
                <br />
                <strong>Comment:</strong> {post.comments}
                {edit ? <EditPostForm post={post} handleUpdatePostComment={handleUpdatePostComment}/> : null}
            </div>
            <div id='post-buttons'>
                <button onClick={handleDeleteClick} className='post-delete-button'>✖</button>
                <button onClick={handleEditClick} className='post-edit-button'>🖋</button>
            </div>
        </li>
    )
}

export default Post;