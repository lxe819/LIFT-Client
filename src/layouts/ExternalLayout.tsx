import { Link, Outlet, useNavigate } from "react-router-dom";

function ExternalLayout() {
    const navigate = useNavigate(); 

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <Link to="/" className="navbar-brand ms-3">
          LOGO
        </Link>
        <div>
            <Link to="/categories/1" className="nav-item px-2">Wrist Wraps</Link>
            <Link to="/categories/2" className="nav-item px-2">Lifting Straps</Link>
            <Link to="/categories/3" className="nav-item px-2">Sleeves</Link>
            <Link to="/categories/4" className="nav-item px-2">Belts</Link>
            <Link to="/categories/5" className="nav-item px-2">Resistance Bands</Link>
        </div>
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
            <div className="d-flex align-items-center">
                <button onClick={() => navigate("/login")} type="button" className="btn btn-light px-3 me-2">Login</button>
                <button onClick={() => navigate("/register")} type="button" className="btn btn-primary me-3">Sign Up</button>
            </div>

        {/* </div> */}
      </nav>
      <Outlet />
    </>
  );
}

export default ExternalLayout;
