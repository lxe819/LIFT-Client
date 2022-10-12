import { Link, Outlet, useNavigate } from "react-router-dom";

function InternalLayout({ setToken }: { setToken: Function }) {

    const navigate = useNavigate(); 
    const handleLogout = () => {
        setToken(""); 
        navigate('/'); 
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                <Link to="/personal" className="navbar-brand ms-3">
                LIFT
                </Link>
                <div>
                    <Link to="/personal/categories/1" className="nav-item px-2 link-light">Wrist Wraps</Link>
                    <Link to="/personal/categories/2" className="nav-item px-2 link-light">Lifting Straps</Link>
                    <Link to="/personal/categories/3" className="nav-item px-2 link-light">Sleeves</Link>
                    <Link to="/personal/categories/4" className="nav-item px-2 link-light">Belts</Link>
                    <Link to="/personal/categories/5" className="nav-item px-2 link-light">Resistance Bands</Link>
                </div>
                    <div className="d-flex align-items-center">
                        <Link to="/personal/checkout" className="nav-item px-2 link-light">Order History</Link>
                        <Link to="/personal/history" className="nav-item px-2 link-light">Past Purchases</Link>
                        <Link to="/personal/wishlist" className="nav-item px-2 link-light">Wishlist</Link>
                        <Link to="/personal/cart" className="nav-item px-2 link-light">Cart</Link>
                        <Link to="/personal/profile" className="nav-item px-2 me-3 link-light">Profile</Link>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>
            </nav>
            <Outlet />
        </>
    )
}; 

export default InternalLayout; 