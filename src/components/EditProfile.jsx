import { ArrowLeft, UserRound, Save, LockKeyhole, Phone } from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./API/API";
import Layout from "../layout/Layout";

function ProfileEdit() {
  const navigate = useNavigate();
const { id } = useParams();
console.log("Profile ID:", id);

  const fields = [
    { label: "Full Name", name: "username", placeholder: "Enter your full name" },
    { label: "Email Address", name: "email", placeholder: "Enter your Email", type: "email" },
    { label: "Phone No", name: "phone", placeholder: "Enter your Mobail Number" },

  ]

  const [Edit, setEdit] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // const handlSubmit =async (e) => {
  //   e.preventDefault();
  //   console.log(Edit)

  //   const res =await post(`/updateuser/${id}`, {
  //     name: Edit.username,
  //     email: Edit.email,
  //     phone: Edit.phone,

  //   })
  //   console.log(res.data.data)
  // }
  const handlSubmit = async (e) => {
  e.preventDefault();
  console.log("Profile ID:", id);
  console.log("Edit Data:", Edit);


  try {
    const res = await API.post(`/api/auth/updateuser/${id}`, {
      name: Edit.username,
      email: Edit.email,
      phone: Edit.phone,
    });


    console.log(res.data.data);
    alert("Profile updated successfully");
  } catch (error) {
    console.log("Profile update error:", error);
    alert("Profile update failed");
  }
};
  return (
   <Layout>
     <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6">
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-3xl font-bold text-slate-800">
          Edit Profile
        </h1>
        <p className="text-gray-500 mt-2 mb-7">
          Update your personal information
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8">

          <div className="flex items-center gap-4 bg-violet-50 rounded-xl p-5 mb-7">
            <div className="bg-violet-600 text-white rounded-full p-4">
              <UserRound size={30} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">
                My Account
              </h2>
              <p className="text-sm text-gray-500">
                Manage your personal details
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-5">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {fields?.map((field) => {
              return (
                // <>
                 <Fragment key={field.label}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      {field?.label}
                    </label>
                    <input
                      name={field?.name}
                      value={Edit[field?.name]}
                      onChange={(e) => setEdit({ ...Edit, [field.name]: e.target.value })}
                      type={field?.type || "text"}
                      placeholder={field?.placeholder}
                      className="w-full rounded-lg border border-slate-200
                  bg-slate-50 px-4 py-3 outline-none transition
                  focus:border-violet-500 focus:ring-2
                  focus:ring-violet-100"
                    />
                  </div>
                {/* </> */}
                </Fragment>
              )
            })}
          </div>

          {/* <div className="mt-7 rounded-xl border border-violet-100
            bg-violet-50 p-4 flex items-center gap-3">
            <LockKeyhole className="text-violet-600" />
            <div>
              <h3 className="font-semibold text-slate-800">
                Change Password
              </h3>
              <p className="text-sm text-gray-500">
                Keep your account secure.
              </p>
            </div>
          </div> */}

          <div className="flex justify-end gap-3 mt-7 pt-5 border-t">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-3 rounded-lg border hover:bg-gray-50">
              Cancel
            </button>
            <button type="button"
              onClick={handlSubmit}
              className="flex items-center gap-2 px-5 py-3
              rounded-lg bg-violet-600 text-white
              hover:bg-violet-700 shadow-sm">
              <Save size={18} /> Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
   </Layout>
  );
}

export default ProfileEdit;