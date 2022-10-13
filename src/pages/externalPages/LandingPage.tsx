import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const background1 =
  "https://cdn.shopify.com/s/files/1/1876/4703/articles/shutterstock_773647054_75791976-9fc3-4e09-a2e8-94fc800507a2_1000x.jpg?v=1620580258";
const background2 =
  "https://myzone-strengtheory.netdna-ssl.com/wp-content/uploads/2016/03/DSC09145.jpg";
const background3 =
  "https://blog.thewodlife.com.au/wp-content/uploads/2021/04/female-athlete-with-barbell-on-back-1.png";

const SERVER = import.meta.env.VITE_SERVER;
const landingPageURL = `${SERVER}/landing`;

function LandingPage() {
  const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([]);
  const [productsData, setProductData] = useState<Landing>();

  useEffect(() => {
    fetch(landingPageURL)
      .then((res) => res.json())
      .then((data) => {
        setCategoriesData(data.categories);
        setProductData(data);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* Carousel hero banner section */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{
              backgroundImage: `url(${background1})`,
              minHeight: "768.875px",
              backgroundSize: "cover",
            }}
          >
            <div
              className="container"
              style={{
                gridTemplateRows:
                  "minmax(152px, auto) minmax(216px, auto) minmax(16px, auto) minmax(97px, auto) minmax(31px, auto) minmax(51px, auto) 1fr",
                gridTemplateColumns:
                  "8.49673% 12.6634% 19.3627% 8.49673% 50.9804%",
              }}
            >
              <div
                className="row p-5"
                style={{ gridRow: "2/3", marginTop: "70px" }}
              >
                <div className="col-3" style={{ gridColumn: "2/5" }}>
                  <h1 className="text-white fs-1">
                    Don't <span className="text-info">ego lift</span>.
                  </h1>
                  <h5 className="text-white my-3">
                    Or maybe you can do it with protection from our knee
                    sleeves. Be protected.
                  </h5>
                  <button
                    onClick={() => navigate("/categories/3")}
                    className="btn btn-outline-light mt-3 "
                    style={{ float: "right", marginRight: "36px" }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: `url(${background2})`,
              minHeight: "768.875px",
              backgroundSize: "cover",
              boxShadow: "inset 0 0 0 50vw rgba(0,0,0,0.4)",
            }}
          >
            <div className="container">
              <div
                className="row p-5"
                style={{ marginLeft: "0px", marginTop: "400px" }}
              >
                <div className="col-4">
                  <h1
                    className="text-white"
                    style={{ textShadow: "2px 2px 15px black" }}
                  >
                    You've come <span className="text-info">so far</span>.
                  </h1>
                  <h5
                    className="text-white"
                    style={{ textShadow: "2px 2px 15px black" }}
                  >
                    It's not worth it if you can't get to enjoy your wins. Stay
                    protected.
                  </h5>
                  <button
                    onClick={() => navigate("/categories/3")}
                    className="btn btn-outline-light mt-3 "
                    style={{ float: "none" }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{
              backgroundImage: `url(${background3})`,
              minHeight: "768.875px",
              backgroundSize: "cover",
              boxShadow: "inset 0 0 0 50vw rgba(0,0,0,0.4)",
            }}
          >
            <div className="container">
              <div
                className="row p-5"
                style={{ marginLeft: "900px", marginTop: "450px" }}
              >
                <div className="col-12">
                  <h1
                    className="text-white"
                    style={{ textShadow: "2px 2px 15px black" }}
                  >
                    Wear your <span className="text-info">belt</span>.
                  </h1>
                  <h5
                    className="text-white"
                    style={{ textShadow: "2px 2px 15px black" }}
                  >
                    Your safety is our priority. Stay protected.
                  </h5>
                  <button
                    onClick={() => navigate("/categories/4")}
                    className="btn btn-outline-light mt-3 "
                    style={{ float: "none" }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Categories Section */}
      <div style={{ padding: "60px" }}>
        <div className="mx-5" style={{}}>
          <h1 className="fw-bold" style={{marginBottom: "36px"}}>
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
      <div className="bg-dark" style={{ padding: "60px", paddingTop: "60px", borderRadius: "25px"}}>
        <div className="mx-5" style={{}}>
        <div className="text-light" style={{marginBottom: "36px"}}>
            <h1>Our <span className="text-info">Best Products</span> </h1>
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
                  <div className="col p-5 border me-3 mb-4 bg-white" style={{borderRadius: "8px"}}>
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
                  <div className="col p-5 border me-3 mb-4 bg-white" style={{borderRadius: "8px"}}>
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
                  <div className="col p-5 border me-3 mb-4 bg-white" style={{borderRadius: "8px"}}>
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
      <div style={{padding: "100px"}}>
        <div className="container" style={{marginRight: "100px", marginLeft: "100px"}}>
            <h1 className="fw-bold" style={{marginBottom: "36px"}}>Our <span className="text-primary fw-bold">Testimonials</span></h1>
            <div className="row">
                <div className="col-4">
                    <h4 className="col">TOM HANKS</h4>
                    <h6>There's no better site out there than this which helps to bring all kinds of gym gear together! There is no need to travel to each brand's site to check out the gears. I love the wide range of prices too, friendly for the wallet!</h6>
                </div>
                <div className="col-2"></div>
                <div className="col-4">
                    <h4 className="text-uppercase">REBECS ATTORNEY</h4>
                    <h6>Just started going to the gym, wanted to purchase some protection but wasn't sure what to buy. Really love the personalisation algorithm of this site, this is simply phenomenal!</h6>
                </div>
            </div> 
        </div>
      </div>

    {/* Footer Section */}
    <div className="bg-dark text-light" style={{ padding: "60px", paddingTop: "60px"}}>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <h2 className="fw-bold mb-4">LIFT</h2>
                    <p>123 ABC Road, Street 45, Singapore</p>
                    <p>contact-us@lift.com</p>
                    <p>+65 1234 5678</p>
                    <p>1000 - 1800, Mon - Sat</p>
                </div>
                <div className="col-2">
                    <h4 className="mb-4">About</h4>
                    <p>Our Story</p>
                    <p>FAQ</p>
                    <p>Contact Us</p>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                </div>
                <div className="col-2"></div>
                <div className="col-4">
                    <h1 className="mb-4">Newsletter sign-up</h1>
                    <label>Email Address*</label><br />
                    <input className="mb-4 form-control" type="email" placeholder="Your email address" /><br />
                    <button className="btn btn-outline-light">Submit</button>
                </div>
            </div>
        </div>
    </div>

      {/* <hr /> */}
      <p className="ps-5 pt-3">© 2022 LIFT. All images used in the site do not belong to the site creator.</p>
    </>
  );
}

export default LandingPage;
