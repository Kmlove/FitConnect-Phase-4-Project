import { useState } from "react";
import "./EditPostForm.css"

function EditPostForm({post, handleUpdatePostComment, handleEditClick}){
    const [comments, setComments] = useState(post.comments)

    function handleChange(e){
        setComments(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        fetch(`posts/${post.id}`, {
            method: "PATCH",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({comments: comments})
        })
        .then(res => {
            if (res.status === 202){
                return res.json()
            } else if (res.status === 400){
                alert(`Please enter a comment before submiting`)
            }
        })
        .then(data => {
            handleUpdatePostComment(data)
        })
        .catch(err => console.log(err))
        handleEditClick()
    }
    
    return (
        <form className="edit-post-form" onSubmit={handleSubmit}>
            <textarea className='edit-form-textarea' name='comments' type='text' value={comments} onChange={handleChange}></textarea>
            <input type="submit" className="form-button"/>
        </form>
    )
}

export default EditPostForm;