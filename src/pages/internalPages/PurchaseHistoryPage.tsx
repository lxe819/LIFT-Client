import { useEffect, useState } from "react";
import { format } from "date-fns"; 

interface Purchases {
    user_id: number; 
    purchase_id: number; 
    product_id: number; 
    product_name: string; 
    product_size: string | null; 
    unit_price: string; 
    quantity: number; 
    image: string; 
    purchased_on: Date 
}


const purchasesURL = "http://localhost:5566/purchases/"; 
function PurchaseHistoryPage({ token }: { token: string }){

    const [allPurchases, setAllPurchases] = useState<Purchases[]>([])
    
    useEffect(() => {
        fetch(purchasesURL, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => response.json()).then(data => setAllPurchases(data.purchases))
    })

    return (
        <>
            <h1>Past Purchases</h1>
            <table className="table">
                <thead className="table-active">
                    <tr>
                        <th>S/N</th>
                        <th>Product Information</th>
                        <th>Unit Price (S$)</th>
                        <th>QTY</th>
                        <th>Subtotal (S$)</th>
                        <th>Purchased on</th>
                    </tr>
                </thead>
                <tbody>
                    {allPurchases.map((item, index) => (
                        <tr key={item.purchase_id}>
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
                            <td>${parseInt(item.unit_price) * item.quantity}</td>
                            <td>{format(new Date(item.purchased_on), "PPpp")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}; 

export default PurchaseHistoryPage; 