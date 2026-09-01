// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const email = localStorage.getItem("email");

//     if (!email) {
//       setLoading(false);
//       return;
//     }

//     const getProfile = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/profile", {
//           email: email,
//         });

//         setUser(res.data.user);
//       } catch (error) {
//         console.log("Profile Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading Profile...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Please Login First
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">

//       <div className="max-w-5xl mx-auto">

//         {/* Profile Header */}
//         <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

//           {/* Cover */}
//           <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>

//           {/* User Info */}
//           <div className="px-6 md:px-10 pb-8">

//             <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">

//               {/* Avatar */}
//               <div className="flex items-end gap-5">

//                 <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
//                   <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
//                     <span className="text-5xl font-bold text-indigo-600">
//                       {user.name?.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mb-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                     {user.name}
//                   </h1>

//                   <p className="text-gray-500">
//                     {user.email}
//                   </p>
//                 </div>

//               </div>

//               {/* Edit Button */}
//               <button
//                 className="mt-5 md:mt-0 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//               >
//                 Edit Profile
//               </button>

//             </div>


//             {/* User Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

//               <div className="border rounded-2xl p-5">
//                 <p className="text-sm text-gray-500">
//                   Full Name
//                 </p>

//                 <p className="text-lg font-semibold text-gray-800 mt-1">
//                   {user.name}
//                 </p>
//               </div>


//               <div className="border rounded-2xl p-5">
//                 <p className="text-sm text-gray-500">
//                   Email Address
//                 </p>

//                 <p className="text-lg font-semibold text-gray-800 mt-1 break-all">
//                   {user.email}
//                 </p>
//               </div>


//               <div className="border rounded-2xl p-5">
//                 <p className="text-sm text-gray-500">
//                   Phone Number
//                 </p>

//                 <p className="text-lg font-semibold text-gray-800 mt-1">
//                   {user.phone || "Not Added"}
//                 </p>
//               </div>


//               <div className="border rounded-2xl p-5">
//                 <p className="text-sm text-gray-500">
//                   Account Status
//                 </p>

//                 <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
//                   {user.status || "Active"}
//                 </span>
//               </div>

//             </div>

//           </div>
//         </div>


//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

//           <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">
//             <div className="text-3xl mb-3">📦</div>

//             <h3 className="text-lg font-bold text-gray-800">
//               My Orders
//             </h3>

//             <p className="text-gray-500 text-sm mt-1">
//               View your orders and track deliveries
//             </p>
//           </div>


//           <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">
//             <div className="text-3xl mb-3">❤️</div>

//             <h3 className="text-lg font-bold text-gray-800">
//               Wishlist
//             </h3>

//             <p className="text-gray-500 text-sm mt-1">
//               View your saved products
//             </p>
//           </div>


//           <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">
//             <div className="text-3xl mb-3">⚙️</div>

//             <h3 className="text-lg font-bold text-gray-800">
//               Account Settings
//             </h3>

//             <p className="text-gray-500 text-sm mt-1">
//               Manage your account information
//             </p>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;
// -------------------------------------
import React, { useEffect, useState } from "react";
import API from "./API/API";

const Profile = () => {

  const [data, setData] = useState()
  console.log(data);

  const profile = async () => {
    const res = await API.get("/api/auth/myprofile");
    setData(res.data.user);
    console.log("USER DATA =", res.data.user);
    console.log("IMAGE =", res.data.user?.image);
  }

  useEffect(() => {
    profile()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

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
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">

                  <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">

                    <span className="text-5xl font-bold text-indigo-600">
                      <img
                        src={`http://localhost:5000/uploadimage/${data?.image}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
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
                Edit Profile
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
                    My Orders
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
                    Wishlist
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
  );
};

export default Profile;