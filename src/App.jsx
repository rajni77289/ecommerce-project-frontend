import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './features/Login'
import Signup from './features/Signup'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductDetails from './pages/ProductDetails'
import CategoriesProduct from './components/CategoriesProduct'
import FeaturedProducts from './components/FeaturedProducts'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import MyOrders from './features/MyOrders';
import Profile from "./components/Profile";
import API from './components/API/API'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home - First Page */}
          <Route path='/' element={<Home />} />

          {/* Login */}
          <Route path='/login' element={<Login />} />

          {/* Signup */}
          <Route path='/signup' element={<Signup />} />

           {/* Products */}
          <Route path='/categoriesproduct' element={<CategoriesProduct />} />
          <Route path='/featuredproducts' element={<FeaturedProducts />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />

            {/* Cart */}
          {/* <Route path='/cart' element={<CartPage />} /> */}

                  {/* Protected Page */}
        <Route path="/cart" element={<ProtectedRoute><CartPage /> </ProtectedRoute>}/>

        {/* myorder */}
        <Route path="/orders" element={ <ProtectedRoute> <MyOrders /> </ProtectedRoute>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path='/API' element={<API/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App