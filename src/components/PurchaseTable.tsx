
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

function PurchaseTable({ orderHistory }: {orderHistory: CartItem[]}){
    return (
        <>
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
        </>
    )
}; 

export default PurchaseTable; 