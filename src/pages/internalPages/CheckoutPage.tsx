import { useNavigate } from "react-router-dom";
import InterestPdts from "../../components/InterestPdts";

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

function CheckoutPage({
  token,
  orderHistory,
}: {
  token: string;
  orderHistory: CartItem[];
}) {
  const navigate = useNavigate();

  const subtotalArr = orderHistory.map(
    (item) => parseInt(item.unit_price) * item.quantity
  );
  const total = subtotalArr.reduce((a, b) => a + b);

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <h2 className="ms-3 mt-4 fw-bold">Thank you for your order.</h2>
          <h5 className="ms-3 mb-5">
            Order confirmation and updates will be sent to your email.
          </h5>
          <div className="ms-3 mb-5">
            <h4 className="fw-bold">
              Payment Status:{" "}
              <span className="text-primary">Awaiting Payment</span>
            </h4>
            <h6>
              Pay by Cash -{" "}
              <span className="text-primary fw-bold">Total S${total}</span>{" "}
            </h6>
          </div>
          <h4 className="ms-3 fw-bold">Purchase Summary</h4>
          <div className="p-3">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>S/N</th>
                  <th>Product Information</th>
                  <th>Unit Price (S$)</th>
                  <th>QTY</th>
                  <th>Subtotal (S$)</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((item, index) => (
                  <tr>
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
                    <td>{item.quantity}</td>
                    <td>S${parseInt(item.unit_price) * item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td className="fw-bold" colSpan={4}>
                    TOTAL
                  </td>
                  <td className="text-primary fw-bold">S${total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <PurchaseTable orderHistory={orderHistory} /> */}
          <div className="d-flex flex-row justify-content-center me-5 mt-3">
            <button
              onClick={() => navigate("/personal")}
              className="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

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

export default CheckoutPage;
