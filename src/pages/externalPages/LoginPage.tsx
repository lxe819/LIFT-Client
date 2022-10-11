import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const url = "http://localhost:5566/login/";
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
        navigate("/personal");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <div>
            <label>
                Username
                <input
                name="username"
                type="text"
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
        <div>
            <label>
                Password
                <input
                name="password"
                type="password"
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
        <button className="btn btn-primary" type="submit">Login</button>
        <Link to="/register">Create a new account</Link>
    </form>
  );
}

export default LoginPage;
