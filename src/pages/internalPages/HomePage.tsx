import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroBanner from "../../components/HeroBanner";
import InterestPdts from "../../components/InterestPdts";
import parseJwt from "../../models/parseJwt";

interface CategoryItem {
  category_id: number;
  category_name: string;
  image: string;
}

interface Products {
  product_id: number;
  product_name: string;
  images: string[];
  short_desc: string;
  unit_price: string;
  sizing: string[];
  display_tag: string[];
}

interface Landing {
  categories: CategoryItem[];
  featuredItems: Products[];
  newItems: Products[];
  popularItems: Products[];
}

const SERVER = import.meta.env.VITE_SERVER;
const landingPageURL = `${SERVER}/landing`;

function Homepage({ token }: { token: string }) {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([]);
  const [productsData, setProductData] = useState<Landing>();

  const username = parseJwt(token).username;

  useEffect(() => {
    fetch(landingPageURL)
      .then((res) => res.json())
      .then((data) => {
        setCategoriesData(data.categories);
        setProductData(data);
      });
  }, []);

  return (
    <>
      <HeroBanner />
      <div style={{ paddingTop: "60px", paddingLeft: "100px" }}>
        <h1 className="fw-bold text-center">
          Welcome <span className="text-primary">{username}</span>, <br />
          Here's our{" "}
          <span className="text-primary">recommendations for you</span>
        </h1>
      </div>
      <InterestPdts token={token} />

      {/* Categories Section */}
      <div
        style={{
          padding: "60px",
          backgroundColor: "#f4f5f9",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
        }}
      >
        <div className="mx-5" style={{}}>
          <h1 className="fw-bold" style={{ marginBottom: "36px" }}>
            <span className="text-primary">Popular</span> Categories
          </h1>
          <div className="d-flex flex-row">
            {categoriesData.map((cat) => (
              <Link
                to={`/categories/${cat.category_id}`}
                className="link-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="me-3">
                  <img
                    src={cat.image}
                    style={{
                      minHeight: "240px",
                      maxWidth: "240px",
                      objectFit: "cover",
                      marginBottom: "20px",
                    }}
                  />
                  <h5 className="text-center text-uppercase fw-bold">
                    {cat.category_name}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured / New / Popular Products Section  */}
      <div
        className="bg-dark"
        style={{ padding: "60px", paddingTop: "60px", borderRadius: "25px" }}
      >
        <div className="mx-5" style={{}}>
          <div className="text-light" style={{ marginBottom: "36px" }}>
            <h1>
              Our <span className="text-info">Best Products</span>{" "}
            </h1>
          </div>
          <ul className="nav nav-tabs nav-fill mb-4" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active link-light text-uppercase"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Featured
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link link-light text-uppercase"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Popular
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link link-light text-uppercase"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact-tab-pane"
                type="button"
                role="tab"
                aria-controls="contact-tab-pane"
                aria-selected="false"
              >
                Newly Added
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active container"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row row-cols-4">
                {productsData?.featuredItems.map((item) => (
                  <div
                    className="col p-5 border me-3 mb-4 bg-white"
                    style={{ borderRadius: "10px" }}
                  >
                    <img
                      src={item.images[0]}
                      style={{
                        minHeight: "220px",
                        maxWidth: "220px",
                        objectFit: "cover",
                        marginBottom: "20px",
                      }}
                    />
                    <div className="mt-4">
                      <h4>{item.product_name}</h4>
                      <h6>S${item.unit_price}</h6>
                      <button
                        onClick={() =>
                          navigate(`/personal/products/${item.product_id}`)
                        }
                        className="btn btn-primary mt-2"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row row-cols-4">
                {productsData?.popularItems.map((item) => (
                  <div
                    className="col p-5 border me-3 mb-4 bg-white"
                    style={{ borderRadius: "8px" }}
                  >
                    <img
                      src={item.images[0]}
                      style={{
                        minHeight: "220px",
                        maxHeight: "220px",
                        // minWidth: "220px",
                        maxWidth: "220px",
                        objectFit: "cover",
                        marginBottom: "20px",
                      }}
                    />
                    <div className="mt-4">
                      <h4>{item.product_name}</h4>
                      <h6>S${item.unit_price}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="contact-tab-pane"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="row row-cols-4">
                {productsData?.newItems.map((item) => (
                  <div
                    className="col p-5 border me-3 mb-4 bg-white"
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "100px" }}>
        <div
          className="container"
          style={{ marginRight: "100px", marginLeft: "100px" }}
        >
          <h1 className="fw-bold" style={{ marginBottom: "36px" }}>
            Our <span className="text-primary fw-bold">Testimonials</span>
          </h1>
          <div className="row">
            <div className="col-4">
              <h4 className="col">TOM HANKS</h4>
              <h6>
                There's no better site out there than this which helps to bring
                all kinds of gym gear together! There is no need to travel to
                each brand's site to check out the gears. I love the wide range
                of prices too, friendly for the wallet!
              </h6>
            </div>
            <div className="col-2"></div>
            <div className="col-4">
              <h4 className="text-uppercase">REBECS ATTORNEY</h4>
              <h6>
                Just started going to the gym, wanted to purchase some
                protection but wasn't sure what to buy. Really love the
                personalisation algorithm of this site, this is simply
                phenomenal!
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
