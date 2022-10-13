import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const SERVER = import.meta.env.VITE_SERVER
const url = `${SERVER}/users/`;

function RegisterPage({ setToken }: { setToken: Function}) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      gender: "", 
      gymExperience: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(50, "Must be at most 50 characters")
        .required("*Required"),
      email: Yup.string().email("Invalid email").required("*Required"),
      password: Yup.string()
        .password()
        .minLowercase(1, "Password must contain at least 1 lower-case letter")
        .minUppercase(1, "Password must contain at least 1 upper-case letter")
        .minNumbers(1, "Password must contain at least 1 number")
        .minSymbols(1, "Password must contain at least 1 special character"),
      gender: Yup.string(), 
      gymExperience: Yup.string()
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log("Response upon account creation:", data);

      if (data.message === "Username already exists.") {
        alert("Username already exists.");
        navigate("/register");
      } else if (data.message === "Email already exists.") {
        alert("Email already exists.");
        navigate("/register");
      } else {
        //   setUsername(data.userid);
        // setToken(data.token);
        navigate("/login");
      }
    },
  });

  return (
    <div style={{paddingTop: "150px", paddingBottom: "150px"}}>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-5">
            <div className="border border-0.5 rounded" style={{padding: "60px", paddingLeft: "90px"}}>
              <h1 className="mb-4">Create an Account</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label>
                    {/* Username: */}
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      style={{paddingLeft: "15px", backgroundColor: "rgb(244, 245, 249)"}}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                  </label>
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>
                    {/* Email: */}
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      style={{paddingLeft: "15px", backgroundColor: "rgb(244, 245, 249)"}}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </label>
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-3 form-group">
                  <label>
                    {/* Password: */}
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      style={{paddingLeft: "15px", backgroundColor: "rgb(244, 245, 249)"}}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </label>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>

                <div className="mb-3 form-group">
                  <label>
                    Gender:
            <select className="form-control" name="gender" onChange={formik.handleChange} value={formik.values.gender}> 
              <option value="">Please select option</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
                  </label>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div>{formik.errors.gender}</div>
                  ) : null}
                </div>

                <div className="mb-3 form-group">
                  <label>
                  Gym Experience:
            <select className="form-control" name="gymExperience" onChange={formik.handleChange} value={formik.values.gymExperience}>
            <option value="">Please select option</option>
              <option value="1">Beginner</option>
              <option value="2">
                Intermediate
              </option>
              <option value="3">Advanced</option>
            </select>
                  </label>
                  {formik.touched.gymExperience && formik.errors.gymExperience ? (
                    <div>{formik.errors.gymExperience}</div>
                  ) : null}
                </div>

                <div className="mb-3" style={{marginTop: "36px"}}>
                  <button type="submit" className="btn btn-primary me-3 px-4">
                    Sign Up
                  </button>
                  <Link to="/login">Back to login</Link>
                </div>
              </form>

            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
