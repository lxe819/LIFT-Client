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

const SERVER = import.meta.env.VITE_SERVER
const purchasesURL = `${SERVER}/purchases/`; 
function PurchaseHistoryPage({ token }: { token: string }){

    const [allPurchases, setAllPurchases] = useState<Purchases[]>([])

    // Add 8 hours to timestamp
    const addEightHours = (date = new Date()) => {
        date.setTime(date.getTime() + 8 * 60 * 60 * 1000); 
        return date;
    }; 
    // console.log(addEightHours());
    
    useEffect(() => {
        fetch(purchasesURL, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => response.json()).then(data => setAllPurchases(data.purchases))
    }, [])

    return (
        <>
          <div style={{ padding: "60px" }}>
            <div className="mx-5">
                <h1 className="mb-4 fw-bold">Past Purchases</h1>
                <table className="table">
                    <thead className="table-light">
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
                                    <div className="me-2">
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
                                <td>{format(new Date(addEightHours(new Date(item.purchased_on))), "PPpp")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>


        </>
    )
}; 

export default PurchaseHistoryPage; 