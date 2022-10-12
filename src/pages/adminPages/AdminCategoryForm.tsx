import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function AdminCategoryForm({ token }: { token: string }) {

    const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label>
          New Category Name:
          <input
            name="category_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category_name}
          />
        </label>
        {formik.touched.category_name && formik.errors.category_name ? (
          <div>{formik.errors.category_name}</div>
        ) : null}
        <button type="submit" className="btn btn-primary">
          Add New Category
        </button>
        
      </form>
      <button onClick={() => navigate("/admin/categories")} className="btn btn-dark">Back to Categories Page</button>
    </>
  );
}

export default AdminCategoryForm;
