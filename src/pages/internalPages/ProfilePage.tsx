import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../models/parseJwt";

const SERVER = import.meta.env.VITE_SERVER;

interface UserInfo {
  user_id: number;
  username: string;
  email: string;
  admin: boolean;
  gender: string;
  gym_exp_level: number;
}

function ProfilePage({ token }: { token: string }) {
  const user_id = parseJwt(token).user_id;
  const fetchUserURL = `${SERVER}/users/${user_id}`;
  const [userDetails, setUserDetails] = useState<UserInfo>();
  const navigate = useNavigate();

  const checkGymExpLvl = () => {
    if (userDetails?.gym_exp_level === 1) {
      return <h6>Gym Experience Level: Beginner</h6>;
    } else if (userDetails?.gym_exp_level === 2) {
      return <h6>Gym Experience Level: Intermediate</h6>;
    } else if (userDetails?.gym_exp_level === 3) {
      return <h6>Gym Experience Level: Advanced</h6>;
    } else {
      return <h6>Gym Experience Level: Not provided</h6>;
    }
  };

  useEffect(() => {
    fetch(fetchUserURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserDetails(data[0]));
  }, []);

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <h1 className="mb-4 fw-bold">
            User Profile of {userDetails?.username}
          </h1>
          <div className="mb-4">
            <h4 className="fw-bold">Required User Details</h4>
            <h6>Username: {userDetails?.username}</h6>
            <h6>Email: {userDetails?.email}</h6>
          </div>

          <div className="mb-4">
            <h4 className="fw-bold">Additional user information</h4>
            {userDetails?.gender ? (
              <h6>Gender: {userDetails?.gender}</h6>
            ) : (
              <h6>Gender: Not provided</h6>
            )}
            {checkGymExpLvl()}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/personal/profile/edit")}
          >
            Edit user details
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

{
  /* <h6>Type of gym sports: </h6>
<p>Simple Weightlifting, Olympic Weightlifting, Bodybuilding, Powerlifting, Cardio</p>
<h6>Type of Gym exercises: </h6>
<p>Squats, Deadlifts, Bench Press, Shoulder Press, Back Row, Biceps Curl, Triceps Dip, Calves, Abs, Lat Raises</p> */
}
