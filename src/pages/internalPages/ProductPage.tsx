import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parseJwt from "../../models/parseJwt";

interface Products {
  product_id: number;
  stock_size: string | null; 
  stock_qty: number; 
  product_name: string;
  images: string[];
  short_desc: string;
  unit_price: string;
  sizing: string[];
}

// interface Products {
//   product_id: number;
//   product_name: string;
//   images: string[];
//   short_desc: string;
//   unit_price: string;
//   stock: number; //! TO DELETE THIS
//   sizing: string[];
//   created_on: string;
//   category_id: number;
//   stock_qty: { S: number; M: number; L: number } | { freeSize: number };
// }


// interface Stocks {
//   stock_id: number; 
//   product_id: number; 
//   product_size: string | null; 
//   stock_qty: number; 
//   created_on: Date; 
// }

// const styleMD = {
//   maxWidth: "430px",
//   maxHeight: "430px",
//   objectFit: "cover",
// };

// const styleSmall = {
//   maxWidth: "100px",
//   maxHeight: "100px",
//   objectFit: "cover",
// };

function ProductPage({ token }: { token: string }) {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState<Products[]>([]);
  const [mainDisplay, setMainDisplay] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  const [selectMessage, setSelectMessage] = useState(false);
  // const [stockQty, setStockQty] = useState<Stocks[]>([]); 
  // const [updatedValues, setUpdatedValues] = useState({});
  const fetchProductURL = `http://localhost:5566/products/product/${product_id}`;
  const postCartItemURL = `http://localhost:5566/cart`;
  // const fetchStocksURL = `http://localhost:5566/stocks`

  const userID = parseJwt(token).user_id;
  //   console.log(userID);

  /* ---------------------------------------------------------------
Set Main Image Display 
--------------------------------------------------------------- */
  //! By default -> Should display the first image, not working.
  const handleClick = (e: any) => {
    setMainDisplay(e.target.currentSrc);
  };

/* =================================================================
//*Fetch BOTH product and its stock_QTY to be displayed for this page
================================================================= */
  useEffect(() => {
    fetch(fetchProductURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.item);
        setSingleProduct(data.item)});

  }, []);


  /* ---------------------------------------------------------------
Retrieve selected value for dropdown (Product Size)
--------------------------------------------------------------- */
  const handleChange = (e: any) => {
    setSelectValue(e.target.value);
    console.log("Dropdown selected", e.target.value);
  };


  //? To guard against undefined data:
    // if (singleProduct === undefined){
    //   return null; 
    // }


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
      quantity: Yup.number()
        .min(0)
        .max(
          selectValue
            ? singleProduct.filter(item => item.stock_size === selectValue)?.[0]?.stock_qty
            : singleProduct?.[0]?.stock_qty, 
          "Not enough stock"
        )   
        .required("*Required"),
    }),
    onSubmit: async (values) => {
      if (!singleProduct[0].sizing) {
        const updatedValues = {
          name: singleProduct[0].product_name,
          price: parseInt(singleProduct[0].unit_price),
          ...values,
          user_id: userID,
          product_id: product_id,
          image: singleProduct[0].images[0],
        };
        alert(JSON.stringify(updatedValues, null, 2));

        /* ---------------------------------------------------------------
        Create (free-size) cart item via POST method
        --------------------------------------------------------------- */
        const res = await fetch(postCartItemURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedValues),
        });
        const data = await res.json();
        console.log("POST to cart item", data.message);
        if (data.message === "Item carted!") {
          navigate("/personal/cart");
        }

      } else if (selectValue !== "") {
        setSelectMessage(false);
        const updatedValues = {
          name: singleProduct[0].product_name,
          price: parseInt(singleProduct[0].unit_price),
          ...values,
          size: selectValue,
          user_id: userID,
          product_id: product_id,
          image: singleProduct[0].images[0],
        };
        alert(JSON.stringify(updatedValues, null, 2)); 

        /* ---------------------------------------------------------------
        Create (with sizes) cart item via POST method
        --------------------------------------------------------------- */
        const res = await fetch(postCartItemURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedValues),
        });
        const data = await res.json();
        console.log("POST to cart item", data.message);
        if (data.message === "Item carted!") {
          navigate("/personal/cart");
        }

      } else {
        setSelectMessage(true);
      }
    },
  });

  const countdown = [3, 2, 1];

  return (
    <>
      <div className="d-flex flex-row">
        <div className="me-5">
          <img src={mainDisplay} style={{
            maxWidth: "430px",
            maxHeight: "430px",
            objectFit: "cover",
          }} />
          <div>
            {singleProduct?.[0]?.images.map((image, index) => (
              <img
                key={index}
                onClick={handleClick}
                src={image}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h1 className="mt-5">{singleProduct?.[0]?.product_name}</h1>
          <h4>{singleProduct?.[0]?.short_desc}</h4>
          <h3 className="mb-3">{singleProduct?.[0]?.unit_price}</h3>

          <form onSubmit={formik.handleSubmit}>
            {singleProduct?.[0]?.sizing && (
              <div className="mb-3">
                <label>
                  Size:
                  <select
                    name="size"
                    onChange={handleChange}
                    value={selectValue}
                    required
                  >
                    {singleProduct?.[0]?.sizing.map((size, index) => (
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
                  //   max={singleProduct?.stock} --> //* qty constraint is at the top with Yup validation 
                  max={ selectValue
                    ? singleProduct.filter(item => item.stock_size === selectValue)?.[0]?.stock_qty
                    : singleProduct?.[0]?.stock_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                />
              </label>
              {formik.touched.quantity && formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
              ) : null}

              {selectValue 
                ? formik.values.quantity === singleProduct.filter(item => item.stock_size === selectValue)[0].stock_qty && (<div>Last piece!</div>)
                : formik.values.quantity === singleProduct?.[0]?.stock_qty && (<div>Last piece!</div>)}

              {countdown.map(i => 
                selectValue
                  ? formik.values.quantity === singleProduct.filter(item => item.stock_size === selectValue)[0].stock_qty - i && (<div>Left {i} pieces!</div>)
                  : formik.values.quantity === singleProduct?.[0]?.stock_qty - i && (<div>Left {i} pieces!</div>))}

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
