import { Heart, Eye, ShoppingCart, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./API/API";

// const products = [
// {
//         id: 1,
//         name: "Apple Watch Series",
//         price: "$299",
//         oldPrice: "$399",
//         discount: "25% OFF",
//         image:
//             "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
//     },
//     {
//         id: 2,
//         name: "Nike Air Max",
//         price: "$149",
//         oldPrice: "$199",
//         discount: "20% OFF",
//         image:
//             "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     },
//     {
//         id: 3,
//         name: "Wireless Headphones",
//         price: "$99",
//         oldPrice: "$129",
//         discount: "15% OFF",
//         image:
//             "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//     },
//     {
//         id: 4,
//         name: "Gaming Keyboard",
//         price: "$79",
//         oldPrice: "$99",
//         discount: "10% OFF",
//         image:
//             "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
//     },
// ];

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await API.get("/api/products");
        setProducts(res.data.data);
        console.log(res)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCart = async (id) => {
        console.log("click btn")
        const res = await API.post(`/carts/addtocart/${id}`)
        console.log(res);
    }
    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">
                        Featured Products
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Handpicked products just for you
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="
              group
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-md
              hover:shadow-2xl
              transition-all
              duration-500
              hover:-translate-y-3
            "
                        >
                            {/* Image Section */}
                            <div className="relative overflow-hidden">

                                <img
                                    src={`http://localhost:5000/uploadimage/${product?.images[0]}`}
                                    // alt={product.name}
                                    className="
                    h-72
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                                />

                                {/* Discount Badge */}
                                <span className="
                  absolute
                  top-4
                  left-4
                  bg-red-500
                  text-white
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  font-semibold
                ">
                                    {/* {product.discount} */}
                                </span>

                                {/* Hover Icons */}
                                <div
                                    className="
                  absolute
                  right-4
                  top-4
                  flex
                  flex-col
                  gap-3
                  opacity-0
                  translate-x-5
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  transition-all
                  duration-500
                "
                                >
                                    <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition">
                                        <Heart size={18} />
                                    </button>

                                    <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition">
                                        <Eye size={18} />
                                    </button>
                                </div>

                                {/* Quick Add */}
                                <div
                                    className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform
                  duration-500
                "
                                >
                                    <button
                                        className="
                    w-full
                    bg-black/90
                    text-white
                    py-3
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                                        onClick={() => {
                                            addToCart(product._id)
                                        }}  >
                                        <ShoppingCart size={18} />
                                        Quick Add
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">

                                <h3 className="font-semibold text-lg"><Link to={`/product/${product._id}`}>
                                    {product.name}</Link>
                                </h3>

                                <div className="flex items-center gap-2 mt-2">
                                    {/* <span className="text-indigo-600 font-bold text-xl">
                                        <IndianRupee size={18} />{product.price}
                                    </span> */}
                                    <span className="text-indigo-600 font-bold text-xl flex items-center">
                                        <IndianRupee size={18} />
                                        {product.price}
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        {/* {product.oldPrice} */}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex mt-3 text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>

                                {/* <button
                                        className="
                  w-full
                  mt-5
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  py-3
                  rounded-xl
                  transition
                  font-medium
                "
                                    >
                                        Add To Cart
                                    </button> */}

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}