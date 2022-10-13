import { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import InterestPdts from "../../components/InterestPdts";
import parseJwt from "../../models/parseJwt";

interface CartItem {
  user_id: number;
  cart_id: number;
  product_id: number;
  product_name: string;
  product_size: string;
  stock_qty: number;
  unit_price: string;
  quantity: number;
  image: string;
}

const SERVER = import.meta.env.VITE_SERVER;
const cartedURL = `${SERVER}/cart/`;
const purchasesURL = `${SERVER}/purchases/`;

function CartPage({
  token,
  orderHistory,
  setOrderHistory,
}: {
  token: string;
  orderHistory: CartItem[];
  setOrderHistory: Function;
}) {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [render, setRender] = useState<Boolean>(true);
  const navigate = useNavigate();
  //   const [productsStockData, setProductsStockData] = useState<ProductsStock[]>([]);

  if (cartData === undefined) {
    return null;
  }

  /* ---------------------------------------------------------------
UPDATE cart item (onChange QTY)
--------------------------------------------------------------- */
  const handleSubmit = (
    e: any,
    cartID: number,
    productID: number,
    size: string | null
  ) => {
    console.log("qty:", e.target.value);
    console.log("cart_id:", cartID);
    console.log("productID:", productID);
    console.log("size:", size);

    const newQty = e.target.value;
    fetch(`${SERVER}/cart/${cartID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: newQty,
        product_id: productID,
        size: size,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setRender(true);
  };

  /* ---------------------------------------------------------------
DELETE cart item 
--------------------------------------------------------------- */
  const handleDelete = (cartID: number) => {
    fetch(`${SERVER}/cart/${cartID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setRender(true);
  };

  /* ---------------------------------------------------------------
CREATE purchase item(s)
--------------------------------------------------------------- */

  const handlePurchase = (cartData: CartItem[]) => {
    setOrderHistory(cartData);

    cartData.forEach((item) => {
      const toPurchase = {
        name: item.product_name,
        price: item.unit_price,
        quantity: item.quantity,
        size: item.product_size,
        user_id: item.user_id,
        product_id: item.product_id,
        image: item.image,
        cart_id: item.cart_id,
        stock_qty: item.stock_qty,
      };

      fetch(purchasesURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(toPurchase),
      })
        .then((response) => response.json())
        .then((data) => {
          // setOrderHistory([...orderHistory, data.deletedCartItem]);
          console.log("deleted items:", data.deletedCartItem);
        });

      navigate("/personal/checkout");
    });
  };

  /* ---------------------------------------------------------------
FETCH cart data whenever there's DELETE or UPDATE
--------------------------------------------------------------- */
  // const userID = parseJwt(token).user_id;
  useEffect(() => {
    fetch(cartedURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ user_id: userID})
    })
      .then((response) => response.json())
      .then((data) => setCartData(data.items));

    setRender(false);
  }, [render]);


/* ---------------------------------------------------------------
Calculate Cart Total
--------------------------------------------------------------- */
  const subtotalArr = cartData.map(item => parseInt(item.unit_price) * item.quantity); 
  const total = subtotalArr.reduce((a, b) => a + b, 0); 

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <h1 className="mb-4 fw-bold">Shopping Cart</h1>
          {cartData.length === 0 ? (
            <>
            <h3>
              Your shopping cart is empty.
            </h3>
            <button onClick={() => navigate("/personal")} className="btn btn-primary mt-4">Browse products</button>
            </>
          ) : (
            <>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th>S/N</th>
                    <th>Product Information</th>
                    <th>Unit Price (S$)</th>
                    <th>QTY</th>
                    <th>Subtotal (S$)</th>
                    <th>Remove from cart</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => (
                    <tr key={item.cart_id}>
                      <td>{index + 1}</td>
                      <td className="d-flex flex-row">
                        <div>
                          <img
                            src={item.image}
                            style={{
                              maxWidth: "60px",
                              maxHeight: "60px",
                              objectFit: "cover",
                            }}
                            className="me-3"
                          />
                        </div>
                        <div>
                          {item.product_name}
                          <br />
                          <span>{item.product_size}</span>
                        </div>
                      </td>
                      <td>${parseInt(item.unit_price)}</td>
                      <td>
                        <input
                          type="number"
                          key={item.cart_id}
                          defaultValue={item.quantity}
                          min="1"
                          max={item.stock_qty}
                          onChange={(e) =>
                            handleSubmit(
                              e,
                              item.cart_id,
                              item.product_id,
                              item.product_size
                            )
                          }
                        />
                      </td>
                      <td>${parseInt(item.unit_price) * item.quantity}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.cart_id)}
                          className="btn btn-outline-primary"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex flex-row justify-content-end me-5">
                {/* <button
                  onClick={() => handlePurchase(cartData)}
                  className="btn btn-primary"
                >
                  Checkout my cart
                </button> */}
              </div>

      {/* Shipping and Cart Totals */}
      {/* <div style={{padding: "60px", paddingTop: "0px"}}>
        <div className="mx-5"> */}
          <div className="container" style={{marginTop: "60px"}}>
            <div className="row">
              <div className="col-6">
                <div className="mb-4">
                  <h4 className="mb-3">Billing Details</h4>
                  <input placeholder="Billing Address" className="form-control mb-2" />
                  <div className="d-flex flex-row mb-3">
                  <select name="country" className="form-control me-2">
                    <option value="singapore">Singapore</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="taiwan">Taiwan</option>
                    <option value="hongkong">Hong Kong</option>
                  </select>
                  {/* <input placeholder="Singapore" className="form-control me-2" /> */}
                  <input placeholder="123456" className="form-control" />
                  </div>
                  <button className="btn btn-outline-primary">Edit</button>
                </div>
                <div>
                  <h4 className="mb-3">Apply Coupon</h4>
                  <div className="d-flex flex-row">
                    <input placeholder="Enter Your Coupon Code" className="form-control me-2" />
                    <button className="btn btn-outline-primary">Apply</button>
                  </div>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-4">
                <div className="border" style={{borderRadius: "8px", padding: "36px"}}>
                  <h4 className="mb-3">Cart Total</h4>
                  <table className="table">
                    <tr>
                      <td>Cart Subtotal</td>
                      <td>S${total}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>Free Shipping</td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-primary">Total</td>
                      <td className="fw-bold text-primary">S${total}</td>
                    </tr>
                  </table>
                  <h4 className="mb-3 mt-3">Mode of Payment</h4>
                  <div>                  
                    <select name="payment" className="form-control me-2">
                    <option value="bank">Direct Bank Transfer</option>
                    <option value="paypal">Paypal</option>
                    <option value="cash">Cash</option>
                  </select>
                  </div>
                  <button onClick={() => handlePurchase(cartData)} className="btn btn-primary mt-3">Checkout my cart</button>
                </div>
              </div>
            </div>
          </div>
        {/* </div>
      </div> */}
            </>
          )}
        </div>
      </div>


      {/* Products of Interest */}
      <div
        style={{
          backgroundColor: "#f4f5f9",
          borderTopLeftRadius: "25px",
          borderColor: "#f4f5f9",
          borderTopRightRadius: "25px",
        }}
      >
        <div
          style={{
            padding: "60px",
            paddingLeft: "100px",
            paddingBottom: "0px",
          }}
        >
          <h2 className="text-center fw-bold">
            You may be{" "}
            <span className="text-primary fw-bold">interested in</span>:
          </h2>
        </div>

        <InterestPdts token={token} />
      </div>
    </>
  );
}

export default CartPage;
