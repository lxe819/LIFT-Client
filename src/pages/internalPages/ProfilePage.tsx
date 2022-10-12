import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../models/parseJwt";

const SERVER = import.meta.env.VITE_SERVER

interface UserInfo {
    username: string; 
    email: string;
}


function ProfilePage({ token }: { token: string }) {

    const user_id = parseJwt(token).user_id; 
    const fetchUserURL = `${SERVER}/users/${user_id}`
    const [userDetails, setUserDetails] = useState<UserInfo>(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(fetchUserURL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setUserDetails(data[0])); 
    })

    return (
        <div>
            <h1>User Profile of {userDetails?.username}</h1>
            <h4>Username: {userDetails?.username}</h4>
            <h5>Email: {userDetails?.email}</h5>
            {/* <h5>Credit Card Number: </h5>
            <h5>Address: </h5> */}
            <h6>Gender: </h6>
            <h6>Fitness Level Progression: </h6>
            <p>Beginner, Intermediate, Advanced </p>
            <h6>Type of gym sports: </h6>
            <p>Simple Weightlifting, Olympic Weightlifting, Bodybuilding, Powerlifting, Cardio</p>
            <h6>Type of Gym exercises: </h6>
            <p>Squats, Deadlifts, Bench Press, Shoulder Press, Back Row, Biceps Curl, Triceps Dip, Calves, Abs, Lat Raises</p>
            <button onClick={() => navigate("/personal/profile/edit")}>Edit user details</button>
        </div>
    )
}; 

export default ProfilePage; 