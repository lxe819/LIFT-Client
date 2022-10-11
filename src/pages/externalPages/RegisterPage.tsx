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
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Username:
            <input
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </label>
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <label>
            Email:
            <input
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>
            Password:
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <Link to="/login">Back to login</Link>
      </form>
    </>
  );
}

export default RegisterPage;
