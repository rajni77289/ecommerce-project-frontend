import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../components/API/API";
import Layout from "../layout/Layout";

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        API.get("/api/order/myorder").then((res) => {
            setOrder(res.data.data?.find((o) => o._id === id));
        });
    }, [id]);

    if (!order) return <p className="p-5">Loading...</p>;

    const item = order.items?.[0];

    return (
<Layout>
            <div className="min-h-screen bg-gray-100 p-4">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold">Order Details</h1>
                </div>

                {/* Order Card */}
                <div className="rounded-xl bg-white p-5 shadow-sm">

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Order ID</p>
                            <p className="font-medium">{order._id}</p>
                        </div>

                        <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            {order.orderStatus}
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        Ordered on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>

                    <hr className="my-5" />

                    {/* Product */}
                    <div className="flex gap-4">
                        <img
                            src={`${API.defaults.baseURL}/uploadimage/${item?.image}`}
                            className="h-28 w-28 rounded-lg border object-contain"
                        />

                        <div>
                            <h2 className="font-semibold">{item?.name}</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Quantity: {item?.quantity}
                            </p>
                            <p className="mt-2 text-lg font-bold">
                                ₹{item?.price?.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>

                    <hr className="my-5" />

                    {/* Payment */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Payment Status</span>
                            <b className="text-green-600">
                                {order.paymentStatus}
                            </b>
                        </div>

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal?.toLocaleString("en-IN")}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{order.shipping}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{order.tax?.toLocaleString("en-IN")}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Amount</span>
                            <span>₹{order.total?.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
</Layout>
    );
}
