import { Link, Outlet, useNavigate } from "react-router-dom";

function ExternalLayout() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <div className="container p-3">
          <Link to="/" className="navbar-brand ms-3 fw-bold fs-2">
            LIFT
          </Link>
          <nav className="d-flex">
            <Link to="/categories/1" className="nav-item px-2 link-light" style={{textDecoration: "none"}}>
              Wrist Wraps
            </Link>
            <Link to="/categories/2" className="nav-item px-2 link-light" style={{textDecoration: "none"}}>
              Lifting Straps
            </Link>
            <Link to="/categories/3" className="nav-item px-2 link-light" style={{textDecoration: "none"}}>
              Sleeves
            </Link>
            <Link to="/categories/4" className="nav-item px-2 link-light" style={{textDecoration: "none"}}>
              Belts
            </Link>
            <Link to="/categories/5" className="nav-item px-2 link-light" style={{textDecoration: "none"}}>
              Resistance Bands
            </Link>
          </nav>
          <div className="d-flex align-items-center">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="btn btn-outline-light px-3 me-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="btn btn-outline-info me-3"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default ExternalLayout;
