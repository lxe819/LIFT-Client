import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
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

// interface ProductsStock {
//     product_id: number; 
//     product_name: string; 
//     stock_qty: { "S": number; "M": number; "L": number } | { "freeSize": number }
// }

// const styleSmall = {
//   maxWidth: "60px",
//   maxHeight: "60px",
//   objectFit: "cover",
// };

const cartedURL = "http://localhost:5566/cart/";
// const productsURL = "http://localhost:5566/products/"; 
const purchasesURL = "http://localhost:5566/purchases/"; 

function CartPage({ token, orderHistory, setOrderHistory }: { token: string, orderHistory: CartItem[], setOrderHistory: Function }) {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [render, setRender] = useState<Boolean>(true);
  const navigate = useNavigate(); 
//   const [productsStockData, setProductsStockData] = useState<ProductsStock[]>([]); 


  if (cartData === undefined){
    return null; 
  }

/* ---------------------------------------------------------------
UPDATE cart item (onChange QTY)
--------------------------------------------------------------- */
  const handleSubmit = (e: any, cartID: number, productID: number, size: string | null) => {
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
      .then((data) => console.log(data));
    setRender(true); 
  };


/* ---------------------------------------------------------------
DELETE cart item 
--------------------------------------------------------------- */
  const handleDelete = (cartID: number) => {
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
CREATE purchase item(s)
--------------------------------------------------------------- */

const handlePurchase = (cartData: CartItem[]) => {

    setOrderHistory(cartData); 

    cartData.forEach(item => {

        const toPurchase = {
            name: item.product_name, 
            price: item.unit_price, 
            quantity: item.quantity, 
            size: item.product_size, 
            user_id: item.user_id, 
            product_id: item.product_id,
            image: item.image, 
            cart_id: item.cart_id, 
            stock_qty: item.stock_qty
        }

        fetch(purchasesURL, {
            method:"POST", 
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify(toPurchase)
        }).then(response => response.json()).then(data => {
            // setOrderHistory([...orderHistory, data.deletedCartItem]); 
            console.log("deleted items:", data.deletedCartItem)}); 

        navigate("/personal/checkout"); 
    })
}

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
                  <img src={item.image} style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    objectFit: "cover",
                    }} className="me-3" />
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
                  className="btn btn-primary"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-row justify-content-end me-5">
        <button onClick={() => handlePurchase(cartData)} className="btn btn-primary">Checkout my cart</button>
      </div>
      <h3>You may be interested in:</h3>
    </>
  );
}

export default CartPage;
