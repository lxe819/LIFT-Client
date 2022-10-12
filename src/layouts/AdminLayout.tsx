import { Link, Outlet } from "react-router-dom";

function AdminLayout({ token }: { token: string }){
    return (
        <>
            <h1>Admin Layout</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
                <Link to="/admin" className="nav-item px-2">Home</Link>
                <Link to="/admin/categories" className="nav-item px-2">Categories</Link>
                <Link to="/admin/products">Products</Link>
            </nav>
            <Outlet />
        </>
    )
}; 

export default AdminLayout; 