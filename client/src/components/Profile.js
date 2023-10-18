import Blank from '../Images/HeadshotBlank.jpg'

function Profile({user}){
    // if (user.length === 0){
    //     return  <h3>Loading...</h3>
    // } else{
    //     const currUser = user
    //     const {age, id, username } = currUser
    
    //     const imageURL = "/client/src/Images/HeadshotBlank.jpg"
            
        return (
            <div id="profileContainerDiv">
                <img id="headshot" src={Blank} alt={`Image of ${user.username}`}/>
                <h2>{user.username}</h2>
                <h3>Age: {user.age}</h3>
            </div>
        )
    

}

export default Profile;