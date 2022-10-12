import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

function EditProfilePage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      gymExperience: "", 
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

      //   const res = await fetch(url, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   });
      //   const data = await res.json();
      //   console.log("Response upon account creation:", data);
    },
  });

  return (
    <>
      <h1>EDIT PROFILE</h1>
      <form>
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
        <label>
          Email:
          <input
            name="username"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label>
          Gender:
          <select name="gender">
            <option value="">Please select option</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>
        </label>
        {formik.errors.gender ? (
                      <div >
                        {formik.errors.gender}
                      </div>
                    ) : null}
        <label>
          Gym Experience:
          <select name="gymExperience">
            <option value="beginner">Just starting out</option>
            <option value="intermediate">
              Been gymming for a couple of years
            </option>
            <option value="advanced">I own the sports</option>
          </select>
        </label>
        {formik.errors.gymExperience ? (
                      <div >
                        {formik.errors.gymExperience}
                      </div>
                    ) : null}
        <label>
          Type of Gym sports:
          <select name="gymSports">
            <option value="strength-conditioning">Strength conditioning</option>
            <option value="olympic-weightlifting">Olympic Weightlifting</option>
            <option value="bodybuilding">Bodybuilding</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="cardio">Cardio</option>
          </select>
        </label>
        {formik.errors.gymSports ? (
                      <div >
                        {formik.errors.gymSports}
                      </div>
                    ) : null}
        {/* <label>Type of Gym exercises:
                    <select name="gym-exercise" multiple>
                        <option value="squats">Squats</option>
                    </select>
                </label> */}
      </form>
    </>
  );
}

export default EditProfilePage;
