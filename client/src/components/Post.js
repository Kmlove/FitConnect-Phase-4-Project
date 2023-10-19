import { useState } from "react"
import EditPostForm from './EditPostForm.js'

function Post({post, user, handleDeletePost, handleUpdatePostComment}){
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

    const postButtons = <div id='post-buttons'>
                            <button onClick={handleDeleteClick} className='post-delete-button'>✖</button>
                            <button onClick={handleEditClick} className='post-edit-button'>✏️</button>
                        </div>

    return(
        <li key={post.id} className="post-list-item">
            <div className="post-list-container">
                <div className="post-list-photo-div">
                    <img className="post-list-profile-picture" src={post.user.image_url} alt='profile photo' width={'30px'} height={'auto'} />{'@' + post.user.username}
                </div>
                <div className="post-list-header-div">
                    <strong className="post-list-header">{post.workout.name}</strong>
                </div>
                {post.comments}
                {edit ? <EditPostForm handleEditClick={handleEditClick} post={post} handleUpdatePostComment={handleUpdatePostComment}/> : null}
            </div>
            {post.user_id === user.id ? postButtons : ""}
        </li>
    )
}

export default Post;