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
          <Route path="/personal/cart" element={<CartPage token={token} orderHistory={orderHistory} setOrderHistory={setOrderHistory} />} />
          <Route path="/personal/checkout" element={<CheckoutPage token={token} orderHistory={orderHistory} />} />
          <Route path="/personal/history" element={<PurchaseHistoryPage token={token} />} />
          <Route path="/personal/categories/:category_id" element={<CategoryPage />} />
          <Route path="/personal/products/:product_id" element={<ProductPage token={token} />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 
