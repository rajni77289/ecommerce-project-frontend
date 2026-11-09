
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/API/API";
import Layout from "../layout/Layout";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/api/order/myorder").then((res) => {
            setOrders(res.data.data || []);
                    console.log("MY ORDERS:", res.data);
        });
    }, []);

    return (
       <Layout>
         <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto max-w-3xl">

                <h1 className="mb-5 text-2xl font-bold">My Orders</h1>

                {orders.map((order) => {
                    const item = order.items?.[0];

                    return (
                        <div
                            key={order._id}
                            onClick={() => navigate(`/order/${order._id}`)}
                            className="mb-4 cursor-pointer rounded-xl bg-white p-4 shadow-sm hover:shadow-md"
                        >
                            <div className="mb-3 flex justify-between">
                                <p className="text-sm text-gray-500">
                                    Order #{order._id.slice(-8)}
                                </p>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                    {order.orderStatus}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <img
                                    src={`${API.defaults.baseURL}/uploadimage/${item?.image}`}
                                    className="h-24 w-24 rounded-lg border object-contain"
                                />

                                <div>
                                    <h2 className="font-semibold">{item?.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {item?.quantity}
                                    </p>
                                    <p className="mt-1 font-bold">
                                        ₹{item?.price?.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 border-t pt-3 text-right font-bold">
                                Total: ₹{order.total?.toLocaleString("en-IN")}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
       </Layout>
    );
}
