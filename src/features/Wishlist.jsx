import { Heart, ShoppingCart, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import API from "../components/API/API";
import addToCart from "../data/AddtoCartData";
import handlePayment from "../data/RazorpaySinglepro";
import Layout from "../layout/Layout";

function Wishlist() {
  const [Wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const res = await API.get("/api/wishlist");
      setWishlist(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const removeWishlist = async (id) => {
    try {
      await API.post(`/api/wishlist/${id}`);
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-5 bg-slate-50">
      <h1 className="text-3xl font-bold">My Wishlist ♡</h1>
      <p className="text-gray-500 mb-6">Your favourite products</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Wishlist?.map((p) => (
          <div
            key={p?._id}
            className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
          >
            <div className="relative">
              <img
                src={`${API.defaults.baseURL}/uploadimage/${p?.images?.[0]}`}
                className="w-full h-52 object-cover rounded-lg"
                alt={p.name}
              />

              <button
                onClick={() => removeWishlist(p._id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
              >
                <Heart
                  className="text-red-500"
                  fill="currentColor"
                  size={20}
                />
              </button>
            </div>

            <h2 className="font-semibold mt-3">{p.name}</h2>

            <div className="flex gap-2 items-center mt-2">
              <span className="font-bold">₹{p.price}</span>

              <span className="text-gray-400 line-through text-sm">
                ₹{p.oldPrice}
              </span>

              {p.oldPrice > 0 && (
                <span className="text-green-600 text-xs">
                  {Math.round((1 - p.price / p.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button
              onClick={()=>addToCart(p?._id)}
               className="flex-1 bg-yellow-400 py-2 rounded-lg text-xs"
               >
                <ShoppingCart size={14} className="inline" /> Add to Cart
              </button>

              <button
              onClick={()=>handlePayment([{...p, quantity:1}])}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-xs">
                <Zap size={14} className="inline" /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {Wishlist.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          Your wishlist is empty ❤️
        </p>
      )}
    </div>
    </Layout>
  );
}

export default Wishlist;