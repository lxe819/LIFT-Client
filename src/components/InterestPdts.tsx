import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface InterestPdtItem {
    user_id: number;
    gym_exp_level: number;
    product_id: number;
    product_name: string;
    short_desc: string;
    unit_price: string;
    images: string[];
    sizing: string[]; 
  }


  const SERVER = import.meta.env.VITE_SERVER
  const interestPdtsURL = `${SERVER}/interest/gymx`; 
function InterestPdts({ token }: {token: string}){

    const [interestPdts, setInterestPdts] = useState<InterestPdtItem[]>([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(interestPdtsURL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setInterestPdts(data.productsOfInterest)); 
    })

    return (
        <>
            <h1 className="mt-5 mb-3">You may be interested in</h1>
            <div className="d-flex flex-row">
                {interestPdts?.map(pdt => (
                    <div className="me-5">
                        <img src={pdt.images[0]} style={{
                        maxWidth: "100px",
                        minWidth: "100px", 
                        maxHeight: "100px",
                        // minHeight: "200px", 
                        objectFit: "cover",
                    }} />
                        <h4>{pdt.product_name}</h4>
                        <h5>S${pdt.unit_price}</h5>
                        <button onClick={() => navigate(`/personal/products/${pdt.product_id}`)} className="btn btn-primary">Check it out</button>
                    </div>
                ))}
            </div>
        </>
    )
}; 

export default InterestPdts; 