import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import parseJwt from "../../models/parseJwt";

interface CartItem {
  cart_id: number;
  product_name: string;
  unit_price: string;
  quantity: number;
  product_size: string;
  user_id: number;
  product_id: number;
  image: string;
  carted_on: string;
  last_edit: string;
}

interface ProductsStock {
    product_id: number; 
    product_name: string; 
    stock_qty: { "S": number; "M": number; "L": number } | { "freeSize": number }
}

const styleSmall = {
  maxWidth: "60px",
  maxHeight: "60px",
  objectFit: "cover",
};

const cartedURL = "http://localhost:5566/cart/";
const productsURL = "http://localhost:5566/products/"; 

function CartPage({ token }: string) {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [render, setRender] = useState<Boolean>(true);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState<string>("")
  const [productsStockData, setProductsStockData] = useState<ProductsStock[]>([]); 


/* ---------------------------------------------------------------
UPDATE cart item (onChange QTY)
--------------------------------------------------------------- */
  const handleSubmit = (e, cartID, productID, size) => {
    console.log("qty:", e.target.value);
    console.log("cart_id:", cartID);
    console.log("productID:", productID);
    console.log("size:", size);

    const newQty = e.target.value;
    fetch(`http://localhost:5566/cart/${cartID}`, {
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
      .then((data) => setUpdateSuccessMessage(data));
    setRender(true); 
  };


/* ---------------------------------------------------------------
DELETE cart item 
--------------------------------------------------------------- */
  const handleDelete = (cartID) => {
    fetch(`http://localhost:5566/cart/${cartID}`, {
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

    fetch(productsURL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json()).then(data => setProductsStockData(data.products))

    setRender(false);
  }, [render]);
  //? useEffect didn't fetch when DELETE button clicked, requires 2nd time, re-render then item got removed!! 
    // Working well now (0205)



  return (
    <>
      <h1>Your Shopping Cart</h1>
      <table className="table">
        <thead className="table-active">
          <tr>
            <th>S/N</th>
            <th>Product Information</th>
            <th>Unit Price (S$)</th>
            <th>QTY</th>
            <th>Subtotal</th>
            <th>Remove from cart</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td className="d-flex flex-row">
                <div>
                  <img src={item.image} style={styleSmall} className="me-3" />
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
                  max={item.product_size ? productsStockData.filter(pdt => pdt.product_id === item.product_id)[0].stock_qty[item.product_size] : productsStockData.filter(pdt => pdt.product_id === item.product_id)[0].stock_qty["freeSize"]}
                  onChange={(e) =>
                    handleSubmit(
                      e,
                      item.cart_id,
                      item.product_id,
                      item.product_size
                    )
                  }
                />
                {/* {updateSuccessMessage.message} */}
              </td>
              <td>${parseInt(item.unit_price) * item.quantity}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.cart_id)}
                  className="btn btn-primary"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>You may be interested in:</h3>
    </>
  );
}

export default CartPage;
