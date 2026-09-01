
import { useEffect, useState } from "react";
import {
    Trash2,
    Minus,
    Plus,
    ShoppingBag,
    ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import API from "../components/API/API";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePayment = async (subtotal) => {
        try {
            setLoading(true);

            // Backend se order create karna
            const { data } = await API.post(
                "/api/payment/create-order",
                {
                    amount: total,
                }
            );

            console.log("Order Response:", data);

            const options = {
                key: "rzp_test_TRCGOiAN2SUhlk",
                amount: data.order.amount,
                currency: data.order.currency,
                name: "My Website",
                description: "Premium Plan",
                order_id: data.order.id,

                handler: async (response) => {
                    console.log("Payment Response:", response);

                    try {
                        const verifyResponse = await API.post(
                            "/api/payment/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );

                        if (verifyResponse.data.success) {
                            alert("Payment Successful 🎉");
                        }
                    } catch (error) {
                        console.log(error);
                        alert("Payment verification failed ❌");
                    }
                },

                prefill: {
                    name: "Customer",
                    email: "customer@gmail.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#4f46e5",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.log("Order Error:", error);
            alert("Unable to create order!");
        } finally {
            setLoading(false);
        }
    };

    console.log(cartItems)
    // GET CART DATA
    const handleGetCart = async () => {
        try {
            const res = await API.get(
                "/carts/getcartdata"
            );
            console.log("Cart Data:", res.data.data);
            setCartItems(res.data.data || []);
        } catch (error) {
            console.log("Get Cart Error:", error);
        }
    };

    useEffect(() => {
        handleGetCart();
    }, []);


    // INCREASE QUANTITY
    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };


    // DECREASE QUANTITY
    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        );
    };

    // DELETE CART ITEM
    const removeItem = async (id) => {

        try {

            await API.delete(
                `/carts/deletcart/${id}`
            );

            setCartItems((prev) =>
                prev.filter((item) => item._id !== id)
            );

        } catch (error) {
            console.log("Delete Cart Error:", error);
        }
    };

    // SUBTOTAL

    // const arr = [1, 2, 3, 4, 5,10,10,10]

    // useEffect(() => {
    //    const data =  arr.reduce((sum, num) => {
    //         return sum + num
    //     }, 0)

    // console.log(data)
    // }, [])



    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum + Number(item.item?.price || 0) * Number(item.quantity || 0),
        0
    );

    const shipping = subtotal > 1000 ? 0 : 20;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    // EMPTY CART
    if (cartItems.length === 0) {
        return (
            <Layout>

                <div className="min-h-screen flex items-center justify-center px-4">

                    <div className="text-center">

                        <ShoppingBag
                            size={80}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="text-3xl font-bold mt-6">
                            Your Cart Is Empty
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/"
                            className="
                                inline-block
                                mt-6
                                bg-indigo-600
                                text-white
                                px-8
                                py-3
                                rounded-xl
                            "
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </Layout>
        );
    }


    return (
        <Layout>

            <div className="bg-slate-50 min-h-screen py-10">

                <div className="max-w-7xl mx-auto px-4">

                    {/* HEADER */}

                    <div className="mb-8">

                        <Link
                            to="/"
                            className="
                                flex
                                items-center
                                gap-2
                                text-indigo-600
                                font-medium
                            "
                        >
                            <ArrowLeft size={18} />

                            Continue Shopping
                        </Link>

                        <h1 className="text-4xl font-bold mt-4">
                            Shopping Cart
                        </h1>

                    </div>


                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* CART ITEMS */}

                        <div className="lg:col-span-2 space-y-5">

                            {cartItems.map((item) => (

                                <div
                                    key={item._id}
                                    className="
                                        bg-white
                                        rounded-3xl
                                        p-4
                                        shadow-sm
                                        hover:shadow-lg
                                        transition
                                    "
                                >

                                    <div className="flex flex-col sm:flex-row gap-5">

                                        {/* IMAGE */}

                                        <img
                                            src={`http://localhost:5000/uploadimage/${item.item?.images?.[0]}`}
                                            alt={item.item?.name}
                                            className="
                                                w-44
                                                h-44
                                                object-contain
                                                bg-white
                                                rounded-xl
                                                p-3
                                            "
                                        />


                                        <div className="flex-1">

                                            <div className="flex justify-between">

                                                <div>

                                                    <h3 className="text-xl font-bold">
                                                        {item.item?.name}
                                                    </h3>

                                                    <p className="text-indigo-600 font-semibold mt-2">
                                                        ₹{item.item?.price}
                                                    </p>

                                                </div>


                                                {/* DELETE */}

                                                <button
                                                    onClick={() =>
                                                        removeItem(item._id)
                                                    }
                                                    className="
                                                        text-red-500
                                                        hover:text-red-700
                                                    "
                                                >
                                                    <Trash2 />
                                                </button>

                                            </div>


                                            {/* QUANTITY */}

                                            <div className="mt-6">

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                        w-fit
                                                        border
                                                        rounded-xl
                                                        px-3
                                                        py-2
                                                    "
                                                >

                                                    <button
                                                        onClick={() =>
                                                            decreaseQty(item._id)
                                                        }
                                                    >
                                                        <Minus size={18} />
                                                    </button>


                                                    <span className="font-semibold">
                                                        {item.quantity}
                                                    </span>


                                                    <button
                                                        onClick={() =>
                                                            increaseQty(item._id)
                                                        }
                                                    >
                                                        <Plus size={18} />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* ORDER SUMMARY */}

                        <div>

                            <div
                                className="
                                    bg-white
                                    rounded-3xl
                                    p-6
                                    shadow-sm
                                    sticky
                                    top-24
                                "
                            >

                                <h2 className="text-2xl font-bold mb-6">
                                    Order Summary
                                </h2>


                                {/* COUPON */}

                                <div className="mb-6">

                                    <label className="font-medium">
                                        Coupon Code
                                    </label>

                                    <div className="flex mt-3">

                                        <input
                                            type="text"
                                            placeholder="SAVE20"
                                            className="
                                                flex-1
                                                border
                                                rounded-l-xl
                                                px-4
                                                py-3
                                                outline-none
                                            "
                                        />

                                        <button
                                            className="
                                                bg-indigo-600
                                                text-white
                                                px-5
                                                rounded-r-xl
                                            "
                                        >
                                            Apply
                                        </button>

                                    </div>

                                </div>


                                {/* PRICE */}

                                <div className="space-y-4">

                                    <div className="flex justify-between">

                                        <span>
                                            Subtotal
                                        </span>

                                        <span>
                                            ₹{subtotal.toFixed(2)}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span>
                                            Shipping
                                        </span>

                                        <span>
                                            ₹{shipping.toFixed(2)}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span>
                                            GST (18%)
                                        </span>

                                        <span>
                                            ₹{tax.toFixed(2)}
                                        </span>

                                    </div>


                                    <hr />


                                    <div
                                        className="
                                            flex
                                            justify-between
                                            text-xl
                                            font-bold
                                        "
                                    >

                                        <span>
                                            Total
                                        </span>

                                        <span>
                                            ₹{total.toFixed(2)}
                                        </span>

                                    </div>

                                </div>


                                <button
                                    onClick={() => handlePayment(total)}
                                    className="
                                        w-full
                                        mt-8
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        text-white
                                        py-4
                                        rounded-2xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    Proceed To Checkout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
}