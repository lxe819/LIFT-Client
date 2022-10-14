import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const SERVER = import.meta.env.VITE_SERVER;
const interestPdtsURL = `${SERVER}/interest/gymx`;
function InterestPdts({ token }: { token: string }) {
  const [interestPdts, setInterestPdts] = useState<InterestPdtItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(interestPdtsURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setInterestPdts(data.productsOfInterest));
  }, []);

  return (
    <>
      <div style={{ padding: "60px", paddingTop: "36px"}}>
        <div className="mx-5">
          <div className="container">
            <div className="row row-cols-4 justify-content-center">
              {interestPdts?.map((item) => (
                <Link to={`/personal/products/${item.product_id}`} className="link-dark" style={{textDecoration: "none"}}>
                  <div
                    className="col border mb-4 bg-white"
                    style={{ borderRadius: "8px", padding: "40px", minHeight: "410px", maxHeight: "410px"}}
                  >
                    <img
                      src={item.images[0]}
                      style={{
                        minHeight: "198px",
                        maxHeight: "198px", 
                        maxWidth: "198px",
                        objectFit: "cover",
                        marginBottom: "20px",
                      }}
                    />
                    <div className="mt-4">
                      <h4>{item.product_name}</h4>
                      <h6>S${item.unit_price}</h6>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d-flex flex-row">
        {interestPdts?.map((pdt) => (
          <div className="me-5">
            <img
              src={pdt.images[0]}
              style={{
                maxWidth: "100px",
                minWidth: "100px",
                maxHeight: "100px",
                // minHeight: "200px",
                objectFit: "cover",
              }}
            />
            <h4>{pdt.product_name}</h4>
            <h5>S${pdt.unit_price}</h5>
            <button
              onClick={() => navigate(`/personal/products/${pdt.product_id}`)}
              className="btn btn-primary"
            >
              Check it out
            </button>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default InterestPdts;
