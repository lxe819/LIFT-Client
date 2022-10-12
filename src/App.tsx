import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExternalLayout from "./layouts/ExternalLayout";
import InternalLayout from "./layouts/InternalLayout";
import Homepage from "./pages/internalPages/HomePage";
import LandingPage from "./pages/externalPages/LandingPage";
import LoginPage from "./pages/externalPages/LoginPage";
import RegisterPage from "./pages/externalPages/RegisterPage";
import { useState } from "react";
import CategoryPage from "./pages/internalPages/CategoryPage";
import ProductPage from "./pages/internalPages/ProductPage";
import CartPage from "./pages/internalPages/CartPage";
import CheckoutPage from "./pages/internalPages/CheckoutPage";
import PurchaseHistoryPage from "./pages/internalPages/PurchaseHistoryPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminHomepage from "./pages/adminPages/AdminHomepage";
import AdminCategoriesPage from "./pages/adminPages/AdminCategoriesPage";
import AdminProductsPage from "./pages/adminPages/AdminProductsPage";
import AdminCategoryForm from "./pages/adminPages/AdminCategoryForm";
import AdminProductForm from "./pages/adminPages/AdminProductForm";
import AdminCategoryEdit from "./pages/adminPages/AdminCategoryEdit";
import AdminProductEdit from "./pages/adminPages/AdminProductEdit";
import Wishlist from "./pages/internalPages/Wishlist";
import ProfilePage from "./pages/internalPages/ProfilePage";
import EditProfilePage from "./pages/internalPages/EditProfilePage";

interface CartItem {
  user_id: number;
  cart_id: number;
  product_id: number;
  product_name: string;
  product_size: string;
  stock_qty: number; 
  unit_price: string;
  quantity: number;
  image: string;
}

function App() {

  const [token, setToken] = useState<string>(""); 
  const [orderHistory, setOrderHistory] = useState<CartItem[]>([])
  // const [categoryClicked, setCategoryClicked] = useState<number>(0); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExternalLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage setToken={setToken} />} />
          <Route path="/categories/:category_id" element={<CategoryPage />} />
        </Route>
        <Route path="/personal" element={<InternalLayout setToken={setToken} />}>
          <Route index element={<Homepage />} />
          <Route path="/personal/profile" element={<ProfilePage token={token} />} />
          <Route path="/personal/profile/edit" element={<EditProfilePage />} />
          <Route path="/personal/cart" element={<CartPage token={token} orderHistory={orderHistory} setOrderHistory={setOrderHistory} />} />
          <Route path="/personal/checkout" element={<CheckoutPage token={token} orderHistory={orderHistory} />} />
          <Route path="/personal/history" element={<PurchaseHistoryPage token={token} />} />
          <Route path="/personal/wishlist" element={<Wishlist token={token} />} />
          <Route path="/personal/categories/:category_id" element={<CategoryPage />} />
          <Route path="/personal/products/:product_id" element={<ProductPage token={token} />} />
        </Route>
        <Route path="/admin" element={<AdminLayout token={token} />}>
          <Route index element={<AdminHomepage token={token} />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage token={token} />} />
          <Route path="/admin/categories/record" element={<AdminCategoryForm token={token} />} />
          <Route path="/admin/categories/record/:category_id" element={<AdminCategoryEdit token={token} />} />
          <Route path="/admin/products" element={<AdminProductsPage token={token} />} />
          <Route path="/admin/products/record" element={<AdminProductForm token={token} />} />
          <Route path="/admin/products/record/:product_id" element={<AdminProductEdit token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 
