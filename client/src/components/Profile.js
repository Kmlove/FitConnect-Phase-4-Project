function Profile({users}){
    if (users.length === 0){
        return  <h3>Loading...</h3>
    } else{
        const currUser = users[0]
        const {age, id, password, username } = currUser
    
        return (
            <div>
                <img src="" alt={`Image of ${username}`}/>
                <h2>{username}</h2>
                <h3>Age: {age}</h3>
            </div>
        )
    }

}

export default Profile;