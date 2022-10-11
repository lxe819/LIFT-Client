import { useNavigate } from "react-router-dom";
import PurchaseTable from "../../components/PurchaseTable";

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


function CheckoutPage({ token, orderHistory }: { token: string, orderHistory: CartItem[] }) {

    const navigate = useNavigate(); 

    return(
        <>
            <h2 className="text-center mt-4">Thank you for purchasing from us!</h2>
            <h5 className="text-center mb-4">We have received your order.</h5>
            <h4 className="text-center">Invoice / Receipt</h4>
            <div className="p-3">
                <table className="table">
                    <thead className="table-active">
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
                                <td>{item.quantity}</td>
                                <td>{parseInt(item.unit_price) * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <PurchaseTable orderHistory={orderHistory} /> */}
            <div className="d-flex flex-row justify-content-end me-5">
                <button onClick={() => navigate("/personal")} className="btn btn-primary">Back to homepage</button>
            </div>
            <h3>You may be interested in</h3>
        </>
    )
}

export default CheckoutPage; 