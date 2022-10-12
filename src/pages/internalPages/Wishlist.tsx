import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterestPdts from "../../components/InterestPdts";

const SERVER = import.meta.env.VITE_SERVER
const fetchWishListURL = `${SERVER}/wishlist/user`; 
// const checkWishItemURL = `${SERVER}/wishlist/user/${product_id}`; 

interface Wishlist {
    wish_id: number; 
    product_id: number; 
    product_name: string; 
    images: string[]; 
    unit_price: string; 
    sizing: string[]
}

function Wishlist({ token }: { token: string }){

    const [wishlist, setWishlist] = useState<Wishlist[]>([]); 
    const [wishItemExist, setWishItemExist] = useState<boolean>(true); 
    const navigate = useNavigate(); 

    /* ---------------------------------------------------------------
    FETCH wishlist items
    --------------------------------------------------------------- */
    useEffect(() => {
        fetch(fetchWishListURL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => setWishlist(data.wishlist)); 
        setWishItemExist(true); 
    }, [wishItemExist]); 

    /* ---------------------------------------------------------------
    REMOVE item from Wishlist
    --------------------------------------------------------------- */
    const handleRemoveWishItem = (product_id: number) => {
        fetch(`${SERVER}/wishlist/user/${product_id}`, {
          method: "DELETE", 
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }).then(res => res.json()).then(data => console.log(data)); 
        setWishItemExist(false); 
      }; 

    return(
        <>
            <h1>My Wishlist</h1>
            <div className="d-flex flex-row">
                {wishlist?.map(item => (
                    <div className="me-5">
                        <img src={item.images[0]} style={{
                    maxWidth: "200px",
                    minWidth: "200px", 
                    maxHeight: "200px",
                    // minHeight: "200px", 
                    objectFit: "cover",
                }} />
                <h3>{item.product_name}</h3>
                <h4>S${item.unit_price}</h4>
                {/* {item.sizing && <h5>Available in: {item.sizing.map(size => (<span>{size} </span>))}</h5>} */}
                <button onClick={() => navigate(`/personal/products/${item.product_id}`)} className="btn btn-primary">Add to Cart</button>
                <button onClick={() => {handleRemoveWishItem(item.product_id)}} className="btn btn-danger">Remove from Wishlist</button>
                    </div>
                ))}
            </div>
            <InterestPdts token={token} />
        </>
    )
}; 

export default Wishlist; 