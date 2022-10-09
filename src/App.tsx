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

function App() {

  const [token, setToken] = useState<string>(""); 
  // const [categoryClicked, setCategoryClicked] = useState<number>(0); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExternalLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage setToken={setToken} />} />
        </Route>
        <Route path="/personal" element={<InternalLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/personal/cart" element={<CartPage token={token} />} />
          <Route path="/personal/categories/:category_id" element={<CategoryPage />} />
          <Route path="/personal/products/:product_id" element={<ProductPage token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App; 
