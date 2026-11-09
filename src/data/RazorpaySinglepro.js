import API from "../components/API/API";

const handlePayment = async (products) => {
  const subtotal = products.reduce(
    (sum, p) => sum + Number(p.price) * (p.quantity || 1),
    0
  );

  const shipping = subtotal > 1000 ? 0 : 20;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  try {
    const { data } = await API.post("/api/payment/create-order", {
      amount: total,
    });

    const razorpay = new window.Razorpay({
      key: "rzp_test_TRCGOiAN2SUhlk",
      amount: data.order.amount,
      currency: data.order.currency,
      name: "ShopSphere",
      order_id: data.order.id,

      handler: async (res) => {
        try {
          const verify = await API.post(
            "/api/payment/verify-payment",
            {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            }
          );

          if (!verify.data.success) return alert("Payment failed!");

          const order = await API.post("/api/order/create", {
            items: products.map((p) => ({
              productId: p._id,
              name: p.name,
              image: p.images?.[0],
              price: p.price,
              quantity: p.quantity || 1,
            })),
            subtotal,
            shipping,
            tax,
            total,
          });

          if (order.data.success) alert("Order Successful 🎉");
        } catch (err) {
          console.log(err);
          alert("Order failed!");
        }
      },
    });

    razorpay.open();
  } catch (err) {
    console.log(err);
    alert("Payment start nahi hua!");
  }
};

export default handlePayment;