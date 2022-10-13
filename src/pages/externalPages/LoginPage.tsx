import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import parseJwt from "../../models/parseJwt";

const SERVER = import.meta.env.VITE_SERVER
const url = `${SERVER}/login/`;
function LoginPage({ setToken }: { setToken: Function }) {
    const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Required"),
      password: Yup.string().required("*Required"),
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
      console.log("Response for login:", data);
    //   console.log(data);

      if (data.message === "User does not exist.") {
        alert("No such user found. Please create an account.");
        navigate("/login");
      } else if (data.message === "Incorrect password.") {
        alert("Wrong password. Please try again.");
        navigate("/login");
      } else {
        //   setUsername(data.userid);
          setToken(data.token);
          const isAdmin = parseJwt(data.token).admin; 
          if (isAdmin){
            navigate("/admin"); 
          } else {
            navigate("/personal");
          }
      }
    },
  });

  return (
    <div style={{paddingTop: "150px", paddingBottom: "150px"}}>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="border border-0.5 rounded" style={{padding: "60px"}}>
              <div>
                <h1 className="mb-4">Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label>
                            {/* Username:  */}
                            <input
                            name="username"
                            type="text"
                            className="form-control"
                            style={{paddingLeft: "15px", backgroundColor: "rgb(244, 245, 249)"}}
                            placeholder="Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            />
                        </label>
                        {formik.touched.username && formik.errors.username ? (
                          <div>
                            {formik.errors.username}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label>
                            {/* Password:  */}
                            <input
                            name="password"
                            type="password"
                            className="form-control"
                            style={{paddingLeft: "15px", backgroundColor: "rgb(244, 245, 249)"}}
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            />
                        </label>
                        {formik.touched.password && formik.errors.password ? (
                          <div>
                            {formik.errors.password}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-3" style={{marginTop: "36px"}}>
                      <button className="btn btn-primary me-3 px-4" type="submit">Login</button>
                      <Link to="/register" className="mt-5">Create a new account</Link>
                    </div>
                </form>

              </div>
            </div>

          </div>
          <div className="col-4"></div>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
