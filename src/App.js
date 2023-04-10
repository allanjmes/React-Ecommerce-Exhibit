import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from './global/Topbar/Topbar'
import LandingPage from './pages/LandingPage/LandingPage';
import SidebarSection from './global/Sidebar/Sidebar.jsx';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import './index.css';

function App() {
  const [deviceType, setDeviceType] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
    }
    }, [setWishlist]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType("mobile");
      } else if (window.innerWidth >= 768) {
        setDeviceType("ipad");
      } else if (window.innerWidth >= 1024) {
        setDeviceType("desktop");
      }
    };

    window.addEventListener("resize", handleResize);

    // set the initial state based on screen width
    // if (window.innerWidth < 480) {
    //   setDeviceType("mobile");
    // } else {
    //   setDeviceType("desktop");
    // }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deviceType]);

  return (
    <div className="app">
      <BrowserRouter>
        
        <Topbar
          deviceType={deviceType}
          cart={cart}
          wishlist={wishlist}
        />
        <SidebarSection
          deviceType={deviceType}
        />
        <Routes>
          <Route path="/" element={<LandingPage
            deviceType={deviceType}
            />}
          />
          <Route path="/category/:category" element={<CategoryPage
            deviceType={deviceType}
            wishlist={wishlist}
            setWishlist={setWishlist}
            />}
          />
          <Route path="/category/:category/product/:id" element={<ProductPage
            deviceType={deviceType}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            />}
          />
          <Route path="/cart" element={<CartPage
            deviceType={deviceType}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            />}
          />
          <Route path="/wishlist" element={<WishlistPage
            deviceType={deviceType}
            wishlist={wishlist}
            setWishlist={setWishlist}
            />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
