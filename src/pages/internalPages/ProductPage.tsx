import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parseJwt from "../../models/parseJwt";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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

const SERVER = import.meta.env.VITE_SERVER;

function ProductPage({ token }: { token: string }) {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [singleProduct, setSingleProduct] = useState<Products[]>([]);
  const [mainDisplay, setMainDisplay] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");
  const [selectMessage, setSelectMessage] = useState(false);
  const [wishItemExist, setWishItemExist] = useState<boolean>(false);
  // const [stockQty, setStockQty] = useState<Stocks[]>([]);
  // const [updatedValues, setUpdatedValues] = useState({});
  const fetchProductURL = `${SERVER}/products/product/${product_id}`;
  const postCartItemURL = `${SERVER}/cart`;
  const postWishItemURL = `${SERVER}/wishlist/user`;
  const checkWishItemURL = `${SERVER}/wishlist/user/${product_id}`;

  const userID = parseJwt(token).user_id;
  //   console.log(userID);

  /* ---------------------------------------------------------------
Set Main Image Display 
--------------------------------------------------------------- */
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
        setSingleProduct(data.item);
        setMainDisplay(data.item?.[0]?.images?.[0]);
      });

    fetch(checkWishItemURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message === "Wish item exists") {
          setWishItemExist(true);
        }
      });
  }, [wishItemExist]);

  /* ---------------------------------------------------------------
Retrieve selected value for dropdown (Product Size)
--------------------------------------------------------------- */
  const handleChange = (e: any) => {
    setSelectValue(e.target.value);
    console.log("Dropdown selected", e.target.value);
  };

  /* ---------------------------------------------------------------
ADD item to Wishlist
--------------------------------------------------------------- */
  const handleAddWishItem = (product_id: number, user_id: number) => {
    const wish_details = { product_id: product_id, user_id: user_id };

    fetch(postWishItemURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(wish_details),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.wishItem));

    setWishItemExist(true);

    // toast("Item has been added to your wishlist!"); 
  };

  /* ---------------------------------------------------------------
REMOVE item from Wishlist
--------------------------------------------------------------- */
  const handleRemoveWishItem = () => {
    fetch(checkWishItemURL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setWishItemExist(false);

    // toast("You've removed this item from your wishlist.")
  };

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
            ? singleProduct.filter(
                (item) => item.stock_size === selectValue
              )?.[0]?.stock_qty
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
        // alert(JSON.stringify(updatedValues, null, 2));

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
        // alert(JSON.stringify(updatedValues, null, 2));

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
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <div className="container">
            <div className="row">
              <div className="col-1"></div>

              {/* Images */}
              <div className="col-5">
                <img
                  src={mainDisplay}
                  style={{
                    maxWidth: "430px",
                    maxHeight: "430px",
                    objectFit: "cover",
                  }}
                />
                <div className="mt-5">
                  {singleProduct?.[0]?.images.map((image, index) => (
                    <img
                      key={index}
                      onClick={handleClick}
                      src={image}
                      className="me-3"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* <div className="col-2"></div> */}
              <div className="col-5">
                <div className="d-flex flex-column">
                  <h1 className="mt-3 mb-4 fw-bold">{singleProduct?.[0]?.product_name}</h1>
                  <h6 className="mb-4">{singleProduct?.[0]?.short_desc}</h6>
                  <h3 className="mb-4"><span className="text-primary fw-bold">S${singleProduct?.[0]?.unit_price}</span>
                  </h3>

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
                            <option value="">Select size</option>
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

                    <div className="mb-4">
                      <label>
                        QTY: 
                        <input
                          name="quantity"
                          type="number"
                          min="1"
                          max={
                            selectValue
                              ? singleProduct.filter(
                                  (item) => item.stock_size === selectValue
                                )?.[0]?.stock_qty
                              : singleProduct?.[0]?.stock_qty
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.quantity}
                        />
                      </label>
                      {formik.touched.quantity && formik.errors.quantity ? (
                        <div>{formik.errors.quantity}</div>
                      ) : null}

                      {selectValue
                        ? formik.values.quantity ===
                            singleProduct.filter(
                              (item) => item.stock_size === selectValue
                            )[0].stock_qty && <p className="text-danger">Last one</p>
                        : formik.values.quantity ===
                            singleProduct?.[0]?.stock_qty && (
                            <p className="text-danger">Last one</p>
                          )}

                      {countdown.map((i) =>
                        selectValue
                          ? formik.values.quantity ===
                              singleProduct.filter(
                                (item) => item.stock_size === selectValue
                              )[0].stock_qty -
                                i && <p className="text-primary">Stock left: {i}</p>
                          : formik.values.quantity ===
                              singleProduct?.[0]?.stock_qty - i && (
                              <p className="text-primary">Stock left: {i}</p>
                            )
                      )}
                    </div>
                    <div className="d-grid col-6">
                      <button type="submit" className="btn btn-primary">
                        ADD TO CART
                      </button>
                    </div>
                  </form>

                  {/* Wishlist Portion */}
                  <div className="d-grid col-6 mt-3">
                    {wishItemExist ? (
                      <button
                        onClick={handleRemoveWishItem}
                        className="btn btn-outline-danger"
                      >
                        REMOVE FROM WISHLIST
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleAddWishItem(singleProduct?.[0].product_id, userID)
                        }
                        className="btn btn-outline-dark"
                      >
                        ADD TO WISHLIST
                      </button>
                    )}

                  </div>
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
