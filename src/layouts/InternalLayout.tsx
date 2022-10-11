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
                LOGO
                </Link>
                <div>
                    <Link to="/personal/categories/1" className="nav-item px-2">Wrist Wraps</Link>
                    <Link to="/personal/categories/2" className="nav-item px-2">Lifting Straps</Link>
                    <Link to="/personal/categories/3" className="nav-item px-2">Sleeves</Link>
                    <Link to="/personal/categories/4" className="nav-item px-2">Belts</Link>
                    <Link to="/personal/categories/5" className="nav-item px-2">Resistance Bands</Link>
                </div>
                    <div className="d-flex align-items-center">
                        <Link to="/personal/checkout" className="nav-item px-2">Order History</Link>
                        <Link to="/personal/history" className="nav-item px-2">Past Purchases</Link>
                        <Link to="/personal/cart" className="nav-item px-2">Cart</Link>
                        <Link to="/" className="nav-item px-2 me-3">Profile</Link>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>
            </nav>
            <Outlet />
        </>
    )
}; 

export default InternalLayout; 