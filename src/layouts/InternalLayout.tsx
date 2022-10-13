import { Link, Outlet, useNavigate } from "react-router-dom";

function InternalLayout({ setToken }: { setToken: Function }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <div className="container p-3">
          <Link to="/personal" className="navbar-brand ms-3 fw-bold fs-2">
            LIFT
          </Link>

          <nav className="d-flex">
            <Link
              to="/personal/categories/1"
              className="nav-item px-2 link-light"
              style={{ textDecoration: "none" }}
            >
              Wrist Wraps
            </Link>
            <Link
              to="/personal/categories/2"
              className="nav-item px-2 link-light"
              style={{ textDecoration: "none" }}
            >
              Lifting Straps
            </Link>
            <Link
              to="/personal/categories/3"
              className="nav-item px-2 link-light"
              style={{ textDecoration: "none" }}
            >
              Sleeves
            </Link>
            <Link
              to="/personal/categories/4"
              className="nav-item px-2 link-light"
              style={{ textDecoration: "none" }}
            >
              Belts
            </Link>
            <Link
              to="/personal/categories/5"
              className="nav-item px-2 link-light"
              style={{ textDecoration: "none" }}
            >
              Resistance Bands
            </Link>
          </nav>

          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}

          <div className="d-flex align-items-center">
            <Link to="/personal/cart" className="nav-item px-2 link-light me-2">
              <img style={{ maxHeight: "25px" }} src="cartIcon.png" />
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img style={{ maxHeight: "25px" }} src="profileIcon.png" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                    <li>
                      <Link
                        to="/personal/profile"
                        className="nav-item dropdown-item px-2 link-light ms-1"
                      >
                        User Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/personal/history"
                        className="nav-item dropdown-item px-2 link-light ms-1"
                      >
                        Past Purchases
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/personal/wishlist"
                        className="nav-item dropdown-item px-2 link-light ms-1"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-link link-light"

              style={{ textDecoration: "none" }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
          {/* Footer Section */}
    <footer className="bg-dark text-light" style={{ padding: "60px", paddingTop: "60px"}}>
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
                    <input className="mb-1 form-control" type="email" placeholder="Your email address" /><br />
                    <button className="btn btn-outline-light">Submit</button>
                </div>
            </div>
      <p className="pt-5">© 2022 LIFT. All images used in the site do not belong to the site creator.</p>
        </div>
    </footer>

      {/* <hr /> */}
    </>
    // <>
    //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
    //         <Link to="/personal" className="navbar-brand ms-3">
    //         LIFT
    //         </Link>
    //         <div>
    //             <Link to="/personal/categories/1" className="nav-item px-2 link-light">Wrist Wraps</Link>
    //             <Link to="/personal/categories/2" className="nav-item px-2 link-light">Lifting Straps</Link>
    //             <Link to="/personal/categories/3" className="nav-item px-2 link-light">Sleeves</Link>
    //             <Link to="/personal/categories/4" className="nav-item px-2 link-light">Belts</Link>
    //             <Link to="/personal/categories/5" className="nav-item px-2 link-light">Resistance Bands</Link>
    //         </div>

    //     </nav>
    //     <Outlet />
    // </>
  );
}

export default InternalLayout;

{
  /* <Link to="/personal/history" className="nav-item px-2 link-light">
Past Purchases
</Link>
<Link to="/personal/wishlist" className="nav-item px-2 link-light">
Wishlist
</Link> */
}

{
  /* <Link to="/personal/checkout" className="nav-item px-2 link-light">
Order History
</Link> */
}

{
  /* <Link
to="/personal/profile"
className="nav-item px-2 me-3 link-light"
>
<img style={{ maxHeight: "25px" }} src="profileIcon.png" />
</Link> */
}

{
  /* <button onClick={handleLogout} className="btn btn-primary">
Logout
</button> */
}
