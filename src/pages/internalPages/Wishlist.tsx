import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterestPdts from "../../components/InterestPdts";

const SERVER = import.meta.env.VITE_SERVER;
const fetchWishListURL = `${SERVER}/wishlist/user`;
// const checkWishItemURL = `${SERVER}/wishlist/user/${product_id}`;

interface Wishlist {
  wish_id: number;
  product_id: number;
  product_name: string;
  images: string[];
  unit_price: string;
  sizing: string[];
}

function Wishlist({ token }: { token: string }) {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [wishItemExist, setWishItemExist] = useState<boolean>(true);
  const navigate = useNavigate();

  /* ---------------------------------------------------------------
    FETCH wishlist items
    --------------------------------------------------------------- */
  useEffect(() => {
    fetch(fetchWishListURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWishlist(data.wishlist));
    setWishItemExist(true);
  }, [wishItemExist]);

  /* ---------------------------------------------------------------
    REMOVE item from Wishlist
    --------------------------------------------------------------- */
  const handleRemoveWishItem = (product_id: number) => {
    fetch(`${SERVER}/wishlist/user/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setWishItemExist(false);
  };

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="mx-5">
          <div className="container">
            <h1 className="mb-4 fw-bold">My Wishlist</h1>
            <div className="row row-cols-4">
              {wishlist?.map((item) => (
                <div
                  className="col p-5 border me-3  mb-4 bg-white"
                  style={{ borderRadius: "8px" }}
                >
                  <img
                    src={item.images[0]}
                    style={{
                      minHeight: "220px",
                      maxHeight: "220px",
                      maxWidth: "220px",
                      objectFit: "cover",
                      marginBottom: "20px",
                    }}
                  />
                  <div className="mt-4">
                    <h4>{item.product_name}</h4>
                    <h6>S${item.unit_price}</h6>
                  </div>
                  {/* {item.sizing && <h5>Available in: {item.sizing.map(size => (<span>{size} </span>))}</h5>} */}

                  <div className="d-grid col-12">
                    <button
                      onClick={() =>
                        navigate(`/personal/products/${item.product_id}`)
                      }
                      className="btn btn-primary mt-3 mb-2"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="d-grid col-12">
                    <button
                      onClick={() => {
                        handleRemoveWishItem(item.product_id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex flex-row"></div>
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

export default Wishlist;
