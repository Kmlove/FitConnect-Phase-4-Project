import Blank from '../Images/HeadshotBlank.jpg'

function Profile({users}){
    if (users.length === 0){
        return  <h3>Loading...</h3>
    } else{
        const currUser = users[0]
        const {age, id, password, username } = currUser
    
        const imageURL = "/client/src/Images/HeadshotBlank.jpg"
        
        return (
            <div id="profileContainerDiv">
                <img id="headshot" src={Blank} alt={`Image of ${username}`}/>
                <h2>{username}</h2>
                <h3>Age: {age}</h3>
            </div>
        )
    }

}

export default Profile;