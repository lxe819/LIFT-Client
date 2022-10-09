import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parseJwt from "../../models/parseJwt"; 

interface Products {
  product_id: number;
  product_name: string;
  images: string[];
  short_desc: string;
  unit_price: string;
  stock: number;        //! TO DELETE THIS
  sizing: string[];
  created_on: string;
  category_id: number;
  stock_qty: { "S": number; "M": number; "L": number } | { "freeSize": number }; 
}

const styleMD = {
    maxWidth: "430px",
    maxHeight: "430px",
    objectFit: "cover",
  };

  const styleSmall = {
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "cover",
  };

function ProductPage({ token }: string) {
  const { product_id } = useParams();
  const navigate = useNavigate(); 
  const [singleProduct, setSingleProduct] = useState<Products>();
  const [mainDisplay, setMainDisplay] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>(""); 
  const [selectMessage, setSelectMessage] = useState(false); 
  const [updatedValues, setUpdatedValues] = useState({})
  const fetchProductURL = `http://localhost:5566/products/product/${product_id}`;
  const postCartItemURL = `http://localhost:5566/cart`; 

  const userID = parseJwt(token).user_id; 
//   console.log(userID);


/* ---------------------------------------------------------------
Set Main Image Display 
--------------------------------------------------------------- */
  //! By default -> Should display the first image, not working. 
  const handleClick = (e) => {
    setMainDisplay(e.target.currentSrc);
  };

/* ---------------------------------------------------------------
Fetch the product to be displayed for this page
--------------------------------------------------------------- */
  useEffect(() => {
    fetch(fetchProductURL)
      .then((response) => response.json())
      .then((data) => setSingleProduct(data.product));
  }, []);

//   console.log(singleProduct?.stock_qty);

/* ---------------------------------------------------------------
Retrieve selected value for dropdown (Product Size)
--------------------------------------------------------------- */
  const handleChange = (e) => {
    setSelectValue(e.target.value); 
    console.log("Dropdown selected", e.target.value);
  }

/* ---------------------------------------------------------------
Formik to validate product quantity selection
--------------------------------------------------------------- */
  const formik = useFormik({
    initialValues: {
    //   size: selectValue,
      quantity: 0,
    },
    validationSchema: Yup.object({
    //   size: Yup.string().required("*Required"),
      quantity: Yup.number().min(0).max((selectValue ? singleProduct?.stock_qty[selectValue] : singleProduct?.stock_qty["freeSize"]), "Not enough stock").required("*Required"),
    }),
    onSubmit: async (values) => {
        if (!singleProduct?.sizing){
            setUpdatedValues({ name: singleProduct?.product_name, price: parseInt(singleProduct?.unit_price), ...values, user_id: userID, product_id: product_id, image: singleProduct?.images[0]}); 
            alert(JSON.stringify(updatedValues, null, 2));
        } else if (selectValue !== ""){
            setSelectMessage(false); 
            setUpdatedValues({ name: singleProduct?.product_name, price: parseInt(singleProduct?.unit_price), ...values, size: selectValue, user_id: userID, product_id: product_id, image: singleProduct?.images[0]}); 
            alert(JSON.stringify(updatedValues, null, 2)); //! Alert shows nothing b/c setState not done.
        } else {
            setSelectMessage(true); 
        }

        /* ---------------------------------------------------------------
        Create cart item via POST method
        --------------------------------------------------------------- */
        const res = await fetch(postCartItemURL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }, 
            body: JSON.stringify(updatedValues)
        }); 
        const data = await res.json(); 
            //! Issue: Returns empty {} the first time b/c updatedValues hasn't been setState. Second re-render , i.e. 2nd click on "Add to cart" will then complete a POST fetch. 
        console.log("POST to cart item", data.message);
        if (data.message === "Item carted!"){
            navigate("/personal/cart"); 
        }
    },
  });

  const array = [3, 2, 1]

  return (
    <>
      <div className="d-flex flex-row">
        <div className="me-5">
          <img src={mainDisplay} style={styleMD} />
          <div>
            {singleProduct?.images.map((image, index) => (
              <img
                key={index}
                onClick={handleClick}
                src={image}
                style={styleSmall}
              />
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h1 className="mt-5">{singleProduct?.product_name}</h1>
          <h4>{singleProduct?.short_desc}</h4>
          <h3 className="mb-3">{singleProduct?.unit_price}</h3>

          <form onSubmit={formik.handleSubmit}>
          {singleProduct?.sizing && (
            <div className="mb-3">
              <label>
                Size:
                <select name="size" onChange={handleChange} value={selectValue} required>
                  {singleProduct?.sizing.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
              {/* {formik.touched.size && formik.errors.size ? (
                                    <div>{formik.errors.size}</div>
                                ) : null} */}
                {selectMessage && <div>*Required</div>}
            </div>
          )}

            <div className="mb-3">
              <label>
                QTY:
                <input
                  name="quantity"
                  type="number"
                  min="1"
                //   max={singleProduct?.stock}          
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                />
              </label>
              {formik.touched.quantity && formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
              ) : null}
              {selectValue ? (formik.values.quantity === singleProduct?.stock_qty[selectValue] && <div>Last piece!</div>) : (formik.values.quantity === singleProduct?.stock_qty["freeSize"] && <div>Last piece!</div>)}
                {array.map(i => (selectValue ? (formik.values.quantity === singleProduct?.stock_qty[selectValue]-i && <div>Left {i} in stock</div>) : (formik.values.quantity === singleProduct?.stock_qty["freeSize"]-i && <div>Left {i} in stock</div>)) )}

            </div>
            <button type="submit" className="btn btn-primary">
              ADD TO CART
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
