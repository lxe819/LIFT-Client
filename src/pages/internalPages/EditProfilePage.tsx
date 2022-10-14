import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
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

function EditProfilePage({ token }: { token: string }) {
  const user_id = parseJwt(token).user_id;
  const fetchUserURL = `${SERVER}/users/${user_id}`;
  const [userDetails, setUserDetails] = useState<UserInfo>();

  useEffect(() => {
    fetch(fetchUserURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserDetails(data[0]));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userDetails?.username,
      email: userDetails?.email,
      gender: userDetails?.gender,
      gymExperience: userDetails?.gym_exp_level,
      // gymSports: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(50, "Must be at most 50 characters")
        .required("*Required"),
      email: Yup.string().email("Invalid email").required("*Required"),
      gender: Yup.string(),
      gymExperience: Yup.string(),
      // gymSports: Yup.string(),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      fetch(fetchUserURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => alert(data.message));


      // const res = await fetch(fetchUserURL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      // const data = await res.json();
      // console.log("Response upon account creation:", data);
    },
  });

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <h1 className="fw-bold mb-4">EDIT PROFILE</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div className="mb-3 d-grid col-2">
              <label>
                Username:
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </label>
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>

            {/* Email */}
            <div className="mb-3 d-grid col-2">
              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Gender */}
            <div className="mb-3 d-grid col-2">
              <label>
                Gender:
                <select
                  className="form-control"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option value="">Please select option</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </label>
              {formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
            </div>

            {/* Gym Exp */}
            <div className="mb-3 d-grid col-2">
              <label>
                Gym Experience:
                <select
                  className="form-control"
                  name="gymExperience"
                  onChange={formik.handleChange}
                  value={formik.values.gymExperience}
                >
                  <option value="">Please select option</option>
                  <option value="1">Beginner</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                </select>
              </label>
              {formik.errors.gymExperience ? (
                <div>{formik.errors.gymExperience}</div>
              ) : null}
            </div>

            {/* Gym Sports */}
            {/* <div className="mb-3 d-grid col-2">
          <label>
            Type of Gym sports:
            <select className="form-control" name="gymSports">
            <option value="">Please select option</option>
              <option value="strength-conditioning">Strength conditioning</option>
              <option value="olympic-weightlifting">Olympic Weightlifting</option>
              <option value="bodybuilding">Bodybuilding</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="cardio">Cardio</option>
            </select>
          </label>
          {formik.errors.gymSports ? <div>{formik.errors.gymSports}</div> : null}
        </div> */}
            {/* <label>Type of Gym exercises:
                    <select name="gym-exercise" multiple>
                        <option value="squats">Squats</option>
                    </select>
                </label> */}
            <button
              type="submit"
              className="btn btn-primary me-3 px-4 d-grid col-2"
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
