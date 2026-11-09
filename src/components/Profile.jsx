import React, { useEffect, useState } from "react";
import API from "./API/API";
import { UserRound, ArrowLeft,  } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const Profile = () => {

  const [data, setData] = useState()

  const profile = async () => {
    const res = await API.get("/api/auth/myprofile");
    setData(res.data.user);
    console.log("USER DATA =", res.data.user);
  }

  useEffect(() => {
    profile()
  }, [])

  // const uploadimage=async (file)=>{
  //   const FormData=new FormData();
  //   FormData.append("image",file);
  //   const res=await API.post("/api/auth/uplod-profile",FormData);
  //   setData(res.data.user)
  //   setSelectimg(null)
  // }

  return (

    <Layout>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-5"
        >
          <ArrowLeft size={22} />
          Back
        </button>

        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your profile and account information
            </p>
          </div>


          {/* Main Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT PROFILE CARD */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

              {/* Cover */}
              <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

              {/* Profile Content */}
              <div className="px-6 pb-7">

                {/* Avatar */}
                <div className="flex justify-center -mt-16">
                  <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">

                    <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">

                      <span className="text-5xl font-bold text-indigo-600">
                        {/* <img */}
                        <UserRound size={60} />
                        {/* alt="P" */}
                        {/* className="w-24 h-24 rounded-full object-cover" */}
                        {/* /> */}
                      </span>

                    </div>

                  </div>
                </div>


                {/* Name */}
                <div className="text-center mt-4">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {data?.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {data?.email}
                  </p>

                  <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                    ● {data?.status}
                  </span>

                </div>


                {/* Divider */}
                <div className="border-t border-gray-200 my-6"></div>


                {/* Details */}
                <div className="space-y-5">

                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      Phone
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {data?.phone}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      Account Type
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {data?.role}
                    </p>
                  </div>

                </div>


                {/* Edit Button */}
                <button className="w-full mt-7 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                  <Link to={`/ProfileEdit/${data?._id}`}>Edit Profile</Link>
                </button>

              </div>
            </div>


            {/* RIGHT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Your personal account details
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
                    👤
                  </div>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">
                      Full Name
                    </p>

                    <p className="font-semibold text-gray-800 mt-2">
                      {data?.name}
                    </p>
                  </div>


                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">
                      Email Address
                    </p>

                    <p className="font-semibold text-gray-800 mt-2">
                      {data?.email}
                    </p>
                  </div>


                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">
                      Phone Number
                    </p>

                    <p className="font-semibold text-gray-800 mt-2">
                      +{data?.phone}
                    </p>
                  </div>


                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm text-gray-400">
                      Member Since
                    </p>

                    <p className="font-semibold text-gray-800 mt-2">
                      {data?.createdAt
                        ? new Date(data.createdAt).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>

                </div>

              </div>


              {/* Account Activity */}
              <div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  My Account
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Orders */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer">

                    <div className="flex justify-between items-start">

                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                        📦
                      </div>

                      <span className="text-gray-400 text-xl">
                        →
                      </span>

                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      <Link to={'/orders'}>My Orders</Link>
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      View and track your orders
                    </p>

                  </div>


                  {/* Wishlist */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer">

                    <div className="flex justify-between items-start">

                      <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-2xl">
                        ❤️
                      </div>

                      <span className="text-gray-400 text-xl">
                        →
                      </span>

                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      <Link to={'/wishlist'}>Wishlist</Link>
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Products you saved
                    </p>

                  </div>


                  {/* Address */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer">

                    <div className="flex justify-between items-start">

                      <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl">
                        📍
                      </div>

                      <span className="text-gray-400 text-xl">
                        →
                      </span>

                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      My Address
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Manage your delivery addresses
                    </p>

                  </div>


                  {/* Settings */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer">

                    <div className="flex justify-between items-start">

                      <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl">
                        ⚙️
                      </div>

                      <span className="text-gray-400 text-xl">
                        →
                      </span>

                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      Settings
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Manage your account settings
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Profile;